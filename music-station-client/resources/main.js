window.onload = function () {

    let auth = sessionStorage.getItem('auth');
    console.log(auth);

    if (auth) {
        document.getElementById("user").style.display = "none";
        document.getElementById("pass").style.display = "none";
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
        document.getElementById("songs").style.display = "block";
        document.getElementById("playlist").style.display = "block";
        document.getElementById("audio").style.display = "block";
        document.getElementById('error').style.display = 'none';
        getSongs();
        getPlaylist();

        document.getElementById('search-btn').onclick = function (event) {
            event.preventDefault();
            let key = document.getElementById('search').value;
            if (key) {
                console.log("adsasda", document.getElementById('search').value);
                if (document.getElementById('search').value) {
                    document.getElementById("songs").innerHTML = "";
                    searchByTitle(document.getElementById('search').value);
                }
            } else {
                document.getElementById("songs").innerHTML = "";
                getSongs();
            }

        }

    } else {

        console.log("not auth");
        document.getElementById('login-btn').onclick = function (event) {
            event.preventDefault();
            console.log("go go go ", document.getElementById('username').value), " ", document.getElementById('password'.value);
            checkAuth(document.getElementById('username').value, document.getElementById('password').value);

        }

    }

    document.getElementById('logout-btn').onclick = function (event) {
        event.preventDefault();
        sessionStorage.clear();
        document.getElementById("login-btn").style.display = "block";
        document.getElementById("user").style.display = "block";
        document.getElementById("pass").style.display = "block";
        document.getElementById("logout-btn").style.display = "none";
        document.getElementById("songs").innerHTML = "";
        document.getElementById("songs").style.display = "none";
        document.getElementById("playlist").innerHTML = "";
        document.getElementById("playlist").style.display = "none";
        const audioContainer = document.getElementById("player");
        if(audioContainer) {
            audioContainer.pause();
        }
    
        document.getElementById("audio").style.display = "none";
    }




}

var songLoop = false;
var counter = 0;
var songList = [];

function gatherSongList() {
    songList.length = 0;
    var searchEles = document.getElementsByClassName("path");
    for (var i = 0; i < searchEles.length; i++) {
        songList.push(searchEles[i].innerHTML);
    }
}

async function searchByTitle(word) {
    let auth = sessionStorage.getItem('auth');
    if(auth) {
        if (!word) {
            word = "-1";
        }
        console.log(word);
        let songs = await fetch('http://localhost:4000/songs/' + word).then(res => res.json());
        songs.forEach(s => renderSong(s));
    }
    
}

async function checkAuth(username, password) {
    if (username && password) {
        let auth = await fetch('http://localhost:4000/user/' + username + '/pass/' + password).then(res => res.json());
        console.log(auth);
        if (auth) {
            console.log("authhh ", auth);
            sessionStorage.setItem('auth', auth);

            document.getElementById("login-btn").style.display = "none";
            document.getElementById("user").style.display = "none";
            document.getElementById("pass").style.display = "none";
            document.getElementById("logout-btn").style.display = "block";
            document.getElementById("songs").style.display = "block";
            document.getElementById("playlist").style.display = "block";
            document.getElementById('error').style.display = 'none';

            getSongs();
            getPlaylist();
        } else {
            document.getElementById('error').style.display = 'block';
            console.log("user not found", auth);
        }
    } else {
        document.getElementById('error').style.display = 'block';
        console.log("user not found", auth);
    }

}

async function getUser(username) {
    let user = await fetch('http://localhost:4000/user/' + username).then(res => res.json());
    return user;
}

async function getSongs() {
    let songs = await fetch('http://localhost:4000/songs').then(res => res.json());
    songs.forEach(s => renderSong(s));
}

async function getPlaylist() {
    let username = sessionStorage.getItem('auth');
    let songs = await fetch('http://localhost:4000/user/' + username.split('-')[1]).then(res => res.json());
    if (songs.playlist.length == 0) {
        emptyResult();
    } else {
        songs.playlist.forEach(s => renderPlaylist(s));
    }

}

async function addSong(song) {
    let username = sessionStorage.getItem('auth');
    let result = await fetch('http://localhost:4000/user/add/' + username.split('-')[1], {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(song)
    }).then(res => res.json());
    result.playlist.forEach(s => renderPlaylist(s));
}

async function removeSong(song) {
    let username = sessionStorage.getItem('auth');
    let result = await fetch('http://localhost:4000/user/remove/' + username.split('-')[1], {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(song)
    }).then(res => res.json());
    if (result.playlist.length == 0) {
        emptyResult();
    } else {
        result.playlist.forEach(s => renderPlaylist(s));
    }

}

function emptyResult() {
    const container = document.getElementById("playlist");
    const empty = document.createElement('div');
    empty.classList = 'row';

    const divCol = document.createElement('div');
    divCol.classList = 'col';

    const res = document.createElement('h1');
    res.textContent = 'No Songs in Your Playlist';
    divCol.appendChild(res);
    empty.appendChild(divCol);
    container.appendChild(empty);
}

