const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    topicId: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    paymentIntentId: {
      type: String,
    },
    status: {
      type: String,
      default: 'pending'
    },
    studentId: {
      type: String,
      required: true,
    },
    teacherId: {
      type: String,
      required: true
    }
  }
)

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
