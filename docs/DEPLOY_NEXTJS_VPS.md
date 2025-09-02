# 🚀 Deploy Next.js on VPS (Ubuntu/Debian)

## 1. System Setup
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs nginx
sudo npm install -g pm2
```

## 2. Get Project
```bash
git clone https://github.com/your-username/your-next-app.git
cd your-next-app
```
(or upload with `scp`)

## 3. Build & Run
```bash
npm install --production
npm run build
pm2 start npm --name "nextapp" -- start
pm2 save
```

## 4. Configure NGINX
```bash
sudo nano /etc/nginx/sites-available/nextapp
```

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/nextapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 5. Enable HTTPS
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

## 6. Auto Start on Reboot
```bash
pm2 startup
pm2 save
```

✅ App live at: **https://yourdomain.com**
