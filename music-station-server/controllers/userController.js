const User = require('../models/user');


exports.getAllUsers = (req, res, next) => {
    res.status(200).json(User.getAllUsers());
}

exports.checkAuth = (req, res, next) => {
    res.status(200).json(User.checkAuth(req.params.u, req.params.p));
}

exports.getUser = (req, res, next) => {
    res.status(200).json(User.getUser(req.params.u));
}

exports.update = (req, res, next) => {
    const user = req.body;
    const newUser = new User(req.params.uid, user.firstname, user.lastname, user.username, user.password, user.playlist).update();
    res.status(200).json(newUser);
}

exports.addSong = (req, res, next) => {
    const song = req.body;
    res.status(200).json(User.addSong(req.params.uid, song));
}

exports.removeSong = (req, res, next) => {
    const song = req.body;
    res.status(200).json(User.removeSong(req.params.uid, song));
}