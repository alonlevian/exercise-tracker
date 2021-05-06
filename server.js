const express = require('express')
const app = express()
const mongoose = require('mongoose');
const User = require('./models/user');
const cors = require('cors');
const Exercise = require('./models/exercise');
require('dotenv').config()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

mongoose.connect('mongodb+srv://alon:alon@cluster0.5smcq.mongodb.net/short-urls?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/api/users', async (req, res) => {
  const username = req.body.username;
  const user = new User({ username });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

app.get('/api/users', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.post('/api/users/:_id/exercises', async (req, res) => {
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date ? new Date(req.body.date) : new Date();

  const exercise = new Exercise({ description, duration, date, owner: req.params._id });
  await exercise.save();

  const user = await User.findById(req.params._id);

  res.send({...user.toJSON(), ...exercise.toJSON()});
});

app.get('/api/users/:_id/logs', async (req, res) => {
  const user = await User.findById(req.params._id);
  await user.populate({
    path: 'exercises'
  }).execPopulate();

  res.send({ ...user, log: user.exercises, count: user.exercises.length });
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
