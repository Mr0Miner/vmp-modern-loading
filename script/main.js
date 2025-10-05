// Config-driven media and staff rendering
var CONFIG = window.CONFIG || {};
var SONGS = (CONFIG.audio && CONFIG.audio.songs) || [
    { src: "song/song1.mp3", title: "Asketa & Natan Chaim - More [NCS Release]" },
    { src: "song/song2.mp3", title: "Akacia - Electric [NCS Release]" },
    { src: "song/song3.mp3", title: "Wiguez & Vizzen - Running Wild [NCS Release]" }
];
var DEFAULT_VOLUME = (CONFIG.audio && CONFIG.audio.defaultVolume != null) ? CONFIG.audio.defaultVolume : 0.2;
var currentSongIndex = 0;

function pickRandomSongIndex() {
    return Math.floor(Math.random() * SONGS.length);
}

function setSongByIndex(index) {
    var audioEl = document.getElementById("loading");
    var titleEl = document.getElementById("songname");
    if (!audioEl || !SONGS.length) return;
    currentSongIndex = ((index % SONGS.length) + SONGS.length) % SONGS.length;
    var song = SONGS[currentSongIndex];
    audioEl.src = song.src;
    if (titleEl) {
        titleEl.innerHTML = song.title;
    }
    audioEl.play().catch(function () {});
}

document.addEventListener("DOMContentLoaded", function () {
    // Random initial song
    currentSongIndex = pickRandomSongIndex();
    setSongByIndex(currentSongIndex);

    // Force audio autoplay (browser might block; we'll add a user-gesture fallback below)
    try {
        var audioEl = document.getElementById('loading');
        if (audioEl) {
            var playPromise = audioEl.play();
            if (playPromise && typeof playPromise.then === 'function') {
                playPromise.catch(function () {
                    // Autoplay blocked; wait for first user interaction to play
                    var resume = function () {
                        audioEl.play().catch(function () {});
                        document.removeEventListener('click', resume);
                        document.removeEventListener('keydown', resume);
                    };
                    document.addEventListener('click', resume);
                    document.addEventListener('keydown', resume);
                });
            }
        }
    } catch (e) {}

    // Inject local video file if configured
    try {
        var videoFile = (CONFIG.video && (CONFIG.video.file || CONFIG.video.embedUrl)) || null;
        if (videoFile) {
            var container = document.querySelector('.video-background.video-container');
            if (container) {
                var video = document.createElement('video');
                video.src = videoFile;
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                container.appendChild(video);
            }
        }
    } catch (e) {}

    // Render staff list from config
    try {
        var staffTarget = document.getElementById('staffList');
        var staff = CONFIG.staff || [];
        if (staffTarget && staff.length) {
            staffTarget.innerHTML = staff.map(function (member) {
                var roleClass = member.roleClass || '';
                var avatar = member.avatar || '';
                var safeName = member.name || '';
                var safeRole = member.role || '';
                return (
                    '<div class="person">' +
                        '<img src="' + avatar + '">' +
                        '<span class="menu-text">' + safeName + '<br>' +
                            '<div class="' + roleClass + '"> ' + safeRole + ' </div>' +
                        '</span>' +
                    '</div>'
                );
            }).join('');
        }
    } catch (e) {}

    // Apply configurable logo
    try {
        var logo = CONFIG.logo || {};
        var logoImg = document.getElementById('serverLogo');
        if (logoImg) {
            if (logo.src) logoImg.src = logo.src;
            if (logo.width) logoImg.width = logo.width;
        }
    } catch (e) {}
});

// Function for lower or higher up sound in background, its working function in script but its not noted in text//
var play = false;
var vid = document.getElementById("loading");
vid.volume = DEFAULT_VOLUME;
window.addEventListener('keyup', function (e) {
    if (e.which == 38) { // ArrowDOWN
        vid.volume = Math.min(vid.volume + 0.025, 1);
    } else if (e.which == 40) { // ArrowUP
        vid.volume = Math.max(vid.volume - 0.025, 0);
    };
});
// Function for lower or higher up sound in background, its working function in script but its not noted in text//

