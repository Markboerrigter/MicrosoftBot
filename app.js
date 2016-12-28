const builder = require('botbuilder');
const restify = require('restify');

const server = restify.createServer();
server.listen(4770, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: '422495b1-a3b3-4e35-bf27-69484072b7dd',
    appPassword: 'NgfJ4a6Km4Tszea3b91KCUW'
});
const bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.dialog('/', function (session) {
    session.send("Hello World");
});