// Campus locations database
export const campusLocations = [
  {
    id: 'entry-gate',
    name: 'Entry Gate',
    description: 'Main entrance to the campus',
    coordinates: { x: 10, y: 150 },
    icon: '🚪',
  },
  {
    id: 'school',
    name: 'School Block',
    description: 'School of Higher Education',
    coordinates: { x: 150, y: 100 },
    icon: '🏫',
  },
  {
    id: 'block5-uiet',
    name: 'Block 5 (UIET)',
    description: 'University Institute of Engineering & Technology',
    coordinates: { x: 200, y: 80 },
    icon: '🔧',
  },
  {
    id: 'library',
    name: 'Central Library',
    description: 'Main library with research resources',
    coordinates: { x: 180, y: 120 },
    icon: '📚',
  },
  {
    id: 'admission-cell',
    name: 'Admission Cell',
    description: 'Admissions and registration office',
    coordinates: { x: 50, y: 120 },
    icon: '📋',
  },
  {
    id: 'block3',
    name: 'Block 3',
    description: 'Academic Block 3',
    coordinates: { x: 100, y: 180 },
    icon: '🏢',
  },
  {
    id: 'girls-hostel',
    name: 'Girls Hostel',
    description: 'Residential facility for female students',
    coordinates: { x: 220, y: 200 },
    icon: '👩‍🎓',
  },
  {
    id: 'boys-hostel',
    name: 'Boys Hostel',
    description: 'Residential facility for male students',
    coordinates: { x: 240, y: 150 },
    icon: '👨‍🎓',
  },
  {
    id: 'stadium',
    name: 'Sports Stadium',
    description: 'Sports and athletic facilities',
    coordinates: { x: 280, y: 240 },
    icon: '⚽',
  },
  {
    id: 'canteen-block7',
    name: 'Canteen (Block 7)',
    description: 'Campus dining facility',
    coordinates: { x: 120, y: 220 },
    icon: '🍽️',
  },
  {
    id: 'workshop-center',
    name: 'Workshop Center',
    description: 'Technical training and workshops',
    coordinates: { x: 260, y: 100 },
    icon: '🛠️',
  },
];

// Path finding data - connections between locations
export const pathGraph = {
  'entry-gate': {
    name: 'Entry Gate',
    neighbors: ['admission-cell', 'school', 'block3'],
    directions: {
      'admission-cell': 'Turn right',
      'school': 'Go straight',
      'block3': 'Turn left and go straight'
    }
  },
  'admission-cell': {
    name: 'Admission Cell',
    neighbors: ['entry-gate', 'library', 'block3'],
    directions: {
      'entry-gate': 'Go back',
      'library': 'Turn right and go straight',
      'block3': 'Turn left'
    }
  },
  'school': {
    name: 'School Block',
    neighbors: ['entry-gate', 'library', 'block5-uiet'],
    directions: {
      'entry-gate': 'Go back',
      'library': 'Turn right',
      'block5-uiet': 'Continue straight'
    }
  },
  'block5-uiet': {
    name: 'Block 5 (UIET)',
    neighbors: ['school', 'library', 'workshop-center'],
    directions: {
      'school': 'Go back',
      'library': 'Turn left',
      'workshop-center': 'Continue straight'
    }
  },
  'library': {
    name: 'Central Library',
    neighbors: ['school', 'block5-uiet', 'admission-cell', 'block3'],
    directions: {
      'school': 'Turn left',
      'block5-uiet': 'Continue straight',
      'admission-cell': 'Turn left and go back',
      'block3': 'Turn right'
    }
  },
  'block3': {
    name: 'Block 3',
    neighbors: ['entry-gate', 'admission-cell', 'library', 'canteen-block7'],
    directions: {
      'entry-gate': 'Go back',
      'admission-cell': 'Turn right',
      'library': 'Continue straight',
      'canteen-block7': 'Turn left'
    }
  },
  'girls-hostel': {
    name: 'Girls Hostel',
    neighbors: ['boys-hostel', 'stadium'],
    directions: {
      'boys-hostel': 'Continue straight',
      'stadium': 'Turn left'
    }
  },
  'boys-hostel': {
    name: 'Boys Hostel',
    neighbors: ['girls-hostel', 'stadium', 'workshop-center'],
    directions: {
      'girls-hostel': 'Go back',
      'stadium': 'Continue straight',
      'workshop-center': 'Turn right'
    }
  },
  'stadium': {
    name: 'Sports Stadium',
    neighbors: ['girls-hostel', 'boys-hostel', 'canteen-block7'],
    directions: {
      'girls-hostel': 'Go back',
      'boys-hostel': 'Go back',
      'canteen-block7': 'Turn left'
    }
  },
  'canteen-block7': {
    name: 'Canteen (Block 7)',
    neighbors: ['block3', 'stadium'],
    directions: {
      'block3': 'Turn right',
      'stadium': 'Continue straight'
    }
  },
  'workshop-center': {
    name: 'Workshop Center',
    neighbors: ['block5-uiet', 'boys-hostel'],
    directions: {
      'block5-uiet': 'Go back',
      'boys-hostel': 'Continue straight'
    }
  }
};

// Get location by ID
export const getLocationById = (id) => {
  return campusLocations.find(loc => loc.id === id);
};

// Find shortest path using Dijkstra's Algorithm
export const findShortestPath = (startId, endId) => {
  if (startId === endId) return [startId];

  const distances = {};
  const previous = {};
  const nodes = new Set();

  // Initialize distances for all nodes in the graph
  Object.keys(pathGraph).forEach(nodeId => {
    distances[nodeId] = Infinity;
    previous[nodeId] = null;
    nodes.add(nodeId);
  });
  
  if (distances[startId] === undefined) return null;
  distances[startId] = 0;

  while (nodes.size > 0) {
    // Find node with minimum distance
    let smallestNode = null;
    for (let node of nodes) {
      if (smallestNode === null || distances[node] < distances[smallestNode]) {
        smallestNode = node;
      }
    }

    if (distances[smallestNode] === Infinity) break;
    if (smallestNode === endId) break;

    nodes.delete(smallestNode);

    const neighbors = pathGraph[smallestNode]?.neighbors || [];
    for (let neighbor of neighbors) {
      if (!nodes.has(neighbor)) continue;

      // Calculate weight (distance) between current node and neighbor
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

  // Reconstruct path
  const path = [];
  let current = endId;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return path[0] === startId ? path : null;
};

// Generate directions from path
export const generateDirections = (path) => {
  if (!path || path.length < 2) return [];
  
  const directions = [];
  
  for (let i = 0; i < path.length - 1; i++) {
    const currentId = path[i];
    const nextId = path[i + 1];
    const location = pathGraph[currentId];
    
    if (location && location.directions && location.directions[nextId]) {
      directions.push({
        from: currentId,
        to: nextId,
        instruction: location.directions[nextId],
        distance: Math.round(Math.sqrt(
          Math.pow(getLocationById(nextId).coordinates.x - getLocationById(currentId).coordinates.x, 2) +
          Math.pow(getLocationById(nextId).coordinates.y - getLocationById(currentId).coordinates.y, 2)
        ) * 10) + ' meters'
      });
    }
  }
  
  return directions;
};
