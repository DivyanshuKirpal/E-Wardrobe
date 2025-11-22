#!/bin/bash

# E-Wardrobe Services Startup Script
echo "🚀 Starting E-Wardrobe Services..."

# Check if Python virtual environment exists
if [ ! -d "server/Cartoon_Service/.venv" ]; then
    echo "📦 Creating Python virtual environment..."
    cd server/Cartoon_Service
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    cd ../..
fi

# Start Python Flask cartoonization service
echo "🎨 Starting Cartoonization Service (Port 6000)..."
cd server/Cartoon_Service
source .venv/bin/activate
python Cartoonize.py &
PYTHON_PID=$!
cd ../..

# Wait a moment for Python service to start
sleep 2

# Start Node.js backend
echo "🔧 Starting Node.js Backend (Port 5001)..."
cd server
npm start &
NODE_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start Vite frontend
echo "⚡ Starting Vite Frontend (Port 5173)..."
npm run dev &
VITE_PID=$!

echo ""
echo "✅ All services started!"
echo "   - Frontend: http://localhost:5173"
echo "   - Backend: http://localhost:5001"
echo "   - Cartoon Service: http://localhost:6000"
echo ""
echo "Press Ctrl+C to stop all services"

# Trap Ctrl+C and kill all processes
trap "echo '🛑 Stopping services...'; kill $PYTHON_PID $NODE_PID $VITE_PID 2>/dev/null; exit" INT

# Wait for all background processes
wait
