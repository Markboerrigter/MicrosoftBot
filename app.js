var restify = require('restify');
var builder = require('botbuilder');

// Get secrets from server environment
var connector = new builder.ChatConnector({
	// appId: process.env.BOTFRAMEWORK_APPID, 
    // appSecret: process.env.BOTFRAMEWORK_APPSECRET 
    appId: '422495b1-a3b3-4e35-bf27-69484072b7dd',
    appPassword: 'NgfJ4a6Km4Tszea3b91KCUW'
});

// Create bot
var bot = new builder.UniversalBot(connector);
bot.dialog('/', function (session) {
    session.send("Hello World");
})

// Setup Restify Server
var server = restify.createServer();
server.use(restify.CORS());
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});
// Handle Bot Framework messages

/* 
// Serve a static web page
server.get(//, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));
 */
server.post('/api/messages', connector.listen());