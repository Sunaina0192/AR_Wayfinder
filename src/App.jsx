import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomeFooter from './components/HomeFooter'
import FrontPage from './pages/FrontPage'
import FloatingContact from './components/FloatingContact'
import { AuthProvider } from './context/AuthContext'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Courses = lazy(() => import('./pages/Courses'))
const Events = lazy(() => import('./pages/Events'))
const Contact = lazy(() => import('./pages/Contact'))
const Gallery = lazy(() => import('./pages/Gallery'))
const InformationCorner = lazy(() => import('./pages/InformationCorner'))
const RTI = lazy(() => import('./pages/RTI'))
const Navigator = lazy(() => import('./pages/Navigator'))
const History = lazy(() => import('./pages/History'))
const Alumni = lazy(() => import('./pages/Alumni'))
const Profile = lazy(() => import('./pages/Profile'))
const Settings = lazy(() => import('./pages/Settings'))

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-600 to-indigo-600">
    <div className="text-white text-center">
      <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-xl">Loading...</p>
    </div>
  </div>
)

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isFrontPage = location.pathname === '/';

  if (isFrontPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-dark overflow-x-clip selection:bg-accent/30">
      <Navbar />
      <main className="flex-1 relative">
        {/* Subtle background glow for all pages */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </main>
      <HomeFooter />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/events" element={<Events />} />
              <Route path="/navigator" element={<Navigator />} />
              <Route path="/history" element={<History />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/information-corner" element={<InformationCorner />} />
              <Route path="/rti" element={<RTI />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </AppLayout>
        <FloatingContact />
      </Router>
    </AuthProvider>
  )
}

export default App
