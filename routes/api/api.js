const router = require('express').Router();
const Workout = require('../../models/workout.js');
const mongojs = require('mongojs');

const aggregate = Workout.aggregate([]);

router.post('/workouts', ({ body }, res) => {
	Workout.create(body)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.post('/workouts/range', ({ body }, res) => {
	Workout.insertMany(body)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.put('/workouts/:id', (req, res) => {
	console.log(req.body);
	Workout.where({ _id: mongojs.ObjectId(req.params.id) })
		.update({
			$push: {
				exercises: [req.body],
			},
		})
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.get('/workouts/range', (req, res) => {
	Workout.find({})
		.sort({ date: -1 })
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

// router.get('/workouts', (req, res) => {
// 	Workout.find({})
// 		.sort({ date: -1 })
// 		.then((dbWorkout) => {
// 			res.json(dbWorkout);
// 		})
// 		.catch((err) => {
// 			res.status(400).json(err);
// 		});
// });

router.get('/workouts', (req, res) => {
	aggregate
		.addFields({
			totalDuration: { $sum: '$exercises.duration' },
		})
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

module.exports = router;
