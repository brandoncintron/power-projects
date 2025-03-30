import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";

export default function Home() {
  return (
    <main>
      <div>
        <Hero />
        <div id="features">
          <Features />
        </div>
        <div id="about">
          <About />
        </div>
      </div>
    </main>
  );
}
