"use client";

import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!cursorRef.current) return;
    const cursor = cursorRef.current;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
    });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });
    let started = false;
    function onMove(e: MouseEvent) {
      if (!started) {
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
        started = true;
        return;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    }
    function onLeave() {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    }

    function onEnter() {
      if (!started) return;
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
    }
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-99 pointer-events-none h-4 w-4 bg-white mix-blend-difference opacity-0"
      />
    </>
  );
}
