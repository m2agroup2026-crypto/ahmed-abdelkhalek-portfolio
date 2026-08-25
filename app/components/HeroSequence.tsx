"use client";

import { useEffect, useRef, useState } from "react";

const videos = [
  "/hero/system-init-fixed.mp4",
  "/hero/core-awakening-fixed.mp4",
  "/hero/system-connect-fixed.mp4",
  "/hero/architecture-fixed.mp4",
  "/hero/enterprise-fixed.mp4",
  "/hero/final-reveal-fixed.mp4",
];

export default function HeroSequence() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);
  const [finished, setFinished] = useState(false);
  const mainRef = useRef<HTMLVideoElement>(null);
  const leftRef = useRef<HTMLVideoElement>(null);
  const rightRef = useRef<HTMLVideoElement>(null);

  const nextVideo = () => {
    if (current >= videos.length - 1) {
      setFade(true);

      setTimeout(() => {
        setFinished(true);

        [mainRef,leftRef,rightRef].forEach((ref)=>{
          if(ref.current){
            ref.current.pause();
          }
        });

      }, 1200);

      return;
    }

    setFade(true);

    setTimeout(() => {
      setCurrent((prev) => prev + 1);
      setFade(false);
    }, 220);
  };

  useEffect(() => {
    const refs = [mainRef, leftRef, rightRef];

    refs.forEach((ref) => {
      const video = ref.current;
      if (!video) return;
      video.load();
      video.playbackRate = 3;
      video.play().catch(() => {});
    });
  }, [current]);

  return (
    <section className={`hero-sequence hero-sequence--final ${fade ? "is-fading" : ""} ${finished ? "finished" : ""}`}>
      <div className="hero-column hero-column--mirror hero-column--left">
        <video
          ref={leftRef}
          key={`left-${videos[current]}`}
          src={videos[current]}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>

      <div className="hero-column hero-column--main">
        <video
          ref={mainRef}
          key={`main-${videos[current]}`}
          src={videos[current]}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={nextVideo}
        />
      </div>

      <div className="hero-column hero-column--mirror hero-column--right">
        <video
          ref={rightRef}
          key={`right-${videos[current]}`}
          src={videos[current]}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>


      {finished && (
        
<div className="ahmed-reveal">
        <div className="reveal-nasa-layer" aria-hidden="true">
          <span className="nasa-dot nasa-dot-a" />
          <span className="nasa-dot nasa-dot-b" />
          <span className="nasa-dot nasa-dot-c" />
          <span className="nasa-dot nasa-dot-d" />
          <span className="nasa-dot nasa-dot-e" />

          <span className="nasa-line nasa-line-a" />
          <span className="nasa-line nasa-line-b" />
          <span className="nasa-line nasa-line-c" />
          <span className="nasa-line nasa-line-d" />

          <div className="nasa-panel nasa-panel-a">
            <small>DATA GRID</small>
            <strong>SYNCED</strong>
            <span />
          </div>

          <div className="nasa-panel nasa-panel-b">
            <small>NEURAL MAP</small>
            <strong>LIVE</strong>
            <span />
          </div>

          <div className="nasa-panel nasa-panel-c">
            <small>MISSION FLOW</small>
            <strong>ACTIVE</strong>
            <span />
          </div>

          <div className="nasa-orbit nasa-orbit-a" />
          <div className="nasa-orbit nasa-orbit-b" />
          <div className="nasa-scan" />
          <div className="nasa-grid" />
        </div>

          <div className="ahmed-reveal-photo">
            <img src="/ahmed-abdelkhalek.jpg" alt="Ahmed Abdelkhalek" />
          </div>

          <div className="ahmed-reveal-content">
            <p className="reveal-kicker">
              DIGITAL SYSTEMS ARCHITECT
            </p>

            <h1>
              أحمد عبد الخالق
            </h1>

            <h2>
              AI Systems & Digital Transformation Architect
            </h2>

            <p className="reveal-description">
              أبني أنظمة رقمية ذكية تجمع بين الذكاء الاصطناعي،
              الأتمتة وهندسة المنصات القابلة للتوسع.
            </p>

            <div className="reveal-systems">
              <div>
                <small>AI CORE</small>
                <strong>ONLINE 98%</strong>
              </div>

              <div>
                <small>AUTOMATION</small>
                <strong>ACTIVE</strong>
              </div>

              <div>
                <small>DIGITAL OS</small>
                <strong>READY</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
