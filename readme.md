# NodeJS Communication Project
Test system to handle connections with NodeJs. Its main objective is to study connection handling, analyzing how the system can be scaled.

Its functionality is very limited, the server expects several concurrent connections and must answer to all of them handling all connections and storing the actions until they are answered. A client can send several messages and the system must respond to all of them.

# Running the system

Install node_modules:

```javascript
npm i
```

We create an automatic client launcher that creates N clients simultaneously:

```javascript
node laucnherClient.js number_of_clients
```

NOTE: you will be able to launch a restricted number of clients. If you want to launch several (up to 100K) use different computers.

The server will start listening running:

```javascript
npm start
```


# Additional Notes
You can use other clients implemented in order program languages such as Java and C++. However, we recommend executing the JS client.