function renderPlaylist(song) {
    const container = document.getElementById("playlist");

    const divRow = document.createElement('div');
    divRow.classList = 'row';
    divRow.style.border = '1px solid';
    divRow.style.padding = '3px';
    divRow.style.textAlign = 'center';
    divRow.id = song.id;

    const divCol = document.createElement('div');
    divCol.classList = 'col';
    const idRow = document.createElement('p');
    idRow.textContent = song.id;
    divCol.appendChild(idRow);

    const divCol2 = document.createElement('div');
    divCol2.classList = 'col';
    const artist = document.createElement('p');
    artist.textContent = song.artist;
    divCol2.appendChild(artist);

    const divCol3 = document.createElement('div');
    divCol3.classList = 'col';
    const title = document.createElement('p');
    title.textContent = song.title;
    divCol3.appendChild(title);

    const divCol4 = document.createElement('div');
    divCol4.classList = 'col';
    const releaseDate = document.createElement('p');
    releaseDate.textContent = song.releaseDate;
    divCol4.appendChild(releaseDate);

    const divCol5 = document.createElement('div');
    divCol5.classList = 'col';

    const addButton = document.createElement('a');
    addButton.classList = 'btn btn-secondary';
    addButton.textContent = 'Remove';
    addButton.onclick = function () {
        document.getElementById('playlist').innerHTML = "";
        removeSong(song);
    };

    divCol5.appendChild(addButton);

    const divCol6 = document.createElement('div');
    divCol6.classList = 'col';

    const playButton = document.createElement('a');
    playButton.classList = 'btn btn-secondary';
    playButton.textContent = 'Play';
    playButton.onclick = function () {


        var searchEles = document.getElementsByClassName("path");
        for (var i = 0; i < searchEles.length; i++) {
            songList.push(searchEles[i].innerHTML);
        }

        const aud = document.getElementById("player");
        if (!aud) {

            let leng = songList.length;
            counter = songList.findIndex(u => u == song.path);

            var sound = document.createElement('audio');
            sound.id = "player";
            sound.src = song.path;
            sound.type = "audio/mpeg";
            sound.controls = 'controls';
            //sound.loop = 'true';
            const audioContainer = document.getElementById("audio");
            audioContainer.appendChild(sound);
            sound.play();

            sound.addEventListener("ended", function () {
                sound.currentTime = 0;
                if (!songLoop) {
                    counter++;
                }
                console.log(counter);
                let index = songList[counter];
                console.log(index);
                if (index) {
                    sound.src = index;
                    sound.play();
                } else {
                    counter = 0;
                    sound.src = songList[counter];
                    sound.play();
                }

            });

            var previous = document.createElement('a');
            previous.classList = 'btn btn-secondary';
            previous.textContent = 'Previous';
            previous.addEventListener('click', function (event) {
                gatherSongList();
                counter--;
                if (counter > leng - 1) {
                    counter = 0;
                } else if (counter < 0) {
                    counter = leng - 1;
                }
                let index = songList[counter];
                if (index) {
                    sound.src = index;
                    sound.play();
                } else {
                    counter = 0;
                    sound.src = songList[counter];
                    sound.play();
                }
            });
            audioContainer.appendChild(previous);


            var next = document.createElement('a');
            next.classList = 'btn btn-secondary';
            next.textContent = 'Next';
            next.addEventListener('click', function (event) {
                gatherSongList();
                counter++;
                if (counter > leng - 1) {
                    counter = 0;
                } else if (counter < 0) {
                    counter = 0;
                }
                let index = songList[counter];
                if (index) {
                    sound.src = index;
                    sound.play();
                } else {
                    counter = 0;
                    sound.src = songList[counter];
                    sound.play();
                }
            });
            audioContainer.appendChild(next);

            var repeat = document.createElement('a');
            repeat.classList = 'btn btn-secondary';
            repeat.textContent = 'Repeat';
            repeat.addEventListener('click', function (event) {
                gatherSongList();
                if (songLoop) {
                    songLoop = false;
                } else {
                    songLoop = true;
                }
            });
            audioContainer.appendChild(repeat);

        } else {
            var sound = document.getElementById("player");
            sound.src = song.path;
            sound.play();
        }

    }



    divCol6.appendChild(playButton);

    const divCol7 = document.createElement('div');
    divCol7.classList = 'col';
    divCol7.style.visibility = 'hidden';
    const path = document.createElement('p');
    path.textContent = song.path;
    path.className = 'path';
    divCol7.appendChild(path);

    divRow.appendChild(divCol);
    divRow.appendChild(divCol2);
    divRow.appendChild(divCol3);
    divRow.appendChild(divCol4);
    divRow.appendChild(divCol7);
    divRow.appendChild(divCol5);
    divRow.appendChild(divCol6);


    container.appendChild(divRow);




}

function renderSong(song) {

    console.log(song);
    const container = document.getElementById("songs");
    const divRow = document.createElement('div');
    divRow.classList = 'row';
    divRow.id = song.id;

    const divCol = document.createElement('div');
    divCol.classList = 'col';
    const idRow = document.createElement('p');
    idRow.textContent = song.id;
    divCol.appendChild(idRow);

    const divCol2 = document.createElement('div');
    divCol2.classList = 'col';
    const artist = document.createElement('p');
    artist.textContent = song.artist;
    divCol2.appendChild(artist);

    const divCol3 = document.createElement('div');
    divCol3.classList = 'col';
    const title = document.createElement('p');
    title.textContent = song.title;
    divCol3.appendChild(title);

    const divCol4 = document.createElement('div');
    divCol4.classList = 'col';
    const releaseDate = document.createElement('p');
    releaseDate.textContent = song.releaseDate;
    divCol4.appendChild(releaseDate);

    const divCol5 = document.createElement('div');
    divCol5.classList = 'col';

    const addButton = document.createElement('a');
    addButton.classList = 'btn btn-secondary';
    addButton.textContent = 'Add to playlist';
    addButton.onclick = function () {
        document.getElementById('playlist').innerHTML = "";
        addSong(song);
    }

    divCol5.appendChild(addButton);

    divRow.appendChild(divCol);
    divRow.appendChild(divCol2);
    divRow.appendChild(divCol3);
    divRow.appendChild(divCol4);
    divRow.appendChild(divCol5);

    container.appendChild(divRow);

}