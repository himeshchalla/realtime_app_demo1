package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
	r "github.com/rethinkdb/rethinkdb-go"
)

// Handler function for handling client requrests
type Handler func(*Client, interface{})

// Router struct
type Router struct {
	rules   map[string]Handler
	session *r.Session
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// NewRouter method for routing initialization from main
func NewRouter(session *r.Session) *Router {
	return &Router{
		rules:   make(map[string]Handler),
		session: session,
	}
}

// Handling client requests
func (r *Router) Handle(msgName string, handler Handler) {
	r.rules[msgName] = handler
}

// Finding Handler for requests
func (r *Router) FindHandler(msgName string) (Handler, bool) {
	handler, found := r.rules[msgName]
	return handler, found
}

// Initializing and communicatinge throug socket
func (e *Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	socket, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Print(w, err.Error())
		// fmt.Println(err)
		return
	}
	client := NewClient(socket, e.FindHandler, e.session)
	defer client.Close()
	go client.Write()
	client.Read()
}
