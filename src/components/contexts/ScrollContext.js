"use client";
import Lenis from "lenis";
import { createContext, useContext, useState, useEffect } from "react";

export const ScrollContext = createContext();

export function useScroll() {
  return useContext(ScrollContext);
}

export default function SmoothScroll({ children }) {
  const [lenisRef, setLenis] = useState(null); // Initialize as null
  const [rafState, setRaf] = useState();

  useEffect(() => {
    const scroller = new Lenis();
    let rf;

    function raf(time) {
      scroller.raf(time);
      rf = requestAnimationFrame(raf);
    }
    rf = requestAnimationFrame(raf);
    setRaf(rf);
    setLenis(scroller);

    return () => {
      if (rf) cancelAnimationFrame(rf);
      if (lenisRef) lenisRef.destroy(); // Safely check if lenisRef is set
    };
  }, [lenisRef]); // Add lenisRef as a dependency

  return (
    <ScrollContext.Provider value={lenisRef}>{children}</ScrollContext.Provider>
  );
}
