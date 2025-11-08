# 🚀 Deployment Checklist - GeoTapp Marketing

Segui questa checklist prima di fare il deploy in produzione.

## ✅ Pre-Deployment Checks

### Code Quality
- [ ] `npm run type-check` - Nessun errore TypeScript
- [ ] `npm run lint` - Nessun errore linting
- [ ] `npm run build` - Build completato senza errori
- [ ] Revisione del codice da parte di un collega

### Security
- [ ] `.env.local` non è committato su Git
- [ ] Tutte le API keys sono in variabili d'ambiente
- [ ] CORS configurato correttamente nel backend Django
- [ ] SSL/TLS certificati configurati
- [ ] HTTPS force abilitato
- [ ] Nessun hardcoded di secrets nel codice

### SEO & Analytics
- [ ] Google Analytics ID configurato
- [ ] Sitemap generata (`/sitemap.xml`)
- [ ] robots.txt configurato correttamente
- [ ] Meta tags sono corretti e unici
- [ ] Open Graph images specificati
- [ ] Canonical URL configurato

### Performance
- [ ] Images optimizzate (AVIF, WebP)
- [ ] Bundle size < 200KB gzipped
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals ottimizzati
- [ ] Cache headers configurati

### Accessibility
- [ ] WCAG 2.1 AA compliance verificato
- [ ] Screen reader testing completato
- [ ] Keyboard navigation funziona
- [ ] Color contrast verificato
- [ ] Alt text su tutte le immagini

### Backend Integration
- [ ] Django backend in running
- [ ] Tutti gli endpoint API testati
- [ ] CORS headers configurati
- [ ] Rate limiting configurato
- [ ] Error handling robusto

## 📋 Environment Variables

### Development
```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
NEXT_PUBLIC_BACKEND_API=http://127.0.0.1:8000/api
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Staging
```env
NEXT_PUBLIC_BACKEND_URL=https://api-staging.geotapp.com
NEXT_PUBLIC_BACKEND_API=https://api-staging.geotapp.com/api
NEXT_PUBLIC_GA4_ID=G-STAGING-ID
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Production
```env
NEXT_PUBLIC_BACKEND_URL=https://api.geotapp.com
NEXT_PUBLIC_BACKEND_API=https://api.geotapp.com/api
NEXT_PUBLIC_GA4_ID=G-PRODUCTION-ID
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## 🔄 Deployment Steps

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   vercel link
   ```

2. **Configure Environment**
   - Vai a Vercel Dashboard
   - Settings → Environment Variables
   - Aggiungi tutte le variabili di produzione

3. **Deploy**
   ```bash
   vercel deploy --prod
   ```

4. **Test**
   - Verifica il sito live
   - Testa contact form
   - Verifica analytics tracking

### Option 2: Docker

1. **Build Image**
   ```bash
   docker build -t geotapp-marketing:latest .
   ```

2. **Run Container**
   ```bash
   docker run \
     -p 3000:3000 \
     -e NEXT_PUBLIC_BACKEND_URL=https://api.geotapp.com \
     -e NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX \
     geotapp-marketing:latest
   ```

3. **Deploy to Server**
   ```bash
   docker push your-registry/geotapp-marketing:latest
   # Deploy via your orchestration tool (K8s, Docker Compose, etc.)
   ```

### Option 3: Self-Hosted (Ubuntu/Debian)

1. **SSH into Server**
   ```bash
   ssh user@your-server.com
   ```

2. **Clone Repository**
   ```bash
   git clone https://github.com/your-repo/geotapp-marketing.git
   cd geotapp-marketing
   ```

3. **Install Dependencies**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install
   ```

4. **Create .env.production**
   ```bash
   cat > .env.production << EOF
   NEXT_PUBLIC_BACKEND_URL=https://api.geotapp.com
   NEXT_PUBLIC_BACKEND_API=https://api.geotapp.com/api
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_ENVIRONMENT=production
   NEXT_PUBLIC_ENABLE_ANALYTICS=true
   EOF
   ```

5. **Build**
   ```bash
   npm run build
   ```

6. **Setup PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   pm2 start npm -- start --name "geotapp-marketing"
   pm2 startup
   pm2 save
   ```

7. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
     listen 443 ssl;
     server_name geotapp.com www.geotapp.com;
   
     ssl_certificate /etc/letsencrypt/live/geotapp.com/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/geotapp.com/privkey.pem;
   
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

8. **Enable SSL (Let's Encrypt)**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot certonly --nginx -d geotapp.com -d www.geotapp.com
   ```

## 🔍 Post-Deployment Verification

### Functionality
- [ ] Landing page carica completamente
- [ ] Contact form funziona
- [ ] CTA buttons reindirizzano correttamente
- [ ] Navigation menu funziona
- [ ] Mobile responsive design funziona

### Performance
- [ ] Page load time < 3 secondi
- [ ] Lighthouse score verificato
- [ ] Images caricate correttamente
- [ ] CSS/JS bundled e minified

### Security
- [ ] HTTPS attivo
- [ ] Security headers presenti
- [ ] No mixed content warnings
- [ ] CSP headers configurati

### Monitoring
- [ ] Google Analytics tracking
- [ ] Error logging configurato
- [ ] Uptime monitoring configurato
- [ ] Performance monitoring abilitato

## 🚨 Rollback Plan

Se qualcosa va male:

### Vercel
```bash
vercel rollback
```

### Docker
```bash
docker run -d \
  -p 3000:3000 \
  --name geotapp-marketing \
  geotapp-marketing:stable
```

### Self-Hosted
```bash
git revert <commit-hash>
npm run build
pm2 restart geotapp-marketing
```

## 📊 Monitoring

### Key Metrics
- Page load time
- Error rate
- User engagement
- Conversion rate
- Bounce rate

### Tools
- Google Analytics Dashboard
- Vercel Analytics
- Server logs (nginx, pm2)
- Error tracking (Sentry, etc.)

## 📞 Support

Per problemi durante il deployment:
1. Controlla i logs
2. Verifica le variabili d'ambiente
3. Testa la connessione al backend
4. Riavvia il processo

---

**Last Updated**: 2024  
**Deployment Status**: Ready for Production