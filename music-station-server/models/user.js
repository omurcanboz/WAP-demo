let userList = [
    {
        "id": "1",
        "firstname": "John",
        "lastname": "Wick",
        "username": "j123",
        "password": "123",
        "playlist": []
    },
    {
        "id": "1",
        "firstname": "Clark",
        "lastname": "Kent",
        "username": "c123",
        "password": "123",
        "playlist": [
            {
                "id": "2",
                "artist": "David Guetta ft. Sia",
                "title": "Titanium",
                "releaseDate": "24/02/2011",
                "path": "./musics/titanium.mp4"
            }
        ]
    }
];

module.exports = class User {
    constructor(id, firstname, lastname, username, password, playlist = []) {
        this.uid = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.playlist = playlist
    }

    static addSong(username, song) {
        const idx = userList.findIndex(u => u.username == username);
        if (idx > -1) {
            const index = userList[idx].playlist.findIndex(s => s.id == song.id);
            if (index == -1) {
                userList[idx].playlist.push(song);
            }
            return userList[idx];
        } else {
            throw new Error("User not found!");
        }

    }

    static removeSong(username, song) {
        const idx = userList.findIndex(u => u.username == username);
        if (idx > -1) {
            const index = userList[idx].playlist.findIndex(s => s.id == song.id);
            if (index > -1) {
                userList[idx].playlist.splice(index, 1);
                return userList[idx];
            }
        } else {
            throw new Error("User not found!");
        }

    }

    static checkAuth(username, password) {
        const index = userList.findIndex(u => u.username == username && u.password == password);
        if (index > -1) {
            const user = userList[index];
            return Date.now() + '-' + user.username;
        } else {
            return null;
        }

    }

    static getUser(username) {
        const index = userList.findIndex(u => u.username == username);
        if (index > -1) {
            return userList[index];
        } else {
            throw new Error("User not found!");
        }
    }

    static getAllUsers() {
        return userList;
    }

}