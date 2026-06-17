import React, { useState, useMemo } from 'react';
import { Camera, Image as ImageIcon, Filter, Search, X, Maximize2, Download, Share2, ChevronRight, LayoutGrid, Globe } from 'lucide-react';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [shareToast, setShareToast] = useState('');

  const categories = [
    { id: 'all', label: 'All Moments', icon: LayoutGrid },
    { id: 'campus', label: 'Campus Life', icon: Camera },
    { id: 'agriculture', label: 'Agriculture', icon: ImageIcon },
    { id: 'law', label: 'Legal Studies', icon: ImageIcon }
  ];

  const allImages = useMemo(() => {
    return [
      // Campus Life (12 images)
      {
        id: 'campus-1',
        src: '/sbbsu_admin_block.png',
        category: 'campus',
        title: 'SBBSU Main Administration Block',
        description: 'The iconic central building housing administrative and academic offices.'
      },
      {
        id: 'campus-2',
        src: '/sbbsu_convocation.png',
        category: 'campus',
        title: 'Annual Convocation Ceremony',
        description: 'Celebrating the achievements and graduation of our bright students.'
      },
      {
        id: 'campus-3',
        src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
        category: 'campus',
        title: 'Engineering Block & Labs',
        description: 'State-of-the-art laboratory facility for hands-on technical education.'
      },
      {
        id: 'campus-4',
        src: '/sbbsu_library.png',
        category: 'campus',
        title: 'Central Library Resource Center',
        description: 'Vast collection of reference books, journals, and digital study areas.'
      },
      {
        id: 'campus-5',
        src: 'https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&w=800&q=80',
        category: 'campus',
        title: 'Campus Lawn & Recreation',
        description: 'Students collaborating and relaxing in the green, eco-friendly campus lawns.'
      },
      {
        id: 'campus-6',
        src: 'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=800&q=80',
        category: 'campus',
        title: 'Student Plaza Interaction',
        description: 'A vibrant community space encouraging intellectual and social exchange.'
      },
      {
        id: 'campus-7',
        src: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
        category: 'campus',
        title: 'Smart Classroom & Seminars',
        description: 'Equipped with interactive smartboards for technology-enhanced learning.'
      },
      {
        id: 'campus-8',
        src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
        category: 'campus',
        title: 'Group Workshop Session',
        description: 'Interdisciplinary teamwork on innovative project prototyping.'
      },
      {
        id: 'campus-9',
        src: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80',
        category: 'campus',
        title: 'Academic Block Greenery',
        description: 'Serene landscape surrounding the central academic infrastructure.'
      },
      {
        id: 'campus-10',
        src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        category: 'campus',
        title: 'Research Study Desk',
        description: 'Quiet learning spaces inside the campus library for student research.'
      },
      {
        id: 'campus-11',
        src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
        category: 'campus',
        title: 'Student Discussion Circle',
        description: 'Active peer discussions and student collaboration in-between lectures.'
      },
      {
        id: 'campus-12',
        src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
        category: 'campus',
        title: 'Interactive Guest Seminar',
        description: 'Industry experts sharing insight and professional advice with students.'
      },

      // Agriculture (12 images)
      {
        id: 'agr-1',
        src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
        category: 'agriculture',
        title: 'Greenhouse Plant Breeding',
        description: 'Controlled environment agriculture research on hybrid seed varieties.'
      },
      {
        id: 'agr-2',
        src: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
        category: 'agriculture',
        title: 'Experimental Crops Field',
        description: 'Open field trials of organic pest management and high-yield farming.'
      },
      {
        id: 'agr-3',
        src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        category: 'agriculture',
        title: 'Soil Science Laboratory',
        description: 'Analyzing nutrient profiles and soil health to optimize crop rotation.'
      },
      {
        id: 'agr-4',
        src: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
        category: 'agriculture',
        title: 'Plant Pathology Analysis',
        description: 'Diagnosing agricultural diseases and designing biological countermeasures.'
      },
      {
        id: 'agr-5',
        src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
        category: 'agriculture',
        title: 'Sustainable Agroforestry',
        description: 'Integrating crops and forestry models to prevent soil erosion.'
      },
      {
        id: 'agr-6',
        src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
        category: 'agriculture',
        title: 'Smart Farming Mechanization',
        description: 'Demonstrations of modern equipment and precision machinery.'
      },
      {
        id: 'agr-7',
        src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
        category: 'agriculture',
        title: 'Horticulture & Herb Culture',
        description: 'Cultivation and nursery management studies for medicinal herbs.'
      },
      {
        id: 'agr-8',
        src: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80',
        category: 'agriculture',
        title: 'Crop Inspection Research',
        description: 'On-site study of plant leaf structures and photosynthesis metrics.'
      },
      {
        id: 'agr-9',
        src: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80',
        category: 'agriculture',
        title: 'Germination Field Trials',
        description: 'Observing the earliest stages of crop growth under varying climates.'
      },
      {
        id: 'agr-10',
        src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
        category: 'agriculture',
        title: 'Drip Irrigation Infrastructure',
        description: 'Smart watering networks saving up to 60% water in dry climates.'
      },
      {
        id: 'agr-11',
        src: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
        category: 'agriculture',
        title: 'Agricultural Biotechnology',
        description: 'Genetic studies in plant cell lines to promote drought tolerance.'
      },
      {
        id: 'agr-12',
        src: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=800&q=80',
        category: 'agriculture',
        title: 'Hydroponics & Aquaponics',
        description: 'Soil-less cultivation techniques designed for vertical farming layouts.'
      },

      // Law (12 images)
      {
        id: 'law-1',
        src: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
        category: 'law',
        title: 'Moot Court Hall',
        description: 'Simulating courtroom trials to develop litigation and advocacy skills.'
      },
      {
        id: 'law-2',
        src: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=800&q=80',
        category: 'law',
        title: 'Legal Aid & Library',
        description: 'Accessing law reports, case studies, and preparing legal briefs.'
      },
      {
        id: 'law-3',
        src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
        category: 'law',
        title: 'Constitutional Law Seminar',
        description: 'Panel discussion by legal scholars on recent judicial judgments.'
      },
      {
        id: 'law-4',
        src: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=800&q=80',
        category: 'law',
        title: 'Client Counseling Workshop',
        description: 'Practical training on client interviewing and legal consulting ethics.'
      },
      {
        id: 'law-5',
        src: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=800&q=80',
        category: 'law',
        title: 'Judicial Services Training',
        description: 'Focused preparation sessions for civil judge and judicial exams.'
      },
      {
        id: 'law-6',
        src: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        category: 'law',
        title: 'Legal Advice Mock Session',
        description: 'Simulated client consultations under faculty guidance.'
      },
      {
        id: 'law-7',
        src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
        category: 'law',
        title: 'Case File Examination',
        description: 'Students reviewing legal records and historical courtroom precedents.'
      },
      {
        id: 'law-8',
        src: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
        category: 'law',
        title: 'Corporate Law Library',
        description: 'Reference textbooks and treaties covering company law and mergers.'
      },
      {
        id: 'law-9',
        src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        category: 'law',
        title: 'Legal Research Complex',
        description: 'A study wing dedicated to research in criminal and civil jurisprudence.'
      },
      {
        id: 'law-10',
        src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
        category: 'law',
        title: 'Legal Advocacy Seminar Room',
        description: 'Host room for debate rounds, law student meetings, and mock trials.'
      },
      {
        id: 'law-11',
        src: '/contract_drafting_lab.png',
        category: 'law',
        title: 'Contract Drafting Lab',
        description: 'Hands-on practice drafting legal contracts and partnership agreements.'
      },
      {
        id: 'law-12',
        src: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
        category: 'law',
        title: 'Gavel & Courtroom Gavel',
        description: 'A symbol of courtroom authority and legal decision-making.'
      }
    ];
  }, []);

  const filteredImages = allImages.filter(img => {
    const matchesTab = activeTab === 'all' || img.category === activeTab;
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         img.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleDownload = async (e, img) => {
    e.stopPropagation();
    try {
      const response = await fetch(img.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${img.title.replace(/\s+/g, '_').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback: open in new tab
      window.open(img.src, '_blank');
    }
  };

  const handleShare = async (img) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: img.title,
          text: img.description,
          url: img.src.startsWith('http') ? img.src : window.location.origin + img.src,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copy to clipboard
      const url = img.src.startsWith('http') ? img.src : window.location.origin + img.src;
      navigator.clipboard.writeText(url);
      setShareToast('Link copied to clipboard!');
      setTimeout(() => setShareToast(''), 3000);
    }
  };

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

      {/* Share Toast */}
      {shareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-accent text-dark font-black px-6 py-3 rounded-full shadow-2xl animate-[fade-in_0.3s_ease-out]">
          {shareToast}
        </div>
      )}

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
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/20 transition-all">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                      <button 
                        onClick={(e) => handleDownload(e, img)}
                        className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-dark shadow-lg shadow-accent/20 hover:scale-110 transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </button>
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
                <button 
                  onClick={(e) => handleDownload(e, selectedImage)}
                  className="flex-1 px-8 py-5 rounded-[2rem] bg-accent text-dark font-black text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 shadow-2xl cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Save Image
                </button>
                <button 
                  onClick={() => handleShare(selectedImage)}
                  className="w-full sm:w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer"
                >
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