var mutetext = document.getElementById("text");
var songname = document.getElementById("songname");

window.addEventListener("keyup", function (event) {
    if (!SONGS.length) return;
    if (event.which == 37) { // ArrowLEFT
        setSongByIndex(currentSongIndex - 1);
        mutetext.innerHTML = "MUTE";
    }

    if (event.which == 39) { // ArrowRIGHT
        setSongByIndex(currentSongIndex + 1);
        mutetext.innerHTML = "MUTE";
    }

});

// Clickable menu controls
document.addEventListener('DOMContentLoaded', function () {
    try {
        var up = document.querySelector('.arrow-up img');
        var down = document.querySelector('.arrow-down img');
        var left = document.querySelector('.music-change img:nth-child(1)');
        var right = document.querySelector('.music-change img:nth-child(2)');
        var space = document.querySelector('.space img');

        if (up) up.addEventListener('click', function () { vid.volume = Math.min(vid.volume + 0.05, 1); });
        if (down) down.addEventListener('click', function () { vid.volume = Math.max(vid.volume - 0.05, 0); });
        if (left) left.addEventListener('click', function () { setSongByIndex(currentSongIndex - 1); mutetext.innerHTML = 'MUTE'; });
        if (right) right.addEventListener('click', function () { setSongByIndex(currentSongIndex + 1); mutetext.innerHTML = 'MUTE'; });
        if (space) space.addEventListener('click', function (e) {
            e.preventDefault();
            if (!audio) return;
            var y = document.getElementById("text");
            audio.paused ? audio.play() : audio.pause();
            y.innerHTML = (y.innerHTML === 'MUTE') ? 'UNMUTE' : 'MUTE';
        });
    } catch (e) {}
});


// Function for pause and play music in background//
var audio = document.querySelector('audio');

if (audio) {

    window.addEventListener('keydown', function (event) {

        var key = event.which || event.keyCode;
        var x = document.getElementById("text").innerText;
        var y = document.getElementById("text");

        if (key === 32 && x == "MUTE") { // spacebar

            event.preventDefault();

            audio.paused ? audio.play() : audio.pause();
            y.innerHTML = "UNMUTE";

        } else if (key === 32 && x == "UNMUTE") {

            event.preventDefault();

            audio.paused ? audio.play() : audio.pause();
            y.innerHTML = "MUTE";
        }
    });
}
// Function for pause and play music in background//

//SHADED-TEXT - Function for switching words in loading animation

var shadedText = document.querySelector('.shaded-text');
var texts = ["JOINING SERVER", "PREPARING ASSETS", "ESTABLISHING CONNECTION"];
var currentText = 0;

setInterval(function () {
    currentText = (currentText + 1) % texts.length;
    shadedText.classList.remove('fade-out');
    void shadedText.offsetWidth;
    shadedText.classList.add('fade-out');
    setTimeout(function () {
        shadedText.textContent = texts[currentText];
    }, 1000);
}, 4000);
//SHADED-TEXT - Function for switching words in loading animation

//PLACEHOLDER - Function for getting handoverdata from lua script with config override
window.addEventListener('DOMContentLoaded', () => {
    try {
        var nameEl = document.querySelector('#namePlaceholder > span');
        if (!nameEl) return;
        var override = CONFIG.user && CONFIG.user.nameOverride;
        var fallback = (window.nuiHandoverData && window.nuiHandoverData.name) || 'My Friend';
        nameEl.innerText = override || fallback;
    } catch (e) {}
});
//PLACEHOLDER - Function for getting handoverdata from lua script

//RANDOMPHRASES - Phrases generated after your steamname
(function welcometext() {
    var welcomes = ['Begin your exciting new adventure.', 'Discover the wonders of your new city.', 'Open the door to a brand-new chapter.', 'Step into a world of new possibilities.', 'Embrace your fresh beginning.',];
    var randomWelcome = Math.floor(Math.random() * welcomes.length);
    document.getElementById('welcomeDisplay').innerHTML = welcomes[randomWelcome];
})();
//RANDOMPHRASES - Phrases generated after your steamname
