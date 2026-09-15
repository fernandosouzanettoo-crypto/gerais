import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import HotColdSplit from "@/components/HotColdSplit";
import ExplodedView from "@/components/ExplodedView";
import PcmReveal from "@/components/PcmReveal";
import ModelsShowcase from "@/components/ModelsShowcase";
import BasicSection from "@/components/BasicSection";
import GoSection from "@/components/GoSection";
import ProSection from "@/components/ProSection";
import YouChooseSliders from "@/components/YouChooseSliders";
import ComparisonTable from "@/components/ComparisonTable";
import CustomizeSection from "@/components/CustomizeSection";
import ProductDetails from "@/components/ProductDetails";
import LifestyleSection from "@/components/LifestyleSection";
import NotJustLunchbox from "@/components/NotJustLunchbox";
import TechnologySection from "@/components/TechnologySection";
import ThermalFirewall from "@/components/ThermalFirewall";
import Waitlist from "@/components/Waitlist";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <HotColdSplit />
        <ExplodedView />
        <PcmReveal />
        <ModelsShowcase />
        <BasicSection />
        <GoSection />
        <ProSection />
        <YouChooseSliders />
        <ComparisonTable />
        <CustomizeSection />
        <ProductDetails />
        <LifestyleSection />
        <NotJustLunchbox />
        <TechnologySection />
        <ThermalFirewall />
        <Waitlist />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
