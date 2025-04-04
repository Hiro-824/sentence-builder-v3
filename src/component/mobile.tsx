"use client"

import { useEffect, useRef } from "react";
import { MobileRenderer } from "../lib/mobile";

const MobileTester = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const renderer = new MobileRenderer(canvas);

        return () => {
            renderer.destroy();
        };
    }, []);

    return <canvas ref={canvasRef} width={500} height={500} />;
}

export default MobileTester;