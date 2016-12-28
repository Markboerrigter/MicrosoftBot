// const builder = require('botbuilder');
// const restify = require('restify');

// var server = restify.createServer();
// server.listen(process.env.port || process.env.PORT || 3978, function () {
   // console.log('%s listening to %s', server.name, server.url); 
// });

// var connector = new builder.ChatConnector({
    // appId: '422495b1-a3b3-4e35-bf27-69484072b7dd',
    // appPassword: 'NgfJ4a6Km4Tszea3b91KCUW'
// });
// const bot = new builder.UniversalBot(connector);
// server.post('/api/messages', connector.listen());

// bot.dialog('/', function (session) {
    // session.send("Hello World");
// });