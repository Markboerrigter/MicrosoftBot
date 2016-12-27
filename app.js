var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.send("Hello World");
});




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

