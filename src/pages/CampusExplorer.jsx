import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Star, Info, ChevronRight, Zap, Users, BookOpen, Trophy, Utensils, Dumbbell, Building2, Clock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { campusLocations } from '../data/locations';
import Campus3DMap from '../components/Campus3DMap';

const CampusExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleBuildingSelect = (buildingData) => {
    navigate(`/navigator?location=${buildingData.id}`);
  };

  const categories = [
    { id: 'All', label: 'All Locations', icon: MapPin },
    { id: 'Academic', label: 'Academic', icon: BookOpen },
    { id: 'Hostels', label: 'Hostels', icon: Building2 },
    { id: 'Sports', label: 'Sports', icon: Dumbbell },
    { id: 'Facilities', label: 'Facilities', icon: Utensils },
  ];

  const campusHighlights = [
    {
      title: 'World-Class Infrastructure',
      description: 'State-of-the-art facilities including modern labs, AR-enabled classrooms, and tech-integrated campus spaces',
      icon: Zap,
      color: 'from-accent to-cyan-400'
    },
    {
      title: '10,000+ Student Community',
      description: 'Diverse student body from across India creating a vibrant multicultural academic environment',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: '100% Placement Rate',
      description: 'Top companies recruiting our graduates with competitive packages and career growth opportunities',
      icon: Trophy,
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Holistic Education',
      description: 'Balance between academic excellence and spiritual wisdom for complete personality development',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500'
    },
  ];

  const locationDetails = {
    'entry-gate': { category: 'Administrative', visitors: '5K+', highlight: 'Main Entry Point' },
    'school-block': { category: 'Academic', visitors: '2K+', highlight: 'Classes & Lectures' },
    'block-5-uiet': { category: 'Academic', visitors: '1.5K+', highlight: 'Engineering Labs' },
    'library': { category: 'Academic', visitors: '3K+', highlight: '50K+ Books Collection' },
    'admission-cell': { category: 'Administrative', visitors: '500+', highlight: 'Admissions Hub' },
    'block-3': { category: 'Academic', visitors: '1K+', highlight: 'Classrooms' },
    'girls-hostel': { category: 'Hostels', visitors: '800+', highlight: 'Accommodation' },
    'boys-hostel': { category: 'Hostels', visitors: '1.2K+', highlight: 'Accommodation' },
    'stadium': { category: 'Sports', visitors: '2K+', highlight: 'Sports Complex' },
    'canteen-block-7': { category: 'Facilities', visitors: '1.5K+', highlight: 'Dining Hub' },
    'workshop-center': { category: 'Facilities', visitors: '500+', highlight: 'Workshops & Training' },
  };

  const filteredLocations = selectedCategory === 'All'
    ? campusLocations
    : campusLocations.filter(loc => locationDetails[loc.id]?.category.includes(selectedCategory));

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-xl mb-4">
            <MapPin className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-accent font-black tracking-[0.3em] uppercase text-[10px]">Virtual Campus Tour</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase text-white mb-4">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">SBBSU Campus</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover our world-class facilities, vibrant campus life, and exceptional learning environment
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-12 pb-6 border-b border-white/10 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Info },
            { id: 'locations', label: 'Locations', icon: MapPin },
            { id: 'highlights', label: 'Highlights', icon: Star },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-accent/20 text-accent border border-accent/50'
                  : 'text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* 3D Campus View */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <span className="w-10 h-10 bg-accent/20 border border-accent/50 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </span>
                  Interactive 3D Campus Tour
                </h2>
                <p className="text-slate-400 text-sm">Explore the campus in real-time - hover over buildings to highlight them, click to navigate</p>
              </div>
              <Campus3DMap onBuildingSelect={handleBuildingSelect} />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Area', value: '50+ Acres', icon: MapPin },
                { label: 'Locations', value: '11 Major', icon: Building2 },
                { label: 'Students', value: '10K+', icon: Users },
                { label: 'Daily Visitors', value: '5K+ Avg', icon: Clock },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent/50 hover:bg-accent/5 transition-all group cursor-pointer">
                  <stat.icon className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Campus Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campusHighlights.map((highlight, i) => {
                const IconComponent = highlight.icon;
                return (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-2xl border border-white/10 p-8 bg-gradient-to-br ${highlight.color} opacity-10 hover:opacity-20 transition-all group cursor-pointer`}
                  >
                    <div className="absolute inset-0 bg-dark/40 z-0"></div>
                    <div className="relative z-10">
                      <IconComponent className="w-12 h-12 text-white mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-black text-white mb-2 group-hover:text-accent transition-colors">{highlight.title}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">{highlight.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LOCATIONS TAB */}
        {activeTab === 'locations' && (
          <div className="space-y-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold uppercase tracking-wider transition-all text-sm ${
                      selectedCategory === cat.id
                        ? 'bg-accent text-dark'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Locations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map(location => {
                const details = locationDetails[location.id] || {};
                return (
                  <div
                    key={location.id}
                    onMouseEnter={() => setHoveredLocation(location.id)}
                    onMouseLeave={() => setHoveredLocation(null)}
                    className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent/50 hover:bg-white/10 transition-all cursor-pointer overflow-hidden"
                  >
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-black text-white group-hover:text-accent transition-colors">{location.name}</h3>
                          <p className="text-[10px] font-bold text-accent uppercase tracking-wider mt-1">{details.category || 'Location'}</p>
                        </div>
                        <MapPin className={`w-6 h-6 transition-all ${hoveredLocation === location.id ? 'text-accent scale-110' : 'text-slate-600'}`} />
                      </div>

                      <p className="text-sm text-slate-400 mb-4 line-clamp-2">{location.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          {details.highlight}
                        </div>
                        <div className="text-[11px] font-bold text-accent">{details.visitors} visitors/day</div>
                      </div>

                      <Link
                        to={`/navigator?location=${location.id}`}
                        className="mt-4 w-full py-2.5 bg-accent/10 border border-accent/30 text-accent font-bold uppercase tracking-wider rounded-lg hover:bg-accent hover:text-dark transition-all text-sm flex items-center justify-center gap-2 group/link"
                      >
                        Navigate Here
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* HIGHLIGHTS TAB */}
        {activeTab === 'highlights' && (
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-black text-white mb-6">Why Choose SBBSU?</h2>
                  <ul className="space-y-4">
                    {[
                      'NAAC A+ Accredited Institution',
                      '100% Placement Rate with Top MNCs',
                      'AR-Enabled Tech-Integrated Campus',
                      'Holistic Development Programs',
                      'World-Class Infrastructure',
                      'Industry-Relevant Curriculum',
                    ].map((point, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                        <Zap className="w-5 h-5 text-accent flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/admissions"
                    className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-cyan-500 text-dark font-black uppercase tracking-widest rounded-2xl hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.5)] hover:scale-105 transition-all"
                  >
                    Apply Now 2026
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '50+', label: 'Acres Campus' },
                    { value: 'NAAC A', label: 'Accreditation' },
                    { value: '100%', label: 'Placements' },
                    { value: '20+', label: 'Programs' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-accent/10 border border-accent/30 rounded-xl p-6 text-center hover:bg-accent/20 transition-all">
                      <div className="text-3xl font-black text-accent mb-2">{stat.value}</div>
                      <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-accent/10 to-cyan-500/10 border border-accent/20 rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-2xl font-black text-white mb-4">Ready to Explore More?</h3>
              <p className="text-slate-400 mb-6">Use our AR Navigator to explore campus locations in real-time with turn-by-turn directions</p>
              <Link
                to="/navigator"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-black uppercase tracking-widest rounded-2xl hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.5)] hover:scale-105 transition-all"
              >
                <Navigation className="w-5 h-5" />
                Launch AR Navigator
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusExplorer;
