var restify = require('restify');
var builder = require('botbuilder');

// Get secrets from server environment
var connector = new builder.ChatConnector({
    // appId: process.env.BOTFRAMEWORK_APPID, 
    // appSecret: process.env.BOTFRAMEWORK_APPSECRET 
    appId: '422495b1-a3b3-4e35-bf27-69484072b7dd',
    appPassword: 'NgfJ4a6Km4Tszea3b91KCUW'
});
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

// Create bot
var bot = new builder.UniversalBot(connector);
var contents = fs.readFileSync("images.json");
var jsonContent = JSON.parse(contents);
var images = jsonContent.images;
var myRandomElement = images.randomElement()
//=========================================================
// Bots Middleware
//=========================================================

// Anytime the major version is incremented any existing conversations will be restarted.
bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));

//=========================================================
// Bots Global Actions
//=========================================================


//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    function (session) {
        // Send a greeting and show help.
        session.send("Hi... I'm Immy, together we will play a game!");
        session.beginDialog('/picture');
    }
]);

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