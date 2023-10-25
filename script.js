const audio = document.querySelector('audio')
const playPauseSvg = document.querySelector('img[alt="playPause"]');
const progressBar = document.querySelector('.music-progress');
const music_actor = document.querySelector('.music_actor');
const music_title = music_actor.nextElementSibling;
const musicControls = Array.from(document.querySelector('.music-controls').children);

const playMusic = () =>{
    audio.play();
    playPauseSvg.src = './Img/pause-filled.svg';
}

const pauseMusic = () => {
    audio.pause();
    playPauseSvg.src = './Img/play-bold.svg';
}

const playPauseMusic = () => {
    if (playPauseSvg.src.includes('play-bold')) playMusic();
    else pauseMusic();
}

const nextMusic = () => {
    if (keyId === musicData.length - 1) keyId = 0; 
    else keyId++;        
    musicDetail(musicData[keyId]); 
}

const prevMusic = () => {
    if (keyId != 0) keyId--;
    else keyId = musicData.length - 1;
    musicDetail(musicData[keyId]); 
}

const musicData = [
    { id: 1, music_actor: 'Elvis Presley', music_title: "Can't Help Falling In Love", audioPath: "Elvis_Presley_-_Can't_Help_Falling_In_Love_(Official_Audio)(256k)" },
    { id: 2, music_actor: 'SATV Music', music_title: "Found What I've Been Looking For", audioPath: "Found_What_I've_Been_Looking_For(256k)" },
    { id: 3, music_actor: 'Lewis Capaldi', music_title: "Wish You The Best", audioPath: "Lewis_Capaldi_-_Wish_You_The_Best_CeeNaija.com_" },
    { id: 4, music_actor: 'Adele', music_title: "Love In The Dark", audioPath: "Love_In_The_Dark(256k)" },
    { id: 5, music_actor: 'Tom Odell', music_title: "Another Love", audioPath: "Tom_Odell_-_Another_Love_" },
];

const musicDetail = (data) =>{
    music_actor.innerText = data.music_actor;
    music_title.innerText = data.music_title;
    audio.src = `./Audio/${data.audioPath}.mp3`;
    playMusic();
}

// Add width to our ProgressBar based on Audio time
audio.addEventListener('timeupdate', ()=>{
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = currentTime / duration * 100;

    progressBar.style.width = `${progress}%`;
    if(currentTime == duration)
        nextMusic();
})

document.addEventListener('DOMContentLoaded', playMusic);

let keyId = 0;
document.addEventListener('keypress', e => {  
    if (e.key === ' ')
        playPauseMusic()
    else if (e.key === 'n')
        nextMusic();
    else if (e.key === 'p')
        prevMusic();
    else if (e.key === 's'){
        audio.currentTime = 0; 
        pauseMusic();
    }
});

musicControls.forEach(item => {
    if (item.alt == 'prev')
        item.addEventListener('click', prevMusic);
    else if (item.alt == 'next')
        item.addEventListener('click', nextMusic);
    else if(item.alt = 'playPause'){
        item.addEventListener('click', playPauseMusic)
    }
});