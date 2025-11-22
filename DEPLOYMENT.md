# E-Wardrobe Deployment Guide

## 🚀 Production Deployment

This guide covers deploying E-Wardrobe to production environments.

---

## Prerequisites

- Domain name (optional but recommended)
- MongoDB Atlas account (or hosted MongoDB)
- Cloudinary account
- Hosting platform accounts (see options below)

---

## Environment Configuration

### Production Environment Variables

Create a production `.env` file with:

```env
# MongoDB (use MongoDB Atlas for production)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/e-wardrobe?retryWrites=true&w=majority

# JWT Secret (generate a strong random string)
JWT_SECRET=your_very_long_and_secure_random_string_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_production_cloud_name
CLOUDINARY_API_KEY=your_production_api_key
CLOUDINARY_API_SECRET=your_production_api_secret

# Server Configuration
PORT=5001
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://your-domain.com

# Python Service URL
PYTHON_SERVICE_URL=http://localhost:6000
```

---

## Deployment Options

### Option 1: All-in-One Server (VPS/Cloud)

**Recommended for:** Full control, all services on one machine

**Platforms:** DigitalOcean, AWS EC2, Google Cloud, Azure

#### Steps:

1. **Setup Server**
```bash
# SSH into your server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Python
sudo apt install -y python3 python3-pip python3-venv

# Install MongoDB (or use Atlas)
# Follow: https://docs.mongodb.com/manual/installation/

# Install Nginx
sudo apt install -y nginx

# Install PM2 for process management
sudo npm install -g pm2
```

2. **Clone and Setup Project**
```bash
# Clone repository
git clone <your-repo-url>
cd E-Wardrobe

# Install dependencies
npm install
cd server && npm install && cd ..

# Setup Python
cd server/Cartoon_Service
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ../..

# Create production .env
nano server/.env
# Add your production environment variables
```

3. **Build Frontend**
```bash
npm run build
```

4. **Start Services with PM2**
```bash
# Start Python service
cd server/Cartoon_Service
source .venv/bin/activate
pm2 start Cartoonize.py --name cartoon-service --interpreter python3
cd ../..

# Start Node.js backend
cd server
pm2 start index.js --name backend
cd ..

# Serve frontend with PM2 (or use Nginx)
pm2 serve dist 5173 --name frontend --spa

# Save PM2 configuration
pm2 save
pm2 startup
```

5. **Configure Nginx**
```bash
sudo nano /etc/nginx/sites-available/e-wardrobe
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/E-Wardrobe/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/e-wardrobe /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **Setup SSL with Let's Encrypt**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### Option 2: Separate Services (Recommended)

**Recommended for:** Scalability, better resource management

#### Frontend: Vercel/Netlify

1. **Build Configuration**

Create `vercel.json` or `netlify.toml`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

2. **Environment Variables**
Add in Vercel/Netlify dashboard:
```
VITE_API_URL=https://your-backend-url.com
```

3. **Update API calls**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
```

#### Backend: Railway/Heroku/Render

1. **Create `Procfile`**
```
web: cd server && npm start
```

2. **Add environment variables** in platform dashboard

3. **Deploy**
```bash
# Railway
railway up

# Heroku
heroku create your-app-name
git push heroku main

# Render
# Connect GitHub repo in dashboard
```

#### Python Service: Docker Container

1. **Create `Dockerfile`**
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY server/Cartoon_Service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY server/Cartoon_Service/ .

EXPOSE 6000

CMD ["python", "Cartoonize.py"]
```

2. **Build and Deploy**
```bash
docker build -t e-wardrobe-cartoon .
docker run -p 6000:6000 e-wardrobe-cartoon
```

Deploy to:
- Google Cloud Run
- AWS ECS
- Azure Container Instances
- DigitalOcean App Platform

---

## Database Setup (MongoDB Atlas)

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Choose region closest to your users

2. **Configure Access**
   - Add IP whitelist (0.0.0.0/0 for all IPs)
   - Create database user
   - Get connection string

3. **Update Environment**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/e-wardrobe
```

---

