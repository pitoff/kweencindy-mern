module.exports.allBooking = async(req, res) => {
    res.send("Get all bookings");
}

module.exports.myBooking = async(req, res) => {
    res.send("Get my bookings")
}

module.exports.allAcceptedAndConfirmedBooking = async(req, res) => {
    res.send("Get all accepted and confirmed bookings")
}