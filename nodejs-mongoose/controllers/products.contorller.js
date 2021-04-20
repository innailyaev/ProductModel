const roomModel = require('../models/products.model');


const createRoom = (req, res) => {
    // const data = req.body;
    const {roomName, roomNumber, floor} = req.body;
    if (roomNumber < 0) {
        return res.json({"error": "asfsaf"})
    }
    const room = new roomModel({
        roomName: roomName,
        roomNumber: roomNumber,
        floor: floor,
    });
    room.save((err) => {
        if (err) return res.json({"error": err})
        return res.json({"success": room})
    });


}

const getRooms = (req, res) => {
    roomModel.find({}).then((rooms) => {
        return res.send(rooms)
    });
}

module.exports = {
    create: createRoom,
    getAll: getRooms
}
