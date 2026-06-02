import React, { useEffect, useState } from 'react';
import { campusLocations, findShortestPath, generateDirections } from '../data/locations';
import { MapPin, ArrowRight, Navigation, AlertCircle, Star, History, Moon, Sun, Filter } from 'lucide-react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchHistory, saveHistoryItem } from '../api/historyApi';
import ARNavigator from '../components/ARNavigator';
import MapView from '../components/MapView';
import LocationSearch from '../components/LocationSearch';
import RouteSummary from '../components/RouteSummary';
import NavigationHistory from '../components/NavigationHistory';
import FeatureHighlights from '../components/FeatureHighlights';
import PathDisplay from '../components/PathDisplay';
const Navigator = () => {
  const { user } = useAuth();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activePath, setActivePath] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAR, setShowAR] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [historyError, setHistoryError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const routerLocation = useLocation();

  const categories = ['All', 'Administrative', 'Blocks', 'Library', 'Hostels', 'Sports', 'Cafeteria', 'Labs', 'Parking'];

  useEffect(() => {
    if (!user) return;

    const loadHistory = async () => {
      try {
        setHistoryError(null);
        const items = await fetchHistory(user.id);
        setNavigationHistory(items);
      } catch (error) {
        console.error('Unable to load history', error);
        setHistoryError('Could not load history. Backend may be offline.');
      }
    };

    const savedFavorites = JSON.parse(localStorage.getItem(`navigator_favorites_${user.id}`) || '[]');
    setFavorites(savedFavorites);

    const savedDarkMode = localStorage.getItem('navigator_dark_mode') === 'true';
    setIsDarkMode(savedDarkMode);

    loadHistory();
  }, [user]);

  useEffect(() => {
    if (routerLocation.state?.destination) {
      handleLocationSelect(routerLocation.state.destination);
    }
  }, [routerLocation.state?.destination]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const toggleFavorite = (id) => {
    if (!user) return;
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem(`navigator_favorites_${user.id}`, JSON.stringify(newFavorites));
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('navigator_dark_mode', newMode.toString());
  };

  const saveHistory = async (id) => {
    if (!user) return;
    const destination = campusLocations.find((loc) => loc.id === id);
    if (!destination) return;

    try {
      const updatedHistory = await saveHistoryItem({
        destinationId: id,
        name: destination.name,
        userId: user.id,
      });
      setNavigationHistory(updatedHistory);
      setHistoryError(null);
    } catch (error) {
      console.error('Unable to save history item', error);
      setHistoryError('Could not save route. Backend may be offline.');
    }
  };

  const handleLocationSelect = (id, autoAR = false) => {
    const normalizedId = campusLocations.find((loc) => loc.id === id)?.id || id;
    const path = findShortestPath('entry-gate', normalizedId);
    setSelectedLocation(normalizedId);
    setActivePath(path || []);
    saveHistory(normalizedId);
    if (autoAR) {
      setShowAR(true);
    }
  };

  const filteredLocations = campusLocations.filter(
    (loc) => {
      const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || loc.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }
  );

  const directions = generateDirections(activePath);
  const distance = activePath.length > 1 ? Math.round((activePath.length - 1) * 50) : 0;

  if (showAR && selectedLocation) {
    return <ARNavigator destination={selectedLocation} onExit={() => setShowAR(false)} />;
  }

  return (
    <div className={`w-full min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#0a0f1e] text-white' : 'bg-linear-to-br from-blue-50 to-indigo-100 text-slate-900'} flex justify-center px-4 sm:px-6 lg:px-8`}>
      {historyError && (
        <div className="fixed top-24 right-4 z-50 max-w-md rounded-2xl bg-yellow-500/10 backdrop-blur-xl border border-yellow-500/20 p-4 flex items-start gap-3 shadow-2xl">
          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-yellow-500">{historyError}</p>
            <p className="text-[10px] text-yellow-500/60 mt-1 uppercase tracking-widest">Backend server required for history tracking</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl w-full mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div className="text-left">
            <h1 className={`text-5xl font-black mb-2 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              🗺️ Navigator
            </h1>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-lg`}>Intelligent AR Campus Wayfinding</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`p-4 rounded-2xl transition-all duration-300 ${isDarkMode ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-slate-900/5 text-slate-600 hover:bg-slate-900/10'}`}
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>

        {/* Category Filter Strip */}
        <div className="mb-10 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : isDarkMode ? 'bg-white/5 text-slate-400 hover:bg-white/10' : 'bg-white text-slate-600 hover:bg-blue-50 shadow-sm'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <LocationSearch
              query={searchQuery}
              onChange={setSearchQuery}
              results={filteredLocations}
              onSelect={(id) => handleLocationSelect(id, true)}
              isDarkMode={isDarkMode}
            />
            <div className={`rounded-3xl overflow-hidden shadow-2xl border ${isDarkMode ? 'border-white/10' : 'border-white'} h-[400px]`}>
              <MapView
                selectedLocation={selectedLocation}
                activePath={activePath}
                onLocationSelect={(id) => handleLocationSelect(id)}
              />
            </div>
            <PathDisplay directions={directions} isDarkMode={isDarkMode} />
          </div>

          <div className="space-y-8">
            <RouteSummary
              selectedLocation={selectedLocation}
              distance={distance}
              stepCount={directions.length}
              isDarkMode={isDarkMode}
            />

            {/* Quick Access Section */}
            <div className={`p-8 rounded-[2.5rem] ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-white/50 shadow-xl'}`}>
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <h3 className="text-xl font-black">Favorites</h3>
              </div>
              <div className="space-y-3">
                {favorites.length > 0 ? (
                  favorites.map(id => {
                    const loc = campusLocations.find(l => l.id === id);
                    return loc ? (
                      <button
                        key={id}
                        onClick={() => handleLocationSelect(id, true)}
                        className={`w-full p-4 rounded-2xl flex items-center justify-between group transition-all ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-blue-50'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{loc.icon}</span>
                          <span className="font-bold">{loc.name}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </button>
                    ) : null;
                  })
                ) : (
                  <p className="text-sm text-slate-500 italic">No favorites yet</p>
                )}
              </div>
            </div>

            <NavigationHistory history={navigationHistory} onSelect={(id) => handleLocationSelect(id, true)} isDarkMode={isDarkMode} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <div
                key={location.id}
                className={`group relative rounded-[2.5rem] overflow-hidden transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border ${selectedLocation === location.id
                  ? 'border-blue-500 ring-4 ring-blue-500/20'
                  : isDarkMode ? 'border-white/10 bg-white/5' : 'border-white bg-white shadow-xl shadow-slate-200/50'
                  }`}
                onClick={() => handleLocationSelect(location.id, true)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(location.id);
                  }}
                  className={`absolute top-6 right-6 z-10 p-3 rounded-2xl backdrop-blur-md transition-all ${favorites.includes(location.id)
                    ? 'bg-yellow-400 text-white scale-110 shadow-lg shadow-yellow-400/30'
                    : 'bg-black/10 text-white/70 hover:bg-white/20'
                    }`}
                >
                  <Star className={`w-5 h-5 ${favorites.includes(location.id) ? 'fill-current' : ''}`} />
                </button>

                <div className="p-8 pb-10">
                  <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl shadow-xl shadow-blue-500/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                    {location.icon}
                  </div>
                  <div className="mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2 block">
                      {location.category}
                    </span>
                    <h2 className="text-2xl font-black mb-3">{location.name}</h2>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {location.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
                    <span>Start AR Navigation</span>
                    <Navigation className="w-4 h-4 fill-current animate-pulse" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
              <div className="text-6xl mb-6">🔍</div>
              <p className="text-xl text-slate-500 font-bold">No matches for "{searchQuery}" in {selectedCategory}</p>
            </div>
          )}
        </div>

        <section className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black tracking-tight">System Highlights</h2>
            <div className="h-1 flex-1 bg-linear-to-r from-blue-500 to-transparent rounded-full opacity-20"></div>
          </div>
          <FeatureHighlights isDarkMode={isDarkMode} />
        </section>
      </div>
    </div>
  );
};

export default Navigator;
