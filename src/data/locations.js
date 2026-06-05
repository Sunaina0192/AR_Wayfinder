// Campus locations database shared by Explore Campus and Navigator.
export const campusLocations = [
  {
    id: 'entry-gate',
    name: 'Main Entry Gate',
    description: 'Primary campus entrance and visitor arrival point.',
    coordinates: { x: 24, y: 250 },
    icon: '01',
    category: 'Administrative',
    explorerCategory: 'Facilities',
  },
  {
    id: 'school',
    name: 'School',
    description: 'Academic school wing for classrooms and student activity.',
    coordinates: { x: 94, y: 190 },
    icon: '02',
    category: 'Academic',
    explorerCategory: 'Academic',
  },
  {
    id: 'school-admin',
    name: 'School Admin',
    description: 'School administration offices and academic support desk.',
    coordinates: { x: 75, y: 220 },
    icon: '03',
    category: 'Administrative',
    explorerCategory: 'Administrative',
  },
  {
    id: 'dispensary',
    name: 'Dispensary',
    description: 'Campus medical support and first-aid facility.',
    coordinates: { x: 210, y: 185 },
    icon: '04',
    category: 'Facilities',
    explorerCategory: 'Facilities',
  },
  {
    id: 'auditorium',
    name: 'Auditorium',
    description: 'Main venue for events, seminars, and cultural programs.',
    coordinates: { x: 250, y: 145 },
    icon: '05',
    category: 'Facilities',
    explorerCategory: 'Facilities',
  },
  {
    id: 'football-ground',
    name: 'Football Ground',
    description: 'Open sports field for football and outdoor training.',
    coordinates: { x: 218, y: 108 },
    icon: '06',
    category: 'Sports',
    explorerCategory: 'Sports',
  },
  {
    id: 'block5-uiet',
    name: 'Block 5 Engineering',
    description: 'Engineering block with labs, classrooms, and project spaces.',
    coordinates: { x: 142, y: 160 },
    icon: '07',
    category: 'Academic',
    explorerCategory: 'Academic',
  },
  {
    id: 'stadium',
    name: 'Stadium',
    description: 'Sports stadium for athletics, tournaments, and practice.',
    coordinates: { x: 286, y: 105 },
    icon: '08',
    category: 'Sports',
    explorerCategory: 'Sports',
  },
  {
    id: 'block3',
    name: 'Block 3 Physical Education & Fashion',
    description: 'Academic block for Physical Education and Fashion programs.',
    coordinates: { x: 160, y: 210 },
    icon: '09',
    category: 'Academic',
    explorerCategory: 'Academic',
  },
  {
    id: 'girls-hostel',
    name: 'Girls Hostel',
    description: 'Residential hostel facility for female students.',
    coordinates: { x: 120, y: 70 },
    icon: '10',
    category: 'Hostels',
    explorerCategory: 'Hostels',
  },
  {
    id: 'nursing-block',
    name: 'Nursing Block',
    description: 'Nursing academic block with training and learning spaces.',
    coordinates: { x: 205, y: 68 },
    icon: '11',
    category: 'Academic',
    explorerCategory: 'Academic',
  },
  {
    id: 'girls-canteen',
    name: 'Girls Canteen',
    description: 'Dining and refreshment area near the hostel zone.',
    coordinates: { x: 137, y: 98 },
    icon: '12',
    category: 'Cafeteria',
    explorerCategory: 'Facilities',
  },
  {
    id: 'library',
    name: 'Library',
    description: 'Central academic library and study resource hub.',
    coordinates: { x: 226, y: 158 },
    icon: '13',
    category: 'Library',
    explorerCategory: 'Academic',
  },
  {
    id: 'admission-cell',
    name: 'Admission Cell',
    description: 'Admissions, registration, and student enquiry center.',
    coordinates: { x: 48, y: 230 },
    icon: '14',
    category: 'Administrative',
    explorerCategory: 'Administrative',
  },
  {
    id: 'boys-hostel',
    name: 'Boys Hostel',
    description: 'Residential hostel facility for male students.',
    coordinates: { x: 300, y: 66 },
    icon: '15',
    category: 'Hostels',
    explorerCategory: 'Hostels',
  },
  {
    id: 'main-parking',
    name: 'Main Parking',
    description: 'Visitor, student, and staff parking zone.',
    coordinates: { x: 62, y: 165 },
    icon: '16',
    category: 'Parking',
    explorerCategory: 'Facilities',
  },
  {
    id: 'law-block',
    name: 'Law Block',
    description: 'Academic block for law courses and legal studies.',
    coordinates: { x: 268, y: 192 },
    icon: '17',
    category: 'Academic',
    explorerCategory: 'Academic',
  },
  {
    id: 'gurudwara',
    name: 'Gurudwara',
    description: 'Spiritual and community space on campus.',
    coordinates: { x: 332, y: 146 },
    icon: '18',
    category: 'Facilities',
    explorerCategory: 'Facilities',
  },
  {
    id: 'main-ground',
    name: 'Main Ground',
    description: 'Large open campus ground for gatherings and activities.',
    coordinates: { x: 186, y: 128 },
    icon: '19',
    category: 'Sports',
    explorerCategory: 'Sports',
  },
];

