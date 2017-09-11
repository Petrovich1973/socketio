var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

var moment = require('moment');

var port = process.env.PORT || 3000;

//app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		var date = moment(new Date()).format('DD.MM.YY HH:mm:ss');
		console.log(date + '\t', this.id + '\t', msg);
		io.emit('chat message', msg, date, this.id);
	});
});

server.listen(port, '0.0.0.0', function(){
	console.log('http://localhost:' + port);
});