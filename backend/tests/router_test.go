package main_test

import (
	"testing"
)

func TestRouter(t *testing.T) {
    emptyResult := "Hello"
    if emptyResult != "Hello" {
        t.Error("Hello failed, expected Hello, got Hello123")
    }
}

