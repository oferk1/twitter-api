# twitter-api

Description
*************

This assignment exposes an API with 2 entry points:
The first one receives a hashtag as a parameter and returns a list of the top 5 most influential people talking about that hashtag.
The second one receives a hashtag as well but it returns a list of searches made through your API by that hashtag.
The API responses you may use any format known to you (XML, JSON ...)

Installation instructions (linux)
**********************************
Create a twitter app in https://apps.twitter.com/app/new and write down the following properties:
CONSUMER_KEY, CONSUMER_SECRET,ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET

Run:
* npm install
* npm install -g mocha

Then execute the following line, filling in the paramters from your created tweeter app
CONSUMER_KEY=xxxxx CONSUMER_SECRET=xxxxx ACCESS_TOKEN_KEY=xxx-yyy ACCESS_TOKEN_SECRET=xxxxx NODE_PATH=$NODE_PATH:./models:./helpers:./config node app.js

You may also try the following url's in your browser to see that the application is running:
http://localhost:3000/influential/haiku
(should return a json of the following form {"results":"Name A, Name B, Name C"})

http://localhost:3000/list/haiku
(should return a json of the following form {"results":{[timestamp 1]:"Name A, Name B, Name C",[timestamp 2]:"Name A, Name B, Name C",[timestamp 3]:"Name A, Name B"})

Tests
*****
To execute the tests run
CONSUMER_KEY=xxxxx CONSUMER_SECRET=xxxxx ACCESS_TOKEN_KEY=xxx-yyy ACCESS_TOKEN_SECRET=xxxxx NODE_PATH = NODE_PATH=$NODE_PATH:./models:./helpers:./config mocha
