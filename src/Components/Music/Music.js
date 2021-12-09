import React, { useEffect, useState } from 'react'
import './Music.css'

function Music() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [songsData, setSongsData] = useState([]);
    const [songIndex, setSongIndex] = useState(0);
    const [title, setTitle] = useState("No_Competition");
    const [artist, setArtist] = useState("Divine x Jass Manak");
    const [songImage, setImage] = useState('https://github.com/ronakkhunt-hub/User-Management/blob/main/src/Assets/songPoster/No_Competition.png?raw=true');
    const [songInfo, setSong] = useState('https://github.com/ronakkhunt-hub/User-Management/blob/main/src/Assets/songs/No_Competition.mp3?raw=true');
    const [currentTimeDuration, setcurrentTimeDuration] = useState("0:00")
    const [timeDuration, setTimeDuration] = useState("2:44")
    const [progressBar, setProgressBar] = useState(0)

    useEffect(() => {
        const songs = [
            {
                name: "No_Competition",
                title: "No_Competition",
                artist: "Divine x Jass Manakcxzxvzxcvb",
                image: 'https://github.com/ronakkhunt-hub/User-Management/blob/main/src/Assets/songPoster/No_Competition.png?raw=true',
                song: 'https://github.com/ronakkhunt-hub/User-Management/blob/main/src/Assets/songs/No_Competition.mp3?raw=true'
            },
            {
                name: "Aabaad_Barbaad",
                title: "Aabaad_Barbaad",
                artist: "Arijit Singh",
                image: 'https://github.com/ronakkhunt-hub/User-Management/blob/main/src/Assets/songPoster/Aabaad_Barbaad.jpg?raw=true',
                song: 'https://github.com/ronakkhunt-hub/User-Management/blob/main/src/Assets/songs/Aabaad_Barbaad.mp3?raw=true'
            },
            {
                name: "Ek_Raat",
                title: "Ek_Raat",
                artist: "Vilen",
                image: 'https://github.com/ronakkhunt-hub/User-Management/blob/main/src/Assets/songPoster/Ek_Raat.png?raw=true',
                song: 'https://github.com/ronakkhunt-hub/User-Management/blob/main/src/Assets/songs/Ek_Raat.mp3?raw=true'
            }
        ]


        function getSongsData() {
            setSongsData(songs)
        }
        getSongsData();
    }, []);

    let music = document.querySelector('audio')
    let play = document.getElementById('play');

    function playMusic() {
        console.log("Play Music Called");
        setIsPlaying(true)
        music.play();
        play.setAttribute('class', 'fas fa-pause')
    }

    function pauseMusic() {
        setIsPlaying(false)
        music.pause();
        play.setAttribute('class', 'fas fa-play')
    }

    const playHandler = () => {
        isPlaying ? pauseMusic() : playMusic()
    }

    const loadSong = (songs) => {
        setTitle(songs.title)
        setArtist(songs.artist)
        setImage(songs.image)
        setSong(songs.song)
    }


    const timeUpdate = (event) => {
        const { currentTime, duration } = event.nativeEvent.srcElement
        setProgressBar((currentTime / duration) * 100);

        const minute = Math.floor(currentTime / 60)
        let second = Math.floor(currentTime % 60)

        if (second < 10) {
            second = `0${second}`
        }

        const currentTimeProgress = `${minute}:${second}`;
        setcurrentTimeDuration(currentTimeProgress)

        let final = Math.floor(duration / 60)
        let final2 = Math.floor(duration % 60)
        if (final < 10) {
            final = `0${final}`
        }
        if (final2 < 10) {
            final2 = `0${final2}`
        }

        if (duration) {
            const totalDuration = `${final}:${final2}`;
            setTimeDuration(totalDuration);
        }
    }

    function progressBarClick(event) {
        const { duration } = music;
        let move_progress = event.nativeEvent.offsetX / event.nativeEvent.srcElement.clientWidth * duration;
        playMusic()
        music.currentTime = move_progress
    }

    function songEnded() {
        nextSong();
    }

    const nextSong = () => {
        setSongIndex((songIndex + 1) % songsData.length)
        loadSong(songsData[songIndex])
        setTimeout(() => {
            playMusic()
        }, .01000);
    }

    const prevSong = () => {
        setSongIndex((songIndex - 1 + songsData.length) % songsData.length)
        loadSong(songsData[songIndex])
        setTimeout(() => {
            playMusic()
        }, .01000);
    }

    function forwardHandler() {
        nextSong();
    }

    function backwardHandler() {
        prevSong();
    }

    return (
        <>
            <div className="player">
                <div className="playerDetails">
                    <div className="cd">
                        <img src={songImage} alt="kjndkvbs" />
                        <span className="cdDot">
                            <span className="cdDotInner"></span>
                        </span>
                    </div>
                    <audio onEnded={songEnded} onTimeUpdate={(e) => timeUpdate(e)} id="audio" src={songInfo} />
                    <div className="contents">
                        <h5 className="song_title">{title}</h5>
                        <h6 className="artist">{artist ? artist : 'unknown'}</h6>

                        <div className="progress_container">
                            <div className="progress_duration_meter">
                                <div id="current_time">{currentTimeDuration}</div>
                                <div id="duration">{timeDuration}</div>
                            </div>
                            <input className="progress" type="range" width="100%" value={progressBar} onClick={(e) => progressBarClick(e)} />
                        </div>

                        <div className="manageButtons">
                            <div onClick={backwardHandler} className="backwardButton">
                                <i id="forward" className="fas fa-step-backward"></i>
                            </div>
                            <div onClick={playHandler} className="playButton">
                                <i id="play" className="fas fa-play"></i>
                            </div>
                            <div onClick={forwardHandler} className="forwardButton">
                                <i className="fas fa-step-forward"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Music
