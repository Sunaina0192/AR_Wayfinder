# 🎓 Sant Baba Bhag Singh University - AR WayFinder

A modern, innovative React-based website for Sant Baba Bhag Singh University with **AR (Augmented Reality) Navigation System** to help students and visitors find their way around campus.

---

## ✨ Key Features

### 1. **Modern University Website**
- **Home Page**: Beautiful hero section with call-to-action buttons
- **About Page**: University vision, mission, core values, and statistics
- **Courses Page**: All academic programs (B.Tech, BBA, BA/B.Sc, M.Tech, MBA, Ph.D.)
- **Events Page**: Upcoming campus events with calendar integration
- **Contact Page**: Contact form, location map, and office details
- **Navigation Bar**: Responsive navigation with mobile menu

### 2. **AR Navigation System** 🗺️
- **Interactive Campus Map**: Browse all 11 campus locations
- **Real-time AR Directions**: Point your camera and see blue arrows guiding you
- **Smart Path Finding**: Algorithm finds the shortest path between any two locations
- **Voice Instructions**: Text-to-speech support for directions
- **Step-by-Step Guidance**: Navigate with visual and textual instructions
- **Progress Tracker**: See your progress towards the destination

### 3. **Campus Locations Database**
The system includes 11 major campus buildings:
- 🚪 Entry Gate
- 🏫 School Block
- 🔧 Block 5 (UIET - Engineering)
- 📚 Central Library
- 📋 Admission Cell
- 🏢 Block 3
- 👩‍🎓 Girls Hostel
- 👨‍🎓 Boys Hostel
- ⚽ Sports Stadium
- 🍽️ Canteen (Block 7)
- 🛠️ Workshop Center

### 4. **Search & Discovery**
- **Smart Search**: Find locations by name or description
- **Filter Results**: Real-time filtering as you type
- **Quick Access**: Direct navigation to any campus location

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Modern web browser with camera access

### Installation

```bash
# Navigate to project directory
cd AR_WayFinder

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173/`

---

## 📱 How to Use AR Navigation

### Step 1: Select a Destination
1. Go to the **Navigation** page (🗺️ Navigation in navbar)
2. Search for or click on any location
3. Click **"Start Navigation"** button

### Step 2: Grant Camera Permission
- Allow camera access when prompted
- The app will automatically calculate the best route

### Step 3: Follow AR Directions
1. Point your camera ahead
2. Blue arrows will appear showing the direction
3. Follow the on-screen instructions
4. Use Voice (🔊) button to hear directions
5. Navigate through each step to reach your destination

### Step 4: Additional Controls
- **Next/Back**: Move between steps in the path
- **Reset**: Exit and go back to location selection
- **Progress Bar**: Track your progress toward destination

---

## 🏗️ Project Structure

```
AR_WayFinder/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar component
│   │   ├── Footer.jsx          # Footer component
│   │   ├── ARNavigator.jsx     # AR navigation with camera
│   │   └── Location.jsx        # Original location component
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── About.jsx           # About page
│   │   ├── Courses.jsx         # Courses & programs
│   │   ├── Events.jsx          # Campus events
│   │   ├── Contact.jsx         # Contact page
│   │   └── Navigator.jsx       # Location selection page
│   ├── data/
│   │   └── locations.js        # Campus locations database
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── tailwind.config.js          # Tailwind CSS config
```

---

## 🎨 Technology Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Styling**: Tailwind CSS 4.2.2
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **3D/AR Support**: Three.js (future enhancement)
- **HTTP Client**: Fetch API

---

## 🔄 Location Database Features

### `src/data/locations.js`

**Main Functions:**
```javascript
// Get location by ID
getLocationById(id)

// Find shortest path between two locations
findShortestPath(startId, endId)

// Generate turn-by-turn directions
generateDirections(path)
```

**Each location includes:**
- Unique ID and name
- Description
- GPS coordinates
- Icon/emoji
- Connected neighbors
- Turn-by-turn directions

---

## 📝 Pages Overview

### Home Page
- Hero section with campus branding
- Quick features highlighting
- Campus infrastructure overview
- Call-to-action for navigation and admissions

### About Page
- University vision and mission
- Key statistics
- Core values
- History and achievements

### Courses Page
- 6 academic programs listed
- Duration and specializations
- Admission process steps
- Program details and requirements

### Events Page
- Upcoming campus events calendar
- Event categories (Academic, Sports, Cultural, etc.)
- Event details with location and time
- Newsletter subscription

### Contact Page
- Contact information
- Contact form
- Location map (Google Maps embedded)
- Multiple contact channels

### Navigator Page
- Location search functionality
- Grid display of all campus buildings
- Quick action buttons
- Selected location details
- How-to guide for AR usage

---

## 🎯 AR Navigation Algorithm

The AR Navigator uses:
1. **Breadth-First Search (BFS)** for shortest path finding
2. **Graph-based routing** with connected neighbors
3. **Real-time direction calculation**
4. **Canvas-based AR overlay** for visual guidance
5. **Speech Synthesis API** for voice directions

---

## 🌟 Key AR Features

✅ **Live Camera Feed**: Real-time camera input  
✅ **AR Overlays**: Animated blue direction arrows  
✅ **Distance Display**: Estimated distance to next waypoint  
✅ **Voice Guidance**: Text-to-speech directions  
✅ **Progress Tracking**: Visual progress bar  
✅ **Step Navigation**: Move forward/backward through path  
✅ **Mobile Responsive**: Works on all devices with cameras  

---

## 🔧 Configuration

### Browser Requirements
- Chrome/Chromium (recommended)
- Firefox
- Safari (iOS 14.5+)
- Edge

### Permissions Needed
- Camera access (required for AR)
- Microphone access (optional, for voice)

---

## 🚀 Building for Production

```bash
# Build optimized production version
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 📚 Campus Information

**University Name**: Sant Baba Bhag Singh University (SBBSU)  
**Location**: Khiala, Sangrur, Punjab, India  
**Official Website**: https://sbbsuniversity.ac.in/  
**Contact**: +91 (1673) 505-505  
**Email**: info@sbbsuniversity.ac.in  

---

## 🎓 Academic Programs

| Program | Duration | Type |
|---------|----------|------|
| B.Tech Engineering | 4 Years | UG |
| BBA | 3 Years | UG |
| BA/B.Sc | 3 Years | UG |
| M.Tech | 2 Years | PG |
| MBA | 2 Years | PG |
| Ph.D. | Research | Doctoral |

---

## 🔐 Privacy & Security

- No user data is stored permanently
- Camera feed is processed locally only
- No analytics tracking
- GDPR compliant

---

## 🤝 Contributing

This is a university project. For contributions or improvements, please contact the development team.

---

## 📄 License

This project is created for Sant Baba Bhag Singh University.

---

## 🎉 Ready to Explore Campus?

🌐 **Visit**: http://localhost:5173/  
📱 **Navigate**: Use AR to explore campus  
🎓 **Learn**: Discover programs and events  
📞 **Connect**: Get in touch with the university  

---

## ❓ Troubleshooting

### Camera not working?
- Check browser permissions
- Ensure camera is not in use by another app
- Try a different browser

### AR arrows not showing?
- Grant camera permission
- Ensure good lighting
- Check browser console for errors

### Path not found?
- Some locations may not have direct connections
- Try alternate route suggestions

---

**Made with ❤️ for Sant Baba Bhag Singh University**
