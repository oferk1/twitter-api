# applicaster-test

Description
*************

This assignment exposes an API with 2 entry points:
The first one receives a hashtag as a parameter and returns a list of the top 5 most influential people talking about that hashtag.
The second one receives a hashtag as well but it returns a list of searches made through your API by that hashtag.
The API responses you may use any format known to you (XML, JSON ...)

Installation instructions (linux)
**********************************
Create a twitter app in https://apps.twitter.com/app/new

Run:
npm install
npm install -g mocha
npm install chai chai-http --save-dev

Then execute the following line, filling in the paramters from your created tweeter app
CONSUMER_KEY=xxxxx CONSUMER_SECRET=xxxxx ACCESS_TOKEN_KEY=xxx-yyy ACCESS_TOKEN_SECRET=xxxxx $NODE_PATH:./models:./helpers node app.js


Tests
*****
To run the tests execute
CONSUMER_KEY=xxxxx CONSUMER_SECRET=xxxxx ACCESS_TOKEN_KEY=xxx-yyy ACCESS_TOKEN_SECRET=xxxxx $NODE_PATH:./models:./helpers mocha