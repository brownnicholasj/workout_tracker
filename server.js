const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
	useNewUrlParser: true,
	useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('mongoose connected');
});

// routes
app.use(routes);

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
