# Docker Deployment Guide for Guelma Recipes 🐳

## Quick Start

### Using Docker Compose (Recommended)
```bash
# Build and start the application
docker-compose up --build -d

# Your app will be available at http://localhost:3000
```

### Using Docker directly
```bash
# Build the image
docker build -t guelma-recipes .

# Run the container
docker run -d -p 3000:3000 --name guelma-recipes-app guelma-recipes
```

### Using the provided scripts
**Windows:**
```bash
./build-and-run.bat
```

**Linux/Mac:**
```bash
chmod +x build-and-run.sh
./build-and-run.sh
```

## Container Management

### View running containers
```bash
docker ps
```

### Stop the container
```bash
docker stop guelma-recipes-app
# or
docker-compose down
```

### Start the container
```bash
docker start guelma-recipes-app
# or
docker-compose up -d
```

### View logs
```bash
docker logs guelma-recipes-app
# or
docker-compose logs guelma-recipes
```

### Remove container
```bash
docker rm guelma-recipes-app
docker rmi guelma-recipes
```

## Production Deployment

### Environment Variables
Create a `.env.production` file for production settings:
```env
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
NEXT_TELEMETRY_DISABLED=1
```

### Cloud Deployment Options

#### 1. Docker Hub + Cloud Provider
```bash
# Tag and push to Docker Hub
docker tag guelma-recipes your-username/guelma-recipes:latest
docker push your-username/guelma-recipes:latest
```

#### 2. Deploy to DigitalOcean App Platform
- Create a new app
- Connect your GitHub repository
- DigitalOcean will automatically detect the Dockerfile

#### 3. Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway deploy
```

#### 4. Deploy to Render
- Connect your GitHub repository
- Render will automatically build and deploy using the Dockerfile

### Custom Nginx Configuration (Optional)
For production, you might want to use Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Troubleshooting

### Common Issues
1. **Port already in use**: Change the port mapping `-p 3001:3000`
2. **Build fails**: Ensure all dependencies are in package.json
3. **Images not loading**: Check that public folder is properly copied

### Debug Mode
Run container with interactive shell:
```bash
docker run -it --rm guelma-recipes sh
```

### Check container resource usage
```bash
docker stats guelma-recipes-app
```

## Features Included
- ✅ Multi-stage build for optimized image size
- ✅ Non-root user for security
- ✅ Proper file permissions
- ✅ Health checks ready
- ✅ Production-optimized Next.js standalone output
- ✅ Automated build scripts for Windows and Unix

## Image Details
- **Base Image**: Node.js 18 Alpine
- **Size**: ~150MB (optimized)
- **Port**: 3000
- **User**: nextjs (non-root)
- **Environment**: Production-ready
