// app.js - Native HTML5 Audio Rabindra Sangeet Player

// 1. Playlists Database (Paths unified to 'assets/' or 'public/' based on your folder)
const playlists = {
    prakriti: [
        { title: "Akash Bhora", artist: "Jayati Chakraborty", fileUrl: "assets/audio/prakriti/Akash Bhora Audio Song Ebong Jayati.mp3", coverUrl: "assets/covers/prakriti/Akaash Bhora.jpg" },
        { title: "Pagla Hawar Badol Dine", artist: "Sraboni Sen", fileUrl: "assets/audio/prakriti/Pagla Hawar Badol Dine(পগল হওয়র বদল দন) -Lyrical Song Sraboni Sen Khelaghar.mp3", coverUrl: "assets/covers/prakriti/Pagla Hawa.jpg" },
        { title: "Prano Bhoriye Trisha Horiye", artist: "Jayati Chakraborty", fileUrl: "assets/audio/prakriti/Pran Bhoriye.mp3", coverUrl: "assets/covers/prakriti/Prano Bhoriye.jpg" },
        { title: "Megher Kole Rod Hesechhe", artist: "Asha Bhosle", fileUrl: "assets/audio/prakriti/Megher Kole Rod Hesechhe মঘর কল রদ হসছ Asha Bhosle Rabindranath Tagore.mp3", coverUrl: "assets/covers/prakriti/Megher.jpg" },
        { title: "Esho Hey Baisakh", artist: "Lopamudra Mitra", fileUrl: "assets/audio/prakriti/Eso Hey Boishakh Lopamudra Mitra Team Lopamudra Mitra.mp3", coverUrl: "assets/covers/prakriti/Esho ai Boishaakh.jpg" },
        { title: "Aaji Jhorer Rate", artist: "Srabani Sen|", fileUrl: "assets/audio/prakriti/Aaji Jhorer Rate Lyrical Video Song Srabani Sen Top Bengali Rainy Song Bhavna Records.mp3", coverUrl: "assets/covers/prakriti/Aaji Jhore Raate.jpeg" },
       
    ],
    prem: [
        { title: "Amar Porano Jaha Chay", artist: "Arijit Singh", fileUrl: "assets/audio/prem/AmaroParanoJahaChay.mp3", coverUrl: "assets/covers/prem/amar o porano.jpg" },
        { title: "Tobu Mone Rekho", artist: "Srabani Sen and Sabyasachi Chakraborty", fileUrl: "assets/audio/prem/Tobu Mone Rekho Srabani Sen Sabyasachi Chakraborty Audio Song.mp3", coverUrl: "assets/covers/prem/Tobu Mone Rekho.jpg" },
        { title: "Sokhi Bhabona Kahare Bole", artist: "Jayati Chakraborty", fileUrl: "assets/audio/prem/Sakhi Bhabana Kahare Bole Jayati Chakraborty সখ ভবন কহর বল Rabindra Sangeet 2021.mp3", coverUrl: "assets/covers/prem/Sokhi bhabona.jpeg" },
        { title: "Kotobaro Bhebechinu", artist: "Mekhla Dasgupta", fileUrl: "assets/audio/prem/Kotobaro Bhebechinu.mp3", coverUrl: "assets/covers/prem/Kotobaro Bhebechinu.jpeg" },
        { title: "Tumi Robe Nirobe", artist: "Srikanto Acharya", fileUrl: "assets/audio/prem/Tumi Robe Nirobe.mp3", coverUrl: "assets/covers/prem/Tumi Robe Nirobe.jpeg" }
    ],
    puja: [
        { title: "Anandaloke Mongolaloke", artist: "Sanjeevani Bhelande", fileUrl: "assets/audio/puja/anandaloke.mp3", coverUrl: "assets/covers/puja/cover-puja-1.jpg" },
        { title: "Akash Bhora Surjo Tara", artist: "Hemanta Mukherjee", fileUrl: "assets/audio/puja/akash-bhora.mp3", coverUrl: "assets/covers/puja/cover-puja-2.jpg" },
        { title: "Tumi Kemon Kore Gan Koro", artist: "Swagatalakshmi Dasgupta", fileUrl: "assets/audio/puja/tumi-kemon.mp3", coverUrl: "assets/covers/puja/cover-puja-3.jpg" },
        { title: "Aguner Poroshmoni Chhoao Prane", artist: "Lopamudra Mitra", fileUrl: "assets/audio/puja/aguner-poroshmoni.mp3", coverUrl: "assets/covers/puja/cover-puja-4.jpg" },
        { title: "Bina Bajao He", artist: "Sanjida Khatun", fileUrl: "assets/audio/puja/bina-bajao.mp3", coverUrl: "assets/covers/puja/cover-puja-5.jpg" }
    ],
    bichitro: [
        { title: "Purano Sei Diner Kotha", artist: "Kishore Kumar & Hemanta", fileUrl: "assets/audio/bichitro/purano-sei.mp3", coverUrl: "assets/covers/bichitro/cover-bichitro-1.jpg" },
        { title: "Dinguli Mor Sonar", artist: "Mohiuzzaman Chowdhury", fileUrl: "assets/audio/bichitro/dinguli-mor.mp3", coverUrl: "assets/covers/bichitro/cover-bichitro-2.jpg" },
        { title: "Tumi Ki Keboli Chhobi", artist: "Indranil Sen", fileUrl: "assets/audio/bichitro/tumi-ki.mp3", coverUrl: "assets/covers/bichitro/cover-bichitro-3.jpg" },
        { title: "Khelaghor Badhte Legechhi", artist: "Naima Islam Naj", fileUrl: "assets/audio/bichitro/khelaghor.mp3", coverUrl: "assets/covers/bichitro/cover-bichitro-4.jpg" },
        { title: "Ami Keboli Swapan", artist: "Sumona Haque", fileUrl: "assets/audio/bichitro/ami-keboli.mp3", coverUrl: "assets/covers/bichitro/cover-bichitro-5.jpg" }
    ]
};

