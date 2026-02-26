import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [candles, setCandles] = useState([true, true, true]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showBirthdayAnimation, setShowBirthdayAnimation] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [cinematicMode, setCinematicMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // ✅ NEW

  const audioRef = useRef(null);
  const videoRef = useRef(null);

  /* 🎵 Play / Pause Music */
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 1;
      audioRef.current.play().catch(() => {});
    }

    setIsPlaying(!isPlaying);
  };

  /* 💕 Floating Hearts */
  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 3 + 3 + "s";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  /* 🎂 Blow ALL candles with one click */
  const blowCandle = () => {
    const allBlown = candles.map(() => false);
    setCandles(allBlown);

    setShowConfetti(true);
    setShowFireworks(true);
    setShowBirthdayAnimation(true);

    setTimeout(() => {
      setShowBirthdayAnimation(false);
    }, 10000);
  };

  const moveNoButton = (e) => {
    const btn = e.target;
    btn.style.position = "absolute";
    btn.style.top = Math.random() * 80 + "%";
    btn.style.left = Math.random() * 80 + "%";
  };

  return (
    <div className={`container ${cinematicMode ? "cinematic" : ""}`}>

      {/* 🎵 Music Button Top Right */}
      <button className="music-btn" onClick={toggleMusic}>
        {isPlaying ? "⏸ Pause Music" : "▶ Play Music"}
      </button>

      <h1 className="banner">
        🎀 Happy Birthday PUNEET 🎀
      </h1>

      {/* ❌ Removed autoPlay */}
      <audio ref={audioRef} loop>
        <source src="music.mp3" type="audio/mpeg" />
      </audio>

      {/* 🎂 Cake + Photo Frames Wrapper */}
      <div className="cake-wrapper">

        <div className="photo-frame left-frame">
          <img src="photo1.jpg" alt="Memory 1" />
        </div>

        <div className="cake">
          <div className="frosting"></div>

          <div className="candle-group-left">
            <div className="candle" onClick={blowCandle}>
              <div className={`flame ${candles[0] ? "" : "blown"}`}></div>
            </div>

            <div className="candle" onClick={blowCandle}>
              <div className={`flame ${candles[1] ? "" : "blown"}`}></div>
            </div>
          </div>

          <div className="candle-group-right">
            <div className="candle" onClick={blowCandle}>
              <div className={`flame ${candles[2] ? "" : "blown"}`}></div>
            </div>
          </div>
        </div>

        <div className="photo-frame right-frame">
          <img src="photo2.jpg" alt="Memory 2" />
        </div>

      </div>

      <p className="message">
        You are the most beautiful part of my life 💕  
        May your day be magical and full of love!
      </p>

      <button className="proposal-btn" onClick={() => setShowProposal(true)}>
        💍 Will You Always Be Mine?
      </button>

      {showProposal && (
        <div className="popup">
          {!accepted ? (
            <>
              <h2>Will You Always Be Mine? 💖</h2>
              <button
                className="yes-btn"
                onClick={() => {
                  setAccepted(true);
                  setShowGift(true);
                }}
              >
                YES 💕
              </button>
              <button className="no-btn" onMouseOver={moveNoButton}>
                No 😜
              </button>
            </>
          ) : (
            <>
              <h2 className="accepted">FOREVER YOURS 💍💖✨</h2>

              {showGift && !giftOpened && (
                <div
                  className="gift-box"
                  onClick={() => {
                    setGiftOpened(true);
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }}
                >
                  🎁
                </div>
              )}

              {giftOpened && (
                <>
                  <div className="gift-message">
                    💌 My biggest gift is YOU, PUNEET 💖  
                    I promise to love you forever 💍✨
                  </div>

                  <button
                    className="watch-btn"
                    onClick={() => {
                      setShowVideo(true);
                      setCinematicMode(true);
                    }}
                  >
                    🎥 Click For Special Video Message
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}

      {showVideo && (
        <div className="video-popup">
          <div className="video-container">
            <button
              className="close-video"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.pause();
                }
                setShowVideo(false);
                setCinematicMode(false);
              }}
            >
              ✖
            </button>

            <video
              ref={videoRef}
              src="video.mp4"
              controls
              autoPlay
              className="video-player"
            />
          </div>
        </div>
      )}

      {showBirthdayAnimation && (
        <div className="birthday-fullscreen">
          🎉 HAPPY BIRTHDAY PUNEET 🎉
        </div>
      )}

      {showConfetti && <Confetti />}
      {showFireworks && <Fireworks />}
    </div>
  );
}

/* 🎉 Confetti */
function Confetti() {
  useEffect(() => {
    const interval = setInterval(() => {
      const conf = document.createElement("div");
      conf.className = "confetti";
      conf.style.left = Math.random() * 100 + "vw";
      conf.style.animationDuration = Math.random() * 3 + 2 + "s";
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 5000);
    }, 200);
    return () => clearInterval(interval);
  }, []);
  return null;
}

/* 🎇 Fireworks */
function Fireworks() {
  useEffect(() => {
    const interval = setInterval(() => {
      const firework = document.createElement("div");
      firework.className = "firework";
      firework.style.left = Math.random() * 100 + "vw";
      firework.style.top = Math.random() * 50 + "vh";
      document.body.appendChild(firework);
      setTimeout(() => firework.remove(), 1200);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return null;
}