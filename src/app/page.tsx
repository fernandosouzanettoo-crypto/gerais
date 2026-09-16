import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import ModelSelector from "@/components/ModelSelector";
import Differentials from "@/components/Differentials";
import UsageContext from "@/components/UsageContext";
import Waitlist from "@/components/Waitlist";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <ModelSelector />
        <Differentials />
        <UsageContext />
        <Waitlist />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
