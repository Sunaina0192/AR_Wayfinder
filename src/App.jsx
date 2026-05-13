import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import Header from './components/Header'
import Navbar from './components/Navbar'
import HomeFooter from './components/HomeFooter'

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

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-600 to-indigo-600">
    <div className="text-white text-center">
      <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-xl">Loading...</p>
    </div>
  </div>
)

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />
        <main className="flex-1">
          <div className="min-h-full p-7.5">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
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
              </Routes>
            </Suspense>
          </div>
        </main>
        <HomeFooter />
      </div>
    </Router>
  )
}

export default App
