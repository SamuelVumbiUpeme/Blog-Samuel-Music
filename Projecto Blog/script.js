const songList = [
    {
        name: "Malandra",
        artist: "Samuel no beatr",
        url: "Malandra_Samuel no beat ft Dj Vítor.mp3",
        monetizedLink: "https://shrinkme.io/Exemplo1", // SEU LINK ENCURTADO AQUI
        cover: ""
    },
    {
        name: "Diana",
        artist: "3 finer",
        url: "3 Finer - Diana.mp3",
        monetizedLink: "https://shrinkme.io/Exemplo2", // SEU LINK ENCURTADO AQUI
        cover: "Capa Do Álbum.jpg"
    }
];

let songIndex = 0;
let isPlaying = false;
const audio = new Audio();

const playlistContainer = document.getElementById('playlist');
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');
const trackArt = document.getElementById('track-art');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progress-bar');

function init() {
    renderPlaylist(songList);
    loadSong(songList[songIndex]);
}

function loadSong(song) {
    trackName.innerText = song.name;
    trackArtist.innerText = song.artist;
    trackArt.src = song.cover;
    audio.src = song.url;
}

function renderPlaylist(list) {
    playlistContainer.innerHTML = '';
    list.forEach((song, index) => {
        const div = document.createElement('div');
        div.classList.add('song-item');
        div.innerHTML = `
            <img src="${song.cover}" onclick="selectSong(${index})">
            <div class="song-info" onclick="selectSong(${index})">
                <h5>${song.name}</h5>
                <p>${song.artist}</p>
            </div>
            <a href="${song.monetizedLink}" target="_blank" class="btn-download-money">
                <i class="fas fa-download"></i> Baixar
            </a>
        `;
        playlistContainer.appendChild(div);
    });
}

function selectSong(index) {
    songIndex = index;
    loadSong(songList[songIndex]);
    playSong();
}

function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

playBtn.addEventListener('click', togglePlay);

audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
});

// Iniciar
init();