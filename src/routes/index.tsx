import AnimatedBackground from "~/components/AnimatedBackground";
import HeroSection from "~/components/HeroSection";
import EmailSection from "~/components/EmailSection";

export default function HomePage() {
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
