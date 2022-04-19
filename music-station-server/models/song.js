let songList = [
    {
        "id": "1",
        "artist": "Linkin Park",
        "title": "In the End",
        "releaseDate": "10/09/2003",
        "path": "./musics/LP.mp3"
    },
    {
        "id": "2",
        "artist": "David Guetta ft. Sia",
        "title": "Titanium",
        "releaseDate": "24/02/2011",
        "path": "./musics/titanium.mp4"
    },
    {
        "id": "3",
        "artist": "Alan Walker",
        "title": "End of Time",
        "releaseDate": "11/06/2021",
        "path": "./musics/endoftime.mp3"
    }
];

module.exports = class Music {

    constructor(id, artist, title, releaseDate, path) {
        this.id = id;
        this.artist = artist;
        this.title = title;
        this.releaseDate = releaseDate;
        this.path = path;
    }


    static getSongList() {
        return songList;
    }

    //search on screen
    static findByKey(key) {
        const list = songList.filter(m => m.title.toLowerCase().indexOf(key.toLowerCase()) !== -1);
        return list;
    }
}