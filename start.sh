#!/bin/bash
# AR WayFinder - Quick Start Script
# Run this file to get started quickly

echo "🎓 Sant Baba Bhag Singh University - AR WayFinder"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ NPM version: $(npm -v)"
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
    echo ""
fi

# Display available commands
echo "🚀 Available Commands:"
echo "==================="
echo "npm run dev      - Start development server (http://localhost:5173)"
echo "npm run build    - Build for production"
echo "npm run preview  - Preview production build"
echo "npm run lint     - Run ESLint"
echo ""

echo "📱 How to Access:"
echo "================"
echo "Local:   http://localhost:5173"
echo "Mobile:  Use --host flag: npm run dev -- --host"
echo ""

echo "🗺️  Navigation Features:"
echo "======================"
echo "1. Click '🗺️ Navigation' in the navbar"
echo "2. Search or select a campus location"
echo "3. Click 'Start Navigation'"
echo "4. Grant camera permission"
echo "5. Follow the blue AR arrows!"
echo ""

echo "📍 Available Locations:"
echo "====================="
echo "• Entry Gate"
echo "• School Block"
echo "• Block 5 (UIET)"
echo "• Central Library"
echo "• Admission Cell"
echo "• Block 3"
echo "• Girls Hostel"
echo "• Boys Hostel"
echo "• Sports Stadium"
echo "• Canteen (Block 7)"
echo "• Workshop Center"
echo ""

echo "🎯 Starting development server..."
echo "Press Ctrl+C to stop the server"
echo ""

# Start development server
npm run dev
