
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const mongoose = require('mongoose');
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

const Question = require('./models/question');
const Message = require('./models/message');

mongoose.connect('mongodb://localhost/macysHackathon');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({extended: true}));

io.on('connection', (socket) => {
	socket.emit('test', { hello: 'world'});

	socket.on('newMessage', function(data) {
  		const newMessage = new Message({
		  sender: data.message.sender,
		  recipient: data.message.recipient,
		  text: data.message.text,
		});

		newMessage.save(function(err, message) {
			console.log('message', message);
		})
	})

	socket.on('newQuestion', function(data) {
  		const newMessage = new Message({
		  sender: data.message.sender,
		  recipient: data.message.recipient,
		  text: data.message.text,
		});

		newMessage.save(function(err, message) {
			console.log('message', message)
			const newQuestion = new Question({
			  	assigner: data.question.assigner,
			  	assignee: data.question.assignee,
			  	text: data.question.text,
			  	category: data.question.category,
			  	messages: [message._id],
	  		})
	  		newQuestion.save((err, question) => (
	  			socket.emit('questionSubmitted', { question })
	  		))
		})
	})
}) 



server.listen(3000, () => {
	console.log('listening on 3000')
})