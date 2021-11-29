
#### [Work-in-progress] Realtime group chat app

This is a work-in-progress app for real time group chat, built with below tech. stack.
- `Frontend` : [React.js], [socket.io], [webpack], [babel], [cypress].
- `Backend` : [Go language], [websocket], [rethinkdb], [rethinkdb-go driver].
- `Other` : [nginx], [Docker]


##### Features
  - Realtime multi-user message broadcasting.
  - Realtime chat-group/channel generation and broadcasting.
  - Realtime user event handling.

##### Installation
Pre-requirement for install + execution to work properly :
- [Go language] >= v1.10, 
- [Rethinkdb-go driver], 
- [Node.js] >= 8.10+, 
- npm >= 5.6.0 Or yarn

Update configuration as per development environment, once the source code in place : 

- `Rethinkdb configuration` :
    - Sample data import after database create : 
	    - Create database for example `realtimeappdemo1` and import sample data from `sample_data` directory.
	    - Rebuild table indexes using `rethinkdb index-rebuild`.
    - Updates in `backend/main.go`
	    - `Address` : `System_IP_address`/`localhost`/`host address` and rethinkdb connection `port`,
	    - `Database`: database name for connection.
- `Backend` already configured to run on port `9001`, if want to change then `backend/main.go` -> change `port` value.
- `Frontend` already configured to run on port `9000`, if want to change then `frontend/webpack.config.js` -> change value of `port` param.
- Start rethinkdb server or if already started then make sure rethinkdb server is up and running .
- Start backend :
	```sh
	$ cd backend
	$ go run *.go
	```
	For backend tests : ``` $ go test ./tests/*.go ```
- Start frontend : Install the dependencies+devDependencies and start the server 
	```sh
	$ cd frontend
	$ npm install
	$ npm run start:development (hot reload)
	OR
	$ npm run build:development (hot reload + tests)
	```
	For frontend tests, update configuration in `frontend/cypress/cypress-config.json` then -> ``` $ npm run test ```

##### Execute through docker
- Work-in-progress

##### Todo (WIP - Work-in-progress)

 - Writing more tests (work in progress)
 - Code refactor (work in progress)
 - List goes on ...

##### License
----

Apache License 2.0

   [React.js]: <https://github.com/facebook/react>
   [socket.io]: <https://github.com/socketio/socket.io>
   [webpack]: <https://github.com/webpack/webpack>
   [babel]: <https://github.com/babel/babel>
   [Go language]: <https://github.com/golang>
   [websocket]: <https://github.com/gorilla/websocket>
   [rethinkDB]: <https://github.com/rethinkdb/rethinkdb>
   [rethinkdb-go driver]: <https://github.com/rethinkdb/rethinkdb-go>
   [node.js]: <https://nodejs.org/>
   [cypress]: <https://www.cypress.io/>
   [nginx]: <https://www.nginx.com/>
   [Docker]: <https://github.com/docker>