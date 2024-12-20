import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Welcome from "../components/Welcome";
import Chef from "../components/Chef";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import GMap from "../components/GMap";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <Hero />
        <Welcome />
        <Chef />
       <TestimonialsCarousel />
       <GMap />
      </div>
      <Footer / >
    </>
  );
};

export default Home;