const connect = (name, neighbors) => ({
  name,
  neighbors,
  directions: Object.fromEntries(
    neighbors.map((neighbor) => [neighbor, 'Follow the highlighted campus route'])
  ),
});

// Path finding data - connections between locations.
export const pathGraph = {
  'entry-gate': connect('Main Entry Gate', ['admission-cell', 'school-admin', 'main-parking']),
  'admission-cell': connect('Admission Cell', ['entry-gate', 'school-admin', 'school']),
  'school-admin': connect('School Admin', ['entry-gate', 'admission-cell', 'school', 'block3']),
  school: connect('School', ['admission-cell', 'school-admin', 'block5-uiet', 'library', 'main-parking']),
  'main-parking': connect('Main Parking', ['entry-gate', 'school', 'block5-uiet']),
  'block5-uiet': connect('Block 5 Engineering', ['school', 'main-parking', 'block3', 'main-ground', 'girls-canteen']),
  block3: connect('Block 3 Physical Education & Fashion', ['school-admin', 'block5-uiet', 'library', 'dispensary']),
  library: connect('Library', ['school', 'block3', 'dispensary', 'law-block', 'main-ground']),
  dispensary: connect('Dispensary', ['block3', 'library', 'auditorium', 'law-block']),
  auditorium: connect('Auditorium', ['dispensary', 'football-ground', 'nursing-block']),
  'main-ground': connect('Main Ground', ['block5-uiet', 'library', 'football-ground', 'girls-canteen']),
  'football-ground': connect('Football Ground', ['main-ground', 'auditorium', 'stadium']),
  stadium: connect('Stadium', ['football-ground', 'boys-hostel', 'gurudwara']),
  'girls-hostel': connect('Girls Hostel', ['girls-canteen', 'nursing-block']),
  'girls-canteen': connect('Girls Canteen', ['girls-hostel', 'block5-uiet', 'main-ground']),
  'nursing-block': connect('Nursing Block', ['girls-hostel', 'auditorium', 'boys-hostel']),
  'boys-hostel': connect('Boys Hostel', ['nursing-block', 'stadium', 'gurudwara']),
  'law-block': connect('Law Block', ['library', 'dispensary', 'gurudwara']),
  gurudwara: connect('Gurudwara', ['law-block', 'stadium', 'boys-hostel']),
};

// Get location by ID.
export const getLocationById = (id) => {
  return campusLocations.find((loc) => loc.id === id);
};

// Find shortest path using Dijkstra's Algorithm.
export const findShortestPath = (startId, endId) => {
  if (startId === endId) return [startId];

  const distances = {};
  const previous = {};
  const nodes = new Set();

  Object.keys(pathGraph).forEach((nodeId) => {
    distances[nodeId] = Infinity;
    previous[nodeId] = null;
    nodes.add(nodeId);
  });

  if (distances[startId] === undefined) return null;
  distances[startId] = 0;

  while (nodes.size > 0) {
    let smallestNode = null;
    for (const node of nodes) {
      if (smallestNode === null || distances[node] < distances[smallestNode]) {
        smallestNode = node;
      }
    }

    if (smallestNode === null || distances[smallestNode] === Infinity) break;
    if (smallestNode === endId) break;

    nodes.delete(smallestNode);

    const neighbors = pathGraph[smallestNode]?.neighbors || [];
    for (const neighbor of neighbors) {
      if (!nodes.has(neighbor)) continue;

      const loc1 = getLocationById(smallestNode);
      const loc2 = getLocationById(neighbor);

      if (!loc1 || !loc2) continue;

      const weight = Math.sqrt(
        Math.pow(loc2.coordinates.x - loc1.coordinates.x, 2) +
        Math.pow(loc2.coordinates.y - loc1.coordinates.y, 2)
      );

      const alt = distances[smallestNode] + weight;
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = smallestNode;
      }
    }
  }

  const path = [];
  let current = endId;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return path[0] === startId ? path : null;
};

// Generate directions from path.
export const generateDirections = (path) => {
  if (!path || path.length < 2) return [];

  const directions = [];

  for (let i = 0; i < path.length - 1; i += 1) {
    const currentId = path[i];
    const nextId = path[i + 1];
    const location = pathGraph[currentId];
    const currentLocation = getLocationById(currentId);
    const nextLocation = getLocationById(nextId);

    if (location && currentLocation && nextLocation) {
      directions.push({
        from: currentId,
        to: nextId,
        instruction: location.directions?.[nextId] || 'Continue to the next campus marker',
        distance: `${Math.round(Math.sqrt(
          Math.pow(nextLocation.coordinates.x - currentLocation.coordinates.x, 2) +
          Math.pow(nextLocation.coordinates.y - currentLocation.coordinates.y, 2)
        ) * 10)} meters`,
      });
    }
  }

  return directions;
};
