#!/bin/bash

# Git Update Script for E-Wardrobe
# Automatically stages, commits, and pushes changes

echo "🔍 Checking git status..."
git status

echo ""
echo "📝 Staging all changes..."
git add .

echo ""
echo "💬 Enter commit message (or press Enter for default):"
read commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update: Bug fixes and feature improvements"
fi

echo ""
echo "📦 Committing changes..."
git commit -m "$commit_message"

echo ""
echo "🚀 Pushing to remote repository..."
git push

echo ""
echo "✅ Git update complete!"
echo ""
echo "📊 Latest commits:"
git log --oneline -5
