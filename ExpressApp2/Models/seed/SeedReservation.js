var mongoose = require('mongoose');
var Reservation = require('../reservation');

var seedReservation = function () {
    
    Reservation.find({}, function (err, documents) {
        
        if (documents.length === 0) {
            
            var prodArry = [
                { reservationName: 'Jersey-City to EWR', tripAmount: 30 , customeremail: 'ajkumarlal@gmail.com' },
                { reservationName: 'EWR-JFK', tripAmount: 20, customeremail: 'ajkumarlal@gmail.com' },
                { reservationName: 'EWR-New York City', tripAmount: 10, customeremail: 'ajkumarlal@gmail.com' }
            ];
            
            for (var i = 0; i < prodArry.length; i++) {
                var data = new Reservation(
                    {
                        reservation: prodArry[i].reservationName,
                        amount: prodArry[i].tripAmount,
                        customeremail : prodArry[i].customeremail,
                        currency: 'USD',
                        paid: false
                    }
                );
                data.save();
            }
            
            console.log('Dummy reservations added!');
        }

    });

};

module.exports = seedReservation;