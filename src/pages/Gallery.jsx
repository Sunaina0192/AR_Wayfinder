import React, { useState, useMemo } from 'react';
import { Camera, Image as ImageIcon, Filter, Search, X, Maximize2, Download, Share2, ChevronRight, LayoutGrid } from 'lucide-react';

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

  // Generate image data based on the provided HTML structure
  const allImages = useMemo(() => {
    const images = [];

    // General Images (1-45)
    for (let i = 1; i <= 45; i++) {
      images.push({
        id: `gen-${i}`,
        src: `photo-gallery/pic (${i}).jpg`,
        category: 'campus',
        title: `Campus View ${i}`,
        description: 'Vibrant moments at SBBSU Campus.'
      });
    }

    // Agriculture Images (1-25)
    for (let i = 1; i <= 25; i++) {
      images.push({
        id: `agr-${i}`,
        src: `photo-gallery/photo_gallery_agr/Agr img${i}.jpg`,
        category: 'agriculture',
        title: `Agriculture Research ${i}`,
        description: 'Innovation in Agricultural Sciences at SBBSU.'
      });
    }

    // Law Images (1-15)
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
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full pt-24 pb-20 flex-grow flex flex-col items-center justify-center relative z-10 animate-[fade-in_0.8s_ease-out]">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl w-full px-4 relative z-10 flex flex-col items-center text-center">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center gap-8 mb-16 animate-[fade-in_0.8s_ease-out] w-full">
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mx-auto">
              <Camera className="w-3 h-3" />
              Visual Journey
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              PHOTO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent">GALLERY</span>
            </h1>
            <p className="text-slate-400 font-medium">
              Explore the vibrant life, cutting-edge facilities, and memorable events at Sant Baba Bhag Singh University.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative group w-full max-w-md mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-500 group-focus-within:text-accent transition-colors" />
            </div>
            <input 
              type="text"
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all text-white font-medium text-center"
            />
          </div>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-[fade-in_1s_ease-out] w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 border ${
                activeTab === cat.id 
                  ? 'bg-accent text-slate-950 border-accent shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
                  : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full text-xs font-bold text-slate-500 uppercase tracking-widest mb-12 border-t border-slate-800/50 pt-8 text-center">
          Showing {filteredImages.length} Artifacts
        </div>

        {/* Image Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center animate-[fade-in_1s_ease-out]">
          {filteredImages.map((img) => (
            <div 
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="group relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer shadow-xl hover:shadow-accent/5 transition-all duration-500"
            >
              <img 
                src={img.src} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08759df9a73?q=80&w=2070&auto=format&fit=crop';
                  e.target.className = 'w-full h-full object-cover opacity-50 grayscale';
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-accent/20 text-accent text-[10px] font-black uppercase tracking-widest border border-accent/20">
                    {img.category}
                  </span>
                  <h3 className="text-white font-black text-lg leading-tight uppercase tracking-tight">{img.title}</h3>
                  <div className="flex items-center justify-between pt-2">
                    <button className="text-accent hover:text-white transition-colors">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <div className="flex gap-3">
                      <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-slate-950 transition-all">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="py-32 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto">
              <X className="w-8 h-8 text-slate-700" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">No visuals found</h2>
              <p className="text-slate-500 font-medium">Try adjusting your filters or search query.</p>
            </div>
            <button 
              onClick={() => {setActiveTab('all'); setSearchQuery('');}}
              className="px-6 py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-[fade-in_0.3s_ease-out]">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={() => setSelectedImage(null)}></div>
          
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full max-h-full flex flex-col items-center gap-8 z-10">
            <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08759df9a73?q=80&w=2070&auto=format&fit=crop';
                }}
              />
            </div>

            <div className="text-center space-y-3 max-w-2xl px-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mx-auto">
                {selectedImage.category}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none uppercase">
                {selectedImage.title}
              </h2>
              <p className="text-slate-400 font-medium">{selectedImage.description}</p>
              
              <div className="flex items-center justify-center gap-4 pt-6">
                <button className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-black text-xs uppercase tracking-widest hover:bg-accent transition-all flex items-center gap-3">
                  <Download className="w-4 h-4" />
                  Download Asset
                </button>
                <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
      </div>
    </div>
  );
};

export default Gallery;
