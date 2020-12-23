package main

import (
	"fmt"
	"log"
	"net/http"

	r "github.com/rethinkdb/rethinkdb-go"
)

func main() {
	session, err := r.Connect(r.ConnectOpts{
		Address:  "localhost:28015",
		Database: "realtimeappdemo1",
	})
	if err != nil {
		log.Panic(err.Error())
	}
	router := NewRouter(session)

	router.Handle("channel add", addChannel)
	router.Handle("channel subscribe", subscribeChannel)
	router.Handle("channel unsubscribe", unsubscribeChannel)

	router.Handle("user edit", editUser)
	router.Handle("user subscribe", subscribeUser)
	router.Handle("user unsubscribe", unsubscribeUser)

	router.Handle("message add", addChannelMessage)
	router.Handle("message subscribe", subscribeChannelMessage)
	router.Handle("message unsubscribe", unsubscribeChannelMessage)

	http.Handle("/", router)
	// http.HandleFunc("/", handler)
	fmt.Println("Backend Server started at port : 9001")
	http.ListenAndServe(":9001", nil)
	log.Println("Backend Server started at port : 9001")
}
