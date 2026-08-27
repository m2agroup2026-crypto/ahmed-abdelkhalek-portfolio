"use client";

import { useEffect, useRef, useState } from "react";

const cinematicVideo = "/hero/final-reveal-fixed.mp4";

type HeroSequenceProps = {
  ar: boolean;
  active?: boolean;
  skipSequence?: boolean;
  onReveal?: () => void;
};

export default function HeroSequence({
  ar,
  active = true,
  skipSequence = false,
  onReveal,
}: HeroSequenceProps) {
  const [fade, setFade] = useState(false);
  const [finished, setFinished] = useState(skipSequence);
  const mainRef = useRef<HTMLVideoElement>(null);
  const finishTimerRef = useRef<number | null>(null);

  const finishSequence = () => {
    if (finished || finishTimerRef.current !== null) return;

    setFade(true);

    finishTimerRef.current = window.setTimeout(() => {
      setFinished(true);
      mainRef.current?.pause();
      onReveal?.();
      finishTimerRef.current = null;
    }, 650);
  };

  useEffect(() => {
    if (!skipSequence) return;

    mainRef.current?.pause();
    setFade(false);
    setFinished(true);
    onReveal?.();
  }, [skipSequence, onReveal]);

  useEffect(() => {
    const video = mainRef.current;
    if (!video || skipSequence || finished) return;

    video.load();
    video.playbackRate = 2;

    if (active) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, skipSequence, finished]);

  useEffect(() => {
    return () => {
      if (finishTimerRef.current !== null) {
        window.clearTimeout(finishTimerRef.current);
      }
    };
  }, []);

  return (
    <section className={`hero-sequence hero-sequence--final hero-sequence--cinematic-bridge ${fade ? "is-fading" : ""} ${finished ? "finished" : ""}`}>
      <div className="hero-column hero-column--main">
        <video
          ref={mainRef}
          key={cinematicVideo}
          src={cinematicVideo}
          muted
          playsInline
          preload="auto"
          onEnded={finishSequence}
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
            <img src="/ahmed-abdelkhalek-v2.jpg" alt="Ahmed Abdelkhalek" />
          </div>

          <div className="ahmed-reveal-content">
            <p className="reveal-kicker">
              DIGITAL SYSTEMS ARCHITECT
            </p>

            <h1>{ar ? "أحمد عبد الخالق" : "Ahmed Abdelkhalek"}</h1>

            <h2>
              {ar
                ? "مهندس أنظمة الذكاء الاصطناعي والتحول الرقمي"
                : "AI Systems & Digital Transformation Architect"}
            </h2>

            <p className="reveal-description">
              {ar ? (
                <>
                  أبني أنظمة رقمية ذكية تجمع بين الذكاء الاصطناعي،
                  <br className="desktop-description-break" />
                  الأتمتة وهندسة المنصات القابلة للتوسع.
                </>
              ) : (
                "I build intelligent digital systems that combine AI, automation, and scalable platform engineering."
              )}
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

          <div className="mobile-m2a-core-block">
            <div className="mobile-m2a-stage">
              <div className="mobile-m2a-visual-shell mobile-shell-one" />
              <div className="mobile-m2a-visual-shell mobile-shell-two" />
              <div className="mobile-m2a-visual-shell mobile-shell-three" />

              <div className="mobile-m2a-neural-ring mobile-ring-one" />
              <div className="mobile-m2a-neural-ring mobile-ring-two" />

              <div className="mobile-neural-core">
                <img src="/m2a-logo.png" alt="M2A Group" />
                <span />
              </div>

              <div className="mobile-neural-node mobile-node-1">
                <i />
                <span>AI AGENTS</span>
              </div>

              <div className="mobile-neural-node mobile-node-2">
                <i />
                <span>DATA</span>
              </div>

              <div className="mobile-neural-node mobile-node-3">
                <i />
                <span>AUTOMATION</span>
              </div>

              <div className="mobile-neural-node mobile-node-4">
                <i />
                <span>DIGITAL TWINS</span>
              </div>

              <div className="mobile-neural-node mobile-node-5">
                <i />
                <span>ENTERPRISE OS</span>
              </div>

              <div className="mobile-neural-node mobile-node-6">
                <i />
                <span>APPS</span>
              </div>
            </div>

            <div className="mobile-visual-caption">
                <small>M2A DIGITAL OPERATING SYSTEM / ONLINE</small>
                <strong>COGNITIVE CORE</strong>
              </div>



          </div>

        </div>
      )}
    </section>
  );
}
