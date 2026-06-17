import React from 'react';

// Import all sections
import HeroSection from '../components/home/HeroSection';
import VisionSection from '../components/home/VisionSection';
import EventsSection from '../components/home/EventsSection';
import LeadershipSection from '../components/home/LeadershipSection';
import ViceChancellorSection from '../components/home/ViceChancellorSection';
import NewsSection from '../components/home/NewsSection';
import StatsSection from '../components/home/StatsSection';
import TestimonialSection from '../components/home/TestimonialSection';
import RecruitersSection from '../components/home/RecruitersSection';


const Home = () => {
  return (
    <div className="bg-dark min-h-screen text-white w-full overflow-hidden flex flex-col pb-12 md:pb-20">
      {/* Hero Section - Full Width */}
      <HeroSection />

      {/* Sections Wrapper - Horizontally & Vertically Centered */}
      <div className="grow flex flex-col items-center justify-center mt-16 md:mt-24">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center space-y-16 md:space-y-24 px-4 sm:px-6 lg:px-8">
          <VisionSection />
          <EventsSection />
          <LeadershipSection />
          <ViceChancellorSection />
          <NewsSection />
          <StatsSection />
          <TestimonialSection />
          <RecruitersSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
