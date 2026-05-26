import React, { useState, useMemo } from 'react';
import { Camera, Image as ImageIcon, Filter, Search, X, Maximize2, Download, Share2, ChevronRight, LayoutGrid, Globe } from 'lucide-react';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', label: 'All Moments', icon: LayoutGrid },
    { id: 'campus', label: 'Campus Life', icon: Camera },
    { id: 'agriculture', label: 'Agriculture', icon: ImageIcon },
    { id: 'law', label: 'Legal Studies', icon: ImageIcon }
  ];

  const allImages = useMemo(() => {
    const images = [];
    for (let i = 1; i <= 45; i++) {
      images.push({
        id: `gen-${i}`,
        src: `photo-gallery/pic (${i}).jpg`,
        category: 'campus',
        title: `Campus View ${i}`,
        description: 'Vibrant moments at SBBSU Campus.'
      });
    }
    for (let i = 1; i <= 25; i++) {
      images.push({
        id: `agr-${i}`,
        src: `photo-gallery/photo_gallery_agr/Agr img${i}.jpg`,
        category: 'agriculture',
        title: `Agriculture Research ${i}`,
        description: 'Innovation in Agricultural Sciences at SBBSU.'
      });
    }
    for (let i = 1; i <= 15; i++) {
      images.push({
        id: `law-${i}`,
        src: `photo-gallery/photo_gallery_law/photo-gallery_law (${i}).jpeg`,
        category: 'law',
        title: `Legal Training ${i}`,
        description: 'Moot courts and legal seminars at SBBSU.'
      });
    }
    return images;
  }, []);

  const filteredImages = allImages.filter(img => {
    const matchesTab = activeTab === 'all' || img.category === activeTab;
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         img.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 selection:bg-accent/30 selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8 animate-float">
            <Camera className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Visual Journey</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
            Photo <span className="text-accent">Gallery</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Explore the vibrant life, cutting-edge facilities, and memorable events at Sant Baba Bhag Singh University through our digital lens.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 -mt-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Controls Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white/5 backdrop-blur-2xl border border-white/5 p-8 rounded-[3rem] shadow-2xl">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${
                    activeTab === cat.id 
                      ? 'bg-accent text-dark shadow-xl shadow-accent/20' 
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <cat.icon className={`w-4 h-4 ${activeTab === cat.id ? 'scale-110' : ''}`} />
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative group w-full max-w-sm">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-500 group-focus-within:text-accent transition-colors" />
              </div>
              <input 
                type="text"
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-accent/50 transition-all text-white font-medium text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-6">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
              Showing {filteredImages.length} Visual Assets
            </div>
            <div className="flex gap-1">
              <div className="w-8 h-1 bg-accent rounded-full"></div>
              <div className="w-4 h-1 bg-white/10 rounded-full"></div>
              <div className="w-2 h-1 bg-white/10 rounded-full"></div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((img) => (
              <div 
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden glass border-white/5 cursor-pointer transition-all duration-700 hover:scale-[1.02] hover:z-10 shadow-xl"
              >
                <img 
                  src={img.src} 
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08759df9a73?q=80&w=2070&auto=format&fit=crop';
                  }}
                />
                
                {/* Premium Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/20 backdrop-blur-md text-accent text-[9px] font-black uppercase tracking-widest border border-accent/20">
                      {img.category}
                    </span>
                    <h3 className="text-white font-black text-xl uppercase tracking-tighter leading-tight">{img.title}</h3>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-dark shadow-lg shadow-accent/20">
                        <Download className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="py-40 text-center space-y-8">
              <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/5 flex items-center justify-center mx-auto animate-pulse">
                <ImageIcon className="w-10 h-10 text-slate-700" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">No Results Found</h2>
                <p className="text-slate-500 font-medium">Try adjusting your filters or search keywords.</p>
              </div>
              <button 
                onClick={() => {setActiveTab('all'); setSearchQuery('');}}
                className="px-10 py-5 rounded-[2rem] bg-accent text-dark font-black uppercase tracking-widest text-xs hover:bg-white hover:scale-105 transition-all shadow-2xl"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 animate-[fade-in_0.3s_ease-out]">
          <div className="absolute inset-0 bg-dark/95 backdrop-blur-3xl" onClick={() => setSelectedImage(null)}></div>
          
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:rotate-90 transition-all z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-6xl w-full max-h-full flex flex-col md:flex-row gap-12 z-10 items-center">
            <div className="relative group overflow-hidden rounded-[3rem] border border-white/10 shadow-3xl bg-dark/50 lg:w-2/3">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                className="max-h-[80vh] w-full object-contain"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08759df9a73?q=80&w=2070&auto=format&fit=crop';
                }}
              />
            </div>

            <div className="space-y-8 max-w-md w-full px-4 text-center md:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                  {selectedImage.category}
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none uppercase">
                  {selectedImage.title}
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed font-medium">{selectedImage.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button className="flex-1 px-8 py-5 rounded-[2rem] bg-accent text-dark font-black text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 shadow-2xl">
                  <Download className="w-4 h-4" />
                  Save Image
                </button>
                <button className="w-full sm:w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="pt-12 border-t border-white/5">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Official Asset // SBBSU Digital Archive</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
