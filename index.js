
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const mongoose = require('mongoose');
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const User = require('./models/user');
const Question = require('./models/question');
const Message = require('./models/message');

// app.set('port', (process.env.PORT || 5000));

mongoose.connect('mongodb://testuser:testing@ds021681.mlab.com:21681/hackathon-db');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/api/users/:associateId', function (req, res) {
	const userId = req.params.associateId;

	User.find({ 'associateId': userId }, function(err, doc) {
  	if (err) console.log(err);

		console.log('data is:', doc)
		res.json(doc)
  });
});

//   app.get('/questions/:id', (req,res) => {
// 	//get question view
// })

 //  app.get('/api/users/:associateId', function (req, res) {
 //     var userId = req.params.associateId;
 //     console.log('userid', userId)
 //     console.log(typeof(userId))

 //     User.findOne({'associateId': '123jsdflk'}, function(user) {
 //     	console.log('user is:', user);
     	
 //     });
 //    // console.log('user:', User.findOne({associateId: '123jsdflk'}))

 // });



// app.get('/users/:associateId/questions', (req,res) => {
// 	//get all questions view
// })
io.on('connection', (socket) => {
	socket.emit('test', { hello: 'world'});

	socket.on('newMessage', function(data) {
  		const newMessage = new Message({
		  sender: data.message.sender,
		  recipient: data.message.recipient,
		  text: data.message.text,
		});

		newMessage.save()
		.then(message => {
			console.log('message', message);
    	})
	})

	socket.on('newQuestion', function(data) {
  		const newMessage = new Message({
		  sender: data.message.sender,
		  recipient: data.message.recipient,
		  text: data.message.text,
		});

		newMessage.save()
		.then(message => {
			console.log('message', message)
			const newQuestion = new Question({
			  	assigner: data.question.assigner,
			  	assignee: data.question.assignee,
			  	text: data.question.text,
			  	category: data.question.category,
			  	messages: [message._id]
	  		})
	  		console.log('newQuestion', newQuestion);
	  		newQuestion.save().then(question => {
	  			socket.emit('questionSubmitted', { question })

	  		})
    	})
	})
});

var port = process.env.PORT || 3000;
server.listen(port);
