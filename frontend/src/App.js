import React from "react";
import Header from "./components/Header";
import Intro from "./components/Intro";
import PhotoGallery from "./components/PhotoGallery";
import VideoSection from "./components/VideoSection";
import Album from "./components/Album";
import GoToBtn from "./components/GoToBtn";
import Reviews from "./components/Reviews";
import Hexagons from "./components/Hexagons";
import ContactForm from "./components/ContactForm";

export default function App() {
  return (
    <div data-testid="app-root">
      <Header />
      <Intro />
      <PhotoGallery />
      <VideoSection />
      <Album />
      <GoToBtn />
      <Reviews />
      <Hexagons />
      <ContactForm />
    </div>
  );
}
