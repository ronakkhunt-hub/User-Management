import React, { useEffect, useState } from 'react'
import image from "../../assets/songPoster/No_Competition.png"
import music from '../../assets/songs/No_Competition.mp3';
import image1 from "../../assets/songPoster/Aabaad_Barbaad.jpg";
import music1 from '../../assets/songs/Aabaad_Barbaad.mp3';
import image2 from "../../assets/songPoster/Ek_Raat.png";
import music2 from '../../assets/songs/Ek_Raat.mp3';

import './Music.css'

function Music() {
    const [buttonToggleClass, setbuttonToggleClass] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [songsData, setSongsData] = useState([]);
    const [songIndex, setSongIndex] = useState(0);
    const [title, setTitle] = useState("No_Competition");
    const [artist, setArtist] = useState("Divine x Jass Manak");
    const [songImage, setImage] = useState(image);
    const [song, setSong] = useState(music);
    const [currentTimeDuration, setcurrentTimeDuration] = useState("0:00")
    const [timeDuration, setTimeDuration] = useState("2:44")
    const [progressBar, setProgressBar] = useState(0)

    useEffect(() => {
        const songs = [
            {
                name: "No_Competition",
                title: "No_Competition",
                artist: "Divine x Jass Manak",
                image: image,
                song: music
            },
            {
                name: "Aabaad_Barbaad",
                title: "Aabaad_Barbaad",
                artist: "Arijit Singh",
                image: image1,
                song: music1
            },
            {
                name: "Ek_Raat",
                title: "Ek_Raat",
                artist: "Vilen",
                image: image2,
                song: music2
            }
        ]


        function getSongsData() {
            setSongsData(songs)
        }
        getSongsData();
    }, [])

    let audio = document.querySelector('audio')

    function playMusic() {
        setIsPlaying(true)
        audio.play();
        setbuttonToggleClass(!buttonToggleClass)
    }
    
    function pauseMusic() {
        setIsPlaying(false)
        audio.pause();
        setbuttonToggleClass(!buttonToggleClass)
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
    
    
    function timeUpdate(event) {
        const { currentTime, duration } = event.nativeEvent.srcElement
        setProgressBar((currentTime / duration) * 100);
        
        const minute = Math.floor(currentTime / 60)
        let second = Math.floor(currentTime % 60)
        
        if (second < 10) {
            second = `0${second}`
        }
        
        const currentTimeProgress = `${minute}:${second}`;
        setcurrentTimeDuration(currentTimeProgress)
        
        const final = Math.floor(duration / 60)
        const final2 = Math.floor(duration % 60)
        
        const totalDuration = `${final}:${final2}`;
        setTimeDuration(totalDuration);
    }
    
    function progressBarClick(event) {
        const { duration } = audio;
        let move_progress = event.nativeEvent.offsetX / event.nativeEvent.srcElement.clientWidth * duration;
        audio.currentTime = move_progress
    }
    
    function songEnded() {
        nextSong();
    }
    
    const nextSong = () => {
        setSongIndex((songIndex + 1) % songsData.length)
        loadSong(songsData[songIndex])
        playMusic()
    }
    
    const prevSong = () => {
        setSongIndex((songIndex - 1 + songsData.length) % songsData.length)
        loadSong(songsData[songIndex])
        playMusic()
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
                    <div className={buttonToggleClass ? "cd" : "cd anime"}>
                        <img src={songImage} alt="kjndkvbs" />
                        <span className="cdDot">
                            <span className="cdDotInner"></span>
                        </span>
                    </div>
                    <div className="contents">
                        <h5 className="song_title">{title}</h5>
                        <h6 className="artist">{artist ? artist : 'unknown'}</h6>

                        <div className="progress_container">
                            <div className="progress_duration_meter">
                                <div id="current_time">{currentTimeDuration}</div>
                                <div id="duration">{timeDuration}</div>
                            </div>
                            <div className="progress_div" onClick={(e) => progressBarClick(e)} id="progress_div">
                                <div style={{ width: `${progressBar}%` }} className="progressBar" id="progress"></div>
                            </div>
                        </div>

                        <audio onEnded={songEnded} onTimeUpdate={(e) => timeUpdate(e)} id="audio" src={song} />
                        <div className="manageButtons">
                            <div onClick={backwardHandler} className="backwardButton">
                                <i id="forward" className="fas fa-step-backward"></i>
                            </div>
                            <div onClick={playHandler} className="playButton">
                                <i id="play" className={buttonToggleClass ? "fas fa-play" : "fas fa-pause"}></i>
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
