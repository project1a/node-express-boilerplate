const mongoose = require('mongoose');

const topicSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    description: {
      type: String,
    },
    deepLink: {
      type: String
    },
    topic: {
      type: String,
    },
    userId: {
      type: String
    }
  }
);

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
