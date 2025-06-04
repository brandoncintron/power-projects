import { auth } from "@/auth";

import About from "../components/About";
import Features from "../components/Features";
import Hero from "../components/Hero";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <div>
        <Hero session={session} />
        <div id="features">
          <Features />
        </div>
        <div id="about">
          <About session={session} />
        </div>
      </div>
    </main>
  );
}
