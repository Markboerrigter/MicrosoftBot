var restify = require('restify');
var builder = require('botbuilder');

// Get secrets from server environment
var botConnectorOptions = { 
    appId: '422495b1-a3b3-4e35-bf27-69484072b7dd',
    appPassword: 'NgfJ4a6Km4Tszea3b91KCUW'
};
// Create bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
bot.dialog('/', function (session) {
   session.send('Hello World'); 
});
// Setup Restify Server
var server = restify.createServer();
server.use(restify.CORS());
// Handle Bot Framework messages
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});