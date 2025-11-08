# 🚀 Setup Guida - GeoTapp Marketing

Questa è la landing page marketing di GeoTapp, completamente ottimizzata con integrazione backend Django, analytics GA4, e form di contatto.

## 📋 Prerequisiti

- Node.js 18+ (scarica da https://nodejs.org)
- npm o yarn
- Backend Django in esecuzione (http://127.0.0.1:8000 di default)

## 🔧 Installazione

### 1. Installa le dipendenze
```bash
npm install
```

### 2. Configura le variabili d'ambiente

Copia il file di esempio e aggiorna con i tuoi valori:
```bash
cp .env.example .env.local
```

**File `.env.local`:**
```env
# Backend Configuration
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
NEXT_PUBLIC_BACKEND_API=http://127.0.0.1:8000/api

# Firebase (opzionale per PWA)
NEXT_PUBLIC_FIREBASE_PROJECT_ID=geotap-v2
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=geotap-v2.appspot.com

# Google Analytics 4 (disabilitato in development)
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# Environment
NEXT_PUBLIC_ENVIRONMENT=development
```

## 🎯 Development

### Avvia il server di sviluppo
```bash
npm run dev
```

La landing page sarà disponibile su: **http://localhost:3000**

### Verifica il collegamento al backend
- Accedi a http://localhost:3000
- Prova a inviare il contact form
- Verifica che i dati arrivino al backend Django

## 🏗️ Build per Production

### 1. Crea la build
```bash
npm run build
```

### 2. Test della build locale
```bash
npm start
```

### 3. Verifica il build
```bash
npm run type-check
npm run lint
```

## 🔒 Variabili d'Ambiente per Production

Per produzione, aggiorna queste variabili nel tuo hosting provider:

```env
NEXT_PUBLIC_BACKEND_URL=https://api.geotapp.com
NEXT_PUBLIC_BACKEND_API=https://api.geotapp.com/api
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENVIRONMENT=production
```

## 📁 Struttura Progetto

```
geotapp-marketing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout con SEO
│   │   ├── page.tsx            # Landing page principale
│   │   ├── error.tsx           # Error boundary
│   │   ├── not-found.tsx       # 404 page
│   │   ├── sitemap.ts          # SEO sitemap
│   │   ├── robots.ts           # robots.txt
│   │   └── globals.css         # CSS globale
│   ├── components/
│   │   ├── Navbar.tsx          # Barra di navigazione
│   │   ├── Footer.tsx          # Footer
│   │   └── ContactForm.tsx     # Form di contatto
│   ├── lib/
│   │   ├── api.ts              # API service layer
│   │   └── analytics.ts        # Google Analytics wrapper
│   └── ThemeRegistry.tsx       # Material-UI Theme provider
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── favicon.ico
│   └── images/                 # Immagini statiche
├── .env.example                # Variabili d'ambiente template
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

## 🔌 Integrazione Backend Django

### Endpoint API Richiesti

La landing page richiede i seguenti endpoint nel backend Django:

#### 1. Contact Form
```
POST /api/contact-message/
Body: {
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "phone": "string (optional)"
}
Response: {
  "success": true,
  "data": { "id": 1, "message": "Message sent" }
}
```

#### 2. Newsletter Subscription
```
POST /api/newsletter-subscribe/
Body: {
  "email": "string",
  "name": "string (optional)",
  "company": "string (optional)"
}
Response: {
  "success": true,
  "data": { "email": "user@example.com", "subscribed": true }
}
```

#### 3. Checkout URL (per i piani)
```
GET /api/checkout/?plan=pro
Response: Redirect a URL di Stripe Checkout
```

#### 4. Health Check
```
GET /api/health/
Response: { "status": "ok" }
```

## 📊 Analytics

La landing page traccia automaticamente:
- **Page Views**: Visualizzazioni di pagina
- **CTA Clicks**: Click su pulsanti d'azione
- **Form Submissions**: Invii di form
- **User Events**: Eventi personalizzati

Google Analytics è disabilitato di default in development. Per abilitarlo:
```env
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## 🔍 SEO

La landing page include:
- ✅ Meta tag ottimizzati (title, description, keywords)
- ✅ Open Graph tags (per social media preview)
- ✅ Twitter Card tags
- ✅ Canonical URL
- ✅ Sitemap automatica (`/sitemap.xml`)
- ✅ robots.txt ottimizzato
- ✅ Schema.org markup (implicito via Next.js)
- ✅ Mobile-first responsive design
- ✅ Fast load times (optimized images)

## 🛡️ Security

La landing page implementa:
- ✅ Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ CSRF protection (dal backend Django)
- ✅ Email validation lato client
- ✅ Input sanitization
- ✅ HTTPS in production
- ✅ Permissions policy (geolocation, microphone, camera disabled)

## 🚀 Deployment

### Vercel (Raccomandato)
1. Collega il repository a Vercel
2. Configura le variabili d'ambiente
3. Deploy automatico su ogni push

```bash
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

### Alternativ (Self-hosted)
1. Build: `npm run build`
2. Copia i file su server
3. Installa le dipendenze
4. Avvia con: `npm start`

## 📱 PWA Support

La landing page è una PWA completa con:
- ✅ Service worker integration
- ✅ Installabile su dispositivi mobile
- ✅ Funziona offline (parzialmente)
- ✅ App shortcuts
- ✅ Custom manifest

Per testare: Apri DevTools (F12) → Lighthouse → Run audit

## 🐛 Troubleshooting

### Contact form non funziona
- Verifica che il backend Django sia in esecuzione
- Controlla la variabile `NEXT_PUBLIC_BACKEND_API`
- Consulta la console del browser per errori

### Images not loading
- Assicurati che il percorso sia corretto (`/images/...`)
- Verifica che i file siano in `public/images/`

### Build fails
```bash
npm run type-check    # Verifica errori TypeScript
npm run lint          # Controlla errori linting
rm -rf .next          # Pulisci la cache
npm install           # Reinstalla dipendenze
npm run build         # Riprova il build
```

## 📝 Note Importanti

1. **Variabili d'ambiente**: Non commitare `.env.local` su Git
2. **Backend API**: La landing page richiede il backend Django per funzionare completamente
3. **CORS**: Configura CORS nel backend per permettere richieste da localhost:3000
4. **SSL/TLS**: In production, usa sempre HTTPS

## 📧 Support

Per problemi o domande:
- Email: info@geotapp.com
- Contatta il team dal form sulla landing page

---

**Versione**: 1.0.0  
**Ultima aggiornamento**: 2024  
**Mantainer**: GeoTapp Team