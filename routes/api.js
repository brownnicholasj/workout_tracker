const router = require('express').Router();
const Workout = require('../models/workout.js');

router.post('/api/transaction', ({ body }, res) => {
	Workout.create(body)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.post('/api/transaction/bulk', ({ body }, res) => {
	Workout.insertMany(body)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.get('/exercise', (req, res) => {
	Workout.find({})
		.sort({ date: -1 })
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

module.exports = router;
