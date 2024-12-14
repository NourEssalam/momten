import AboutNutshell from "@/components/home/AboutNutshell";
import Hero from "@/components/home/Hero";
import Partner from "@/components/home/Partner";
import SignUp from "@/components/home/SignUp";

export default function Home() {
  return (
    <>
      <Hero />
      <Partner />
      <AboutNutshell />

      {/* <EventUpcoming /> */}
      <SignUp />
    </>
  );
}
