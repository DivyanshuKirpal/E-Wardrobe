#!/bin/bash

# E-Wardrobe Setup Test Script
# Verifies that all dependencies and services are properly configured

echo "🧪 E-Wardrobe Setup Test"
echo "========================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to print test result
test_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC} - $2"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC} - $2"
        ((FAILED++))
    fi
}

# Test Node.js
echo "Testing Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    test_result 0 "Node.js installed ($NODE_VERSION)"
else
    test_result 1 "Node.js not found"
fi
echo ""

# Test npm
echo "Testing npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    test_result 0 "npm installed ($NPM_VERSION)"
else
    test_result 1 "npm not found"
fi
echo ""

# Test Python
echo "Testing Python..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    test_result 0 "Python installed ($PYTHON_VERSION)"
else
    test_result 1 "Python not found"
fi
echo ""

# Test MongoDB
echo "Testing MongoDB..."
if command -v mongosh &> /dev/null || command -v mongo &> /dev/null; then
    test_result 0 "MongoDB CLI installed"
else
    test_result 1 "MongoDB CLI not found (mongosh or mongo)"
fi
echo ""

# Check frontend dependencies
echo "Checking frontend dependencies..."
if [ -d "node_modules" ]; then
    test_result 0 "Frontend node_modules exists"
else
    test_result 1 "Frontend node_modules missing (run: npm install)"
fi
echo ""

# Check backend dependencies
echo "Checking backend dependencies..."
if [ -d "server/node_modules" ]; then
    test_result 0 "Backend node_modules exists"
else
    test_result 1 "Backend node_modules missing (run: cd server && npm install)"
fi
echo ""

# Check Python virtual environment
echo "Checking Python environment..."
if [ -d "server/Cartoon_Service/.venv" ]; then
    test_result 0 "Python virtual environment exists"
else
    test_result 1 "Python venv missing (run: cd server/Cartoon_Service && python3 -m venv .venv)"
fi
echo ""

# Check .env file
echo "Checking environment configuration..."
if [ -f "server/.env" ]; then
    test_result 0 "server/.env file exists"
    
    # Check for required variables
    if grep -q "MONGO_URI" server/.env; then
        test_result 0 "MONGO_URI configured"
    else
        test_result 1 "MONGO_URI not found in .env"
    fi
    
    if grep -q "JWT_SECRET" server/.env; then
        test_result 0 "JWT_SECRET configured"
    else
        test_result 1 "JWT_SECRET not found in .env"
    fi
else
    test_result 1 "server/.env file missing"
fi
echo ""

# Check Python dependencies
echo "Checking Python dependencies..."
if [ -f "server/Cartoon_Service/requirements.txt" ]; then
    test_result 0 "requirements.txt exists"
else
    test_result 1 "requirements.txt missing"
fi
echo ""

# Check key files
echo "Checking project files..."
FILES=(
    "src/App.jsx"
    "src/pages/ClosetPage.jsx"
    "src/Components/Header.jsx"
    "src/Components/ClosetHeader.jsx"
    "server/index.js"
    "server/routes/cartoon_proxy.js"
    "server/Cartoon_Service/Cartoonize.py"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        test_result 0 "$file exists"
    else
        test_result 1 "$file missing"
    fi
done
echo ""

# Summary
echo "========================"
echo "Test Summary"
echo "========================"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed! Your setup looks good.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Ensure MongoDB is running"
    echo "2. Run: ./start-services.sh"
    echo "3. Open http://localhost:5173"
    exit 0
else
    echo -e "${YELLOW}⚠ Some tests failed. Please fix the issues above.${NC}"
    echo ""
    echo "Common fixes:"
    echo "- Run: npm install"
    echo "- Run: cd server && npm install"
    echo "- Run: cd server/Cartoon_Service && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt"
    echo "- Create server/.env with required variables"
    exit 1
fi