// 2. Global State
let currentPlaylistName = 'prem';
let currentPlaylist = playlists[currentPlaylistName];
let currentTrackIndex = 0;
let isPlaying = false;
let isDragging = false;

// 3. Native Audio Object
const audio = new Audio();
audio.preload = "metadata";

// 4. DOM Elements
const titleEl = document.getElementById('track-title');
const artistEl = document.getElementById('track-artist');
const timeElapsedEl = document.getElementById('time-elapsed');
const timeDurationEl = document.getElementById('time-duration');
const seekBar = document.getElementById('seek-bar');
const playBtn = document.getElementById('btn-play');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const vinylCover = document.getElementById('vinyl-cover');
const playlistSelector = document.getElementById('playlist-selector');

// 5. Initialize the First Track on Load (Without auto-playing on page boot)
loadTrack(currentTrackIndex);

// 6. Audio Event Listeners
audio.addEventListener('loadedmetadata', () => {
    seekBar.max = audio.duration || 0;
    timeDurationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    if (!isDragging && audio.duration) {
        seekBar.value = audio.currentTime;
        timeElapsedEl.textContent = formatTime(audio.currentTime);
        updateSeekVisuals();
    }
});

audio.addEventListener('ended', playNext);

// 7. Core Playback Functions
function loadTrack(index, autoPlay = false) {
    const track = currentPlaylist[index];
    if (!track) return;
    
    audio.src = track.fileUrl;
    audio.load(); 
    
    titleEl.textContent = track.title;
    artistEl.textContent = track.artist;
    
    if (track.coverUrl) {
        vinylCover.style.backgroundImage = `url('${track.coverUrl}')`;
    }
    
    seekBar.value = 0;
    timeElapsedEl.textContent = "0:00";
    timeDurationEl.textContent = "-:--";
    updateSeekVisuals();

    if (autoPlay) {
        audio.play().then(() => {
            updatePlayState(true);
        }).catch(err => console.error("Auto-play prevented:", err));
    }
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        updatePlayState(false);
    } else {
        audio.play().then(() => {
            updatePlayState(true);
        }).catch(err => {
            console.error("Playback Error:", err);
            alert("Playback blocked or file not found at: " + audio.src);
        });
    }
}

function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
    loadTrack(currentTrackIndex, isPlaying); // Keeps playing if it was already playing
}

function playPrev() {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
    } else {
        currentTrackIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
        loadTrack(currentTrackIndex, isPlaying);
    }
}

function updatePlayState(playing) {
    isPlaying = playing;
    if (isPlaying) {
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        vinylCover.style.animationPlayState = 'running';
    } else {
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        vinylCover.style.animationPlayState = 'paused';
    }
}

// 8. Control Listeners
playBtn.addEventListener('click', togglePlay);
document.getElementById('btn-next').addEventListener('click', playNext);
document.getElementById('btn-prev').addEventListener('click', playPrev);

// 9. Scrubber / Seek Bar Logic
seekBar.addEventListener('pointerdown', () => { isDragging = true; });
seekBar.addEventListener('input', () => {
    timeElapsedEl.textContent = formatTime(seekBar.value);
    updateSeekVisuals();
});
seekBar.addEventListener('change', () => {
    audio.currentTime = seekBar.value;
    isDragging = false;
});

function updateSeekVisuals() {
    const max = seekBar.max || 100;
    const percentage = (seekBar.value / max) * 100 || 0;
    seekBar.style.background = `linear-gradient(to right, var(--accent-color) ${percentage}%, rgba(255,255,255,0.15) ${percentage}%)`;
}

// 10. Playlist Switching
playlistSelector.addEventListener('change', (e) => {
    currentPlaylistName = e.target.value;
    currentPlaylist = playlists[currentPlaylistName];
    currentTrackIndex = 0;
    
    loadTrack(currentTrackIndex, isPlaying); // Automatically continues playing if music was active
});

// 11. Utilities (Time & Clock)
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateClock() {
    const clockEl = document.getElementById('clock');
    if (!clockEl) return;
    const now = new Date();
    const timeString = new Intl.DateTimeFormat("en-IN", { 
        timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit", hour12: true 
    }).format(now);
    clockEl.innerHTML = `SHANTINIKETAN · ${timeString.replace(':', '<span style="animation: blink 1s infinite;">:</span>')}`;
}
setInterval(updateClock, 1000);
updateClock();