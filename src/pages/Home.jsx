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
    <div className="bg-slate-950 min-h-screen text-white w-full overflow-hidden flex flex-col pt-24">
      {/* Sections Wrapper - Horizontally & Vertically Centered */}
      <div className="grow flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center space-y-16 md:space-y-24">
          <HeroSection />
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
