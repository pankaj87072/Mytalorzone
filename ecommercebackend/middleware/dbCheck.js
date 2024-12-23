const mongoose = require('mongoose');

const dbCheck = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database connection is not ready'
    });
  }
  next();
};

module.exports = dbCheck; 