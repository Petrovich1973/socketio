var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var moment = require('moment');

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		var date = moment(new Date()).format('DD.MM.YY HH:mm:ss');
		console.log(date + '\t', this.id + '\t', msg);
		io.emit('chat message', msg, date, this.id);
	});
});

http.listen(port, function(){
	console.log('http://localhost:' + port);
});