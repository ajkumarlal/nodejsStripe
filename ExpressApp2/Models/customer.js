var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Customer = new Schema({
    email: String,
    amount: Number,
    reservations: [
        {
            reservationID: String,
            token: String,
            time: { type: Date, default: Date.now }
        }
    ],
  });

module.exports = mongoose.model('customers', Customer);