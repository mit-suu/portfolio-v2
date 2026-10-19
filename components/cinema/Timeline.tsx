"use client";

import { useEffect, useRef, useState } from "react";
import { scenes } from "@/constants/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { useCinema } from "./CinemaProvider";

type Marker = { id: string; number: string; label: string; start: number };

const FPS = 24;
const PX_PER_FRAME = 3;

function toShortTimecode(px: number) {
  const totalSeconds = Math.floor(px / PX_PER_FRAME / FPS);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Where a scene really starts in the document, even while it is pinned. */
function sceneTop(el: HTMLElement) {
  const host = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
  return host.getBoundingClientRect().top + window.scrollY;
}

/**
 * A video-player style scrubber laid along the bottom letterbox: one tick per scene,
 * hover preview with scene + timecode, click to seek, drag to scrub.
 */
export function Timeline() {
  const { getLenis, scrollTo } = useCinema();
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [maxScroll, setMaxScroll] = useState(1);
  const [hover, setHover] = useState<{ x: number; fraction: number; width: number } | null>(null);
  const [progress, setProgress] = useState(0);
  const dragging = useRef(false);

  // Measure scene positions whenever ScrollTrigger re-lays out the page.
  useEffect(() => {
    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setMaxScroll(max);
      setMarkers(
        scenes.flatMap((scene) => {
          const el = document.getElementById(scene.id);
          return el ? [{ ...scene, start: Math.min(1, sceneTop(el) / max) }] : [];
        }),
      );
    };
    measure();
    ScrollTrigger.addEventListener("refresh", measure);
    window.addEventListener("load", measure);
    return () => {
      ScrollTrigger.removeEventListener("refresh", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  // Progress fill follows the scroll without React re-rendering every frame.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;
      setProgress(Math.round(p * 100));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const fractionAt = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    const x = Math.min(rect.width, Math.max(0, clientX - rect.left));
    return { x, fraction: x / rect.width, width: rect.width };
  };

  const seek = (fraction: number, scrubbing: boolean) => {
    const y = fraction * maxScroll;
    const lenis = getLenis();
    if (scrubbing && lenis) lenis.scrollTo(y, { lerp: 0.3 });
    else scrollTo(y);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = fractionAt(event.clientX);
    setHover(point);
    seek(point.fraction, false);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const point = fractionAt(event.clientX);
    setHover(point);
    if (dragging.current) seek(point.fraction, true);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (event.pointerType !== "mouse") setHover(null);
  };

  const sceneAt = (fraction: number) =>
    markers.reduce<Marker | undefined>((found, marker) => (marker.start <= fraction + 0.0005 ? marker : found), markers[0]);

  const hovered = hover ? sceneAt(hover.fraction) : undefined;

  return (
    <div
      ref={trackRef}
      className="timeline"
      data-active={hover ? "true" : undefined}
      role="slider"
      tabIndex={0}
      aria-label="Film timeline: seek through the portfolio"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-valuetext={`${progress}%`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={() => !dragging.current && setHover(null)}
    >
      <div className="timeline__track">
        <span className="timeline__buffer" />
        <span ref={fillRef} className="timeline__fill" />
        {markers.map((marker) => (
          <span key={marker.id} className="timeline__tick" style={{ left: `${marker.start * 100}%` }} />
        ))}
        {hover ? <span className="timeline__ghost" style={{ width: hover.x }} /> : null}
      </div>

      {hover && hovered ? (
        <div
          className="timeline__tooltip"
          // Keep the preview inside the frame near either edge.
          style={{ left: Math.min(Math.max(hover.x, 120), hover.width - 120) }}
          aria-hidden="true"
        >
          <span className="timeline__tooltip-scene">Scene {hovered.number}</span>
          <span className="timeline__tooltip-label">{hovered.label}</span>
          <span className="timeline__tooltip-time">{toShortTimecode(hover.fraction * maxScroll)}</span>
        </div>
      ) : null}
    </div>
  );
}
