import AnimatedBackground from "./components/AnimatedBackground";
import HeroSection from "./components/HeroSection";
import EmailSection from "./components/EmailSection";
import "./app.css";

export default function App() {
  return (
    <>
      <AnimatedBackground />
      <div class="scroll-container">
        <HeroSection />
        <EmailSection />
      </div>
    </>
  );
}
