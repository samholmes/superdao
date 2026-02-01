import { onMount, onCleanup } from "solid-js";
import { initWebGLBackground } from "./webgl-background";
import "./AnimatedBackground.css";

export default function AnimatedBackground() {
  let canvasRef!: HTMLCanvasElement;

  onMount(() => {
    const cleanup = initWebGLBackground(canvasRef);
    if (cleanup) {
      onCleanup(cleanup);
    }
  });

  return (
    <canvas ref={canvasRef} class="animated-background" />
  );
}
