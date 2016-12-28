const builder = require('botbuilder');
const restify = require('restify');

const server = restify.createServer();
server.listen(4770, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
const bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.on('error', function (message) {
    console.log(message);
});

bot.dialog('/', function (session) {
    session.send("Hello World");
});