## Cloudinary Setup

1. **Create Account**
   - Go to [Cloudinary](https://cloudinary.com/)
   - Sign up for free account

2. **Get Credentials**
   - Dashboard → Account Details
   - Copy Cloud Name, API Key, API Secret

3. **Configure Upload Preset** (optional)
   - Settings → Upload
   - Create unsigned preset for easier uploads

---

## Security Checklist

- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Use environment variables (never commit .env)
- [ ] Enable MongoDB authentication
- [ ] Set up firewall rules
- [ ] Use rate limiting
- [ ] Implement input validation
- [ ] Enable security headers
- [ ] Regular security updates

---

## Performance Optimization

### Frontend
```bash
# Build with optimizations
npm run build

# Analyze bundle size
npm run build -- --analyze
```

### Backend
- Enable gzip compression
- Use Redis for caching
- Implement CDN for static assets
- Optimize database queries
- Use connection pooling

### Python Service
- Use gunicorn for production
- Enable worker processes
- Implement request queuing

---

## Monitoring & Logging

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
pm2 status
```

### Application Monitoring
- Use [New Relic](https://newrelic.com/)
- Use [Datadog](https://www.datadoghq.com/)
- Use [Sentry](https://sentry.io/) for error tracking

### Log Management
- Use [Loggly](https://www.loggly.com/)
- Use [Papertrail](https://www.papertrail.com/)
- Use ELK Stack (Elasticsearch, Logstash, Kibana)

---

## Backup Strategy

### Database Backups
```bash
# MongoDB Atlas: Automatic backups enabled by default

# Manual backup
mongodump --uri="mongodb+srv://..." --out=/backup/$(date +%Y%m%d)
```

### Code Backups
- Use Git for version control
- Regular commits to GitHub/GitLab
- Tag releases

### Media Backups
- Cloudinary has built-in redundancy
- Consider additional backup to S3

---

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy)
- Deploy multiple backend instances
- Use Redis for session management

### Vertical Scaling
- Upgrade server resources
- Optimize database indexes
- Use caching strategies

### Database Scaling
- MongoDB Atlas auto-scaling
- Read replicas for read-heavy workloads
- Sharding for large datasets

---

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Monitor error logs daily
- Check performance metrics weekly
- Review security advisories
- Backup verification

### Update Process
```bash
# Pull latest changes
git pull origin main

# Update dependencies
npm install
cd server && npm install && cd ..

# Rebuild frontend
npm run build

# Restart services
pm2 restart all
```

---

## Troubleshooting Production Issues

### Service Not Starting
```bash
# Check logs
pm2 logs backend
pm2 logs cartoon-service

# Check ports
netstat -tulpn | grep :5001
netstat -tulpn | grep :6000

# Restart services
pm2 restart all
```

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist
- Check connection string
- Verify credentials
- Check network connectivity

### High Memory Usage
```bash
# Check memory
free -h
pm2 monit

# Restart services
pm2 restart all
```

---

## Cost Estimation

### Free Tier (Development)
- Frontend: Vercel/Netlify (Free)
- Backend: Railway/Render (Free tier)
- Database: MongoDB Atlas (Free 512MB)
- Images: Cloudinary (Free 25GB)
- **Total: $0/month**

### Production (Small Scale)
- Frontend: Vercel Pro ($20/month)
- Backend: Railway ($5-20/month)
- Database: MongoDB Atlas M10 ($57/month)
- Images: Cloudinary ($99/month)
- Domain: $10-15/year
- **Total: ~$180-200/month**

### Production (Medium Scale)
- VPS: DigitalOcean Droplet ($40/month)
- Database: MongoDB Atlas M30 ($250/month)
- Images: Cloudinary Advanced ($249/month)
- CDN: Cloudflare Pro ($20/month)
- **Total: ~$560/month**

---

## Support & Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app/)
- [PM2 Docs](https://pm2.keymetrics.io/docs/)
- [Nginx Docs](https://nginx.org/en/docs/)

---

**Ready to deploy? Follow the steps above and your E-Wardrobe will be live! 🚀**
