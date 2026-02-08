const Trip = require('../models/travlr');

// GET /api/trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET /api/trips/:tripCode
const tripsFindByCode = async (req, res) => {
  const tripCode = req.params.tripCode;

  try {
    const trip = await Trip.findOne({ code: tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};
