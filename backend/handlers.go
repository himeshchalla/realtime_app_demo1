package main

import (
	"fmt"
	"time"

	"github.com/mitchellh/mapstructure"
	r "github.com/rethinkdb/rethinkdb-go"
)

const (
	ChannelStop = iota //Setting values numerically in searlized form for next properties
	UserStop
	MessageStop
)

// Channel structure
type Channel struct {
	Id   string `json:"id" gorethink:"id,omitempty"`
	Name string `json:"name" gorethink:"name"`
}

// User sructure for users
type User struct {
	Id   string `json:"id" gorethink:"id,omitempty"`
	Name string `json:"name" gorethink:"name"`
}

// Message structure
type Message struct {
	Name string      `json:"name"`
	Data interface{} `json:"data"`
}

// Message structure
type ChannelMessage struct {
	Id        string    `json:"id" gorethink:"id,omitempty"`
	ChannelId string    `json:"channelId" gorethink:"channelId"`
	Body      string    `json:"body" gorethink:"body"`
	Author    string    `json:"author" gorethink:"author"`
	CreatedAt time.Time `json:"createdAt" gorethink:"createdAt"`
}

func addChannel(client *Client, data interface{}) {
	var channel Channel
	err := mapstructure.Decode(data, &channel)
	fmt.Println(data)
	fmt.Println(channel)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	// Go routine for dealing with slow IO operation and avoiding race conditions
	go func() {
		err := r.Table("channel").
			Insert(channel).
			Exec(client.session)
		if err != nil {
			client.send <- Message{"error", err.Error()}
		}
	}()
}

func subscribeChannel(client *Client, data interface{}) {
	stop := client.NewStopChannel(ChannelStop)
	result := make(chan r.ChangeResponse)
	cursor, err := r.Table("channel").
		Changes(r.ChangesOpts{IncludeInitial: true}).
		Run(client.session)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	// Go routine for dealing with slow IO operation and concurrancy issues
	go func() {
		var change r.ChangeResponse
		for cursor.Next(&change) {
			result <- change
		}
	}()
	go func() {
		for {
			select {
			case <-stop:
				fmt.Println("closing channel from subscribeChannel")
				cursor.Close()
				return
			case change := <-result:
				if change.NewValue != nil && change.OldValue == nil {
					client.send <- Message{"channel add", change.NewValue}
					fmt.Println("sent channel add message")
				}
			}
		}
	}()
}
func unsubscribeChannel(client *Client, data interface{}) {
	client.StopForKey(ChannelStop)
}
func editUser(client *Client, data interface{}) {
	var user User
	err := mapstructure.Decode(data, &user)
	fmt.Println(data)
	fmt.Println(user)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	client.userName = user.Name
	// Go routine for dealing with slow IO operation and avoiding race conditions
	go func() {
		_, err := r.Table("user").
			Get(client.id).
			Update(user).
			RunWrite(client.session)
		if err != nil {
			client.send <- Message{"error", err.Error()}
		}
	}()
}
func subscribeUser(client *Client, data interface{}) {
	// Go routine for dealing with slow IO operation and concurrancy issues
	go func() {
		stop := client.NewStopChannel(UserStop)
		cursor, err := r.Table("user").
			Changes(r.ChangesOpts{IncludeInitial: true}).
			Run(client.session)
		if err != nil {
			client.send <- Message{"error", err.Error()}
			return
		}
		changeFeedHelper(cursor, "user", client.send, stop)
	}()
}
func unsubscribeUser(client *Client, data interface{}) {
	client.StopForKey(UserStop)
}
func addChannelMessage(client *Client, data interface{}) {
	var channelMessage ChannelMessage
	err := mapstructure.Decode(data, &channelMessage)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		// return
	}
	fmt.Println(channelMessage)
	fmt.Println(data)
	// Go routine for dealing with slow IO operation and avoiding race conditions
	go func() {
		channelMessage.CreatedAt = time.Now()
		channelMessage.Author = client.userName
		err := r.Table("message").
			Insert(channelMessage).
			IndexCreate("createdAt").
			Exec(client.session)
		if err != nil {
			client.send <- Message{"error", err.Error()}
		}
		fmt.Println(err)
	}()
}
func subscribeChannelMessage(client *Client, data interface{}) {
	// Go routine for dealing with slow IO operation and concurrancy issues
	go func() {
		eventData := data.(map[string]interface{})
		val, ok := eventData["channelId"]
		if !ok {
			return
		}
		channelId, ok := val.(string)
		if !ok {
			return
		}
		stop := client.NewStopChannel(MessageStop)
		cursor, err := r.Table("message").
			OrderBy(r.OrderByOpts{Index: r.Desc("createdAt")}).
			Filter(r.Row.Field("channelId").Eq(channelId)).
			Changes(r.ChangesOpts{IncludeInitial: true}).
			Run(client.session)
		if err != nil {
			client.send <- Message{"error", err.Error()}
			return
		}
		changeFeedHelper(cursor, "message", client.send, stop)
	}()
}
func unsubscribeChannelMessage(client *Client, data interface{}) {
	client.StopForKey(MessageStop)
}

func changeFeedHelper(cursor *r.Cursor, changeEventName string,
	send chan<- Message, stop <-chan bool) {
	change := make(chan r.ChangeResponse)
	cursor.Listen(change)
	for {
		eventName := ""
		var data interface{}
		select {
		case <-stop:
			cursor.Close()
			return
		case val := <-change:
			if val.NewValue != nil && val.OldValue == nil {
				eventName = changeEventName + " add"
				data = val.NewValue
			} else if val.NewValue == nil && val.OldValue != nil {
				eventName = changeEventName + " remove"
				data = val.OldValue
			} else if val.NewValue != nil && val.OldValue != nil {
				eventName = changeEventName + " edit"
				data = val.NewValue
			}
			send <- Message{eventName, data}
		}
	}
}
