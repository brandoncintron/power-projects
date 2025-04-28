import { auth } from "@/auth";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";

export default async function Home() {
const session = await auth();

  return (
    <main>
      <div className=" dark:bg-[#161722]">
        <Hero session={session} />
        <div id="features">
          <Features />
        </div>
        <div id="about">
          <About session={session}/>
        </div>
      </div>
    </main>
  );
}
