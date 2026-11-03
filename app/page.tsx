import { Contact, Experience, Footer, gradients, Header, Hero, Specs, Stats } from "@/components/Sections";
import { Showcase } from "@/components/Showcase";
import { projects } from "@/content/profile";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        {projects.map((p, i) => <Showcase key={p.slug} project={p} index={i} gradient={gradients[p.slug]} />)}
        <Experience />
        <Specs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
