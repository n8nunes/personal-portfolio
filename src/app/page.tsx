import RedactionHero from "@/components/RedactionHero";
import SectionEditorial from "@/components/SectionEditorial";
import SectionAbout from "@/components/SectionAbout";
import SectionSystems from "@/components/SectionSystems";
import SectionExperience from "@/components/SectionExperience";
import SectionWriting from "@/components/SectionWriting";
import SectionRoadmap from "@/components/SectionRoadmap";
import SectionContact from "@/components/SectionContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <RedactionHero />
      <SectionEditorial />
      <SectionAbout />
      <SectionSystems />
      <SectionExperience />
      <SectionWriting />
      <SectionRoadmap />
      <SectionContact />
      <Footer />
    </main>
  );
}
