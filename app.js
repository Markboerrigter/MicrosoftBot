var restify = require('restify');
var builder = require('botbuilder');
var fs = require("fs");

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}
// Create chat bot
var connector = new builder.ChatConnector({
    appId: '422495b1-a3b3-4e35-bf27-69484072b7dd',
    appPassword: 'NgfJ4a6Km4Tszea3b91KCUW'
});
var bot = new builder.UniversalBot(connector);
var contents = fs.readFileSync("images.json");
var jsonContent = JSON.parse(contents);
var images = jsonContent.images;
var myRandomElement = images.randomElement()
server.post('/api/messages', connector.listen());

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





bot.dialog('/picture', [
    function (session) {
		var myRandomElement = images.randomElement()
        session.send("I'm now sending you a picture, could you tell me what you think it is?");
        var msg = new builder.Message(session)
            .attachments([{
                contentType: "image/jpeg",
                contentUrl: myRandomElement
            }]);
        session.endDialog(msg);
    }
]);

bot.dialog('/end', [
    function (session, results) {
        // Always say goodbye
        session.send("Ok... See you later!");
    }
]);


