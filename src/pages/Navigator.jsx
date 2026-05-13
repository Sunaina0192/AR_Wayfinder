import React, { useEffect, useState } from 'react';
import { campusLocations, findShortestPath, generateDirections } from '../data/locations';
import { MapPin, ArrowRight, Navigation, AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { fetchHistory, saveHistoryItem } from '../api/historyApi';
import ARNavigator from '../components/ARNavigator';
import MapView from '../components/MapView';
import LocationSearch from '../components/LocationSearch';
import RouteSummary from '../components/RouteSummary';
import NavigationHistory from '../components/NavigationHistory';
import FeatureHighlights from '../components/FeatureHighlights';
import PathDisplay from '../components/PathDisplay';

const Navigator = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activePath, setActivePath] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAR, setShowAR] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [historyError, setHistoryError] = useState(null);
  const routerLocation = useLocation();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setHistoryError(null);
        const items = await fetchHistory();
        setNavigationHistory(items);
      } catch (error) {
        console.error('Unable to load history', error);
        setHistoryError('Could not load history. Backend may be offline.');
      }
    }

    loadHistory()
  }, []);

  useEffect(() => {
    if (routerLocation.state?.destination) {
      handleLocationSelect(routerLocation.state.destination);
    }
  }, [routerLocation.state?.destination]);

  const saveHistory = async (id) => {
    const destination = campusLocations.find((loc) => loc.id === id);
    if (!destination) return;

    try {
      const updatedHistory = await saveHistoryItem({
        destinationId: id,
        name: destination.name,
      });
      setNavigationHistory(updatedHistory);
      setHistoryError(null);
    } catch (error) {
      console.error('Unable to save history item', error);
      setHistoryError('Could not save route. Backend may be offline.');
    }
  };

  const handleLocationSelect = (id) => {
    const normalizedId = campusLocations.find((loc) => loc.id === id)?.id || id;
    const path = findShortestPath('entry-gate', normalizedId);
    setSelectedLocation(normalizedId);
    setActivePath(path || []);
    saveHistory(normalizedId);
  };

  const filteredLocations = campusLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const directions = generateDirections(activePath);
  const distance = activePath.length > 1 ? Math.round((activePath.length - 1) * 50) : 0;

  if (showAR && selectedLocation) {
    return <ARNavigator destination={selectedLocation} onExit={() => setShowAR(false)} />;
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex justify-center px-4 sm:px-6 lg:px-8">
      {historyError && (
        <div className="fixed top-4 right-4 z-50 max-w-md rounded-lg bg-yellow-50 border border-yellow-200 p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-yellow-800">{historyError}</p>
            <p className="text-xs text-yellow-700 mt-1">Make sure the backend server is running: <code className="bg-yellow-100 px-1 rounded">npm run server</code></p>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">🗺️ Campus Navigator</h1>
          <p className="text-xl text-slate-600">Use AR to find your way around campus with ease.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <LocationSearch
              query={searchQuery}
              onChange={setSearchQuery}
              results={filteredLocations}
              onSelect={handleLocationSelect}
            />
            <MapView
              selectedLocation={selectedLocation}
              activePath={activePath}
              onLocationSelect={handleLocationSelect}
            />
            <PathDisplay directions={directions} />
          </div>

          <div className="space-y-6">
            <RouteSummary
              selectedLocation={selectedLocation}
              distance={distance}
              stepCount={directions.length}
            />
            <NavigationHistory history={navigationHistory} onSelect={handleLocationSelect} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <div
                key={location.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer border-2 ${selectedLocation === location.id ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => handleLocationSelect(location.id)}
              >
                <div className="bg-linear-to-br from-blue-500 to-indigo-600 p-8 text-white text-center">
                  <div className="text-6xl mb-2">{location.icon}</div>
                  <h2 className="text-2xl font-bold">{location.name}</h2>
                </div>

                <div className="p-6">
                  <p className="text-slate-600 mb-4">{location.description}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLocationSelect(location.id);
                      setShowAR(true);
                    }}
                    className="w-full px-6 py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg flex items-center justify-center gap-3 transition transform hover:scale-105 text-lg"
                  >
                    <MapPin className="w-5 h-5" />
                    Start Navigation
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-2xl text-slate-500">No locations found. Try a different search.</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-12">
          {selectedLocation ? (
            (() => {
              const location = campusLocations.find((l) => l.id === selectedLocation);
              return (
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-3">{location?.name}</h2>
                    <p className="text-slate-600 mb-6">{location?.description}</p>
                    <ul className="space-y-3 text-slate-700">
                      <li><strong>Campus Area:</strong> {location?.name}</li>
                      <li><strong>Status:</strong> <span className="text-emerald-600">Open</span></li>
                      <li><strong>Accessibility:</strong> ♿ Fully accessible</li>
                    </ul>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-8 flex flex-col justify-between">
                    <div>
                      <div className="text-6xl mb-4">{location?.icon}</div>
                      <h3 className="text-2xl font-semibold text-slate-900 mb-3">Quick actions</h3>
                      <p className="text-slate-600 mb-5">Open the AR route directly for an immersive campus experience.</p>
                    </div>
                    <button
                      onClick={() => setShowAR(true)}
                      className="w-full rounded-3xl bg-blue-600 px-6 py-4 text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition"
                    >
                      View in AR
                    </button>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="text-center py-16 text-slate-600">
              <p>Select a destination from the search bar or map to preview campus navigation.</p>
            </div>
          )}
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Why AR-Wayfinder?</h2>
          <FeatureHighlights />
        </section>
      </div>
    </div>
  );
};

export default Navigator;
