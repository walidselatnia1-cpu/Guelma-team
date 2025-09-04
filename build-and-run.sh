#!/bin/bash

# Build and run the Docker container for Guelma Recipes

echo "🔨 Building Guelma Recipes Docker image..."
docker build -t guelma-recipes .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    
    echo "🚀 Starting the container..."
    docker run -d -p 3000:3000 --name guelma-recipes-app guelma-recipes
    
    if [ $? -eq 0 ]; then
        echo "🎉 Container started successfully!"
        echo "🌐 Your recipe app is now running at: http://localhost:3000"
        echo ""
        echo "📋 Container management commands:"
        echo "   • Stop container:    docker stop guelma-recipes-app"
        echo "   • Start container:   docker start guelma-recipes-app"
        echo "   • View logs:         docker logs guelma-recipes-app"
        echo "   • Remove container:  docker rm guelma-recipes-app"
    else
        echo "❌ Failed to start container"
        exit 1
    fi
else
    echo "❌ Docker build failed"
    exit 1
fi
