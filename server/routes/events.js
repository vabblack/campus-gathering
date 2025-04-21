import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 }).populate('organizer', 'name email');
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (will be implemented later)
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
      organizer: req.body.organizer // This should be the user ID
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router; 