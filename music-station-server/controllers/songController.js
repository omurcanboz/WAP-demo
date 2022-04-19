const Song = require('../models/song');

exports.getSongList = (req, res, next) => {
    res.status(200).json(Song.getSongList());
}

exports.findByKey = (req, res, next) => {
    res.status(200).json(Song.findByKey(req.params.key));
}
