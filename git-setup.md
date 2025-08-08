# 🔧 Setup Git e GitHub per il Deployment

## 📋 Checklist Pre-Deployment

### 1. Verifica Configurazione Git
```bash
# Verifica che Git sia installato
git --version

# Configura il tuo nome e email (se non già fatto)
git config --global user.name "Il Tuo Nome"
git config --global user.email "tua-email@example.com"
```

### 2. Crea Repository su GitHub
1. Vai su [GitHub.com](https://github.com)
2. Clicca su **"New repository"**
3. Nome repository: `U3-W3-D5`
4. Descrizione: `Apple Music Clone - React TypeScript Application`
5. Seleziona **Public** (necessario per GitHub Pages gratuito)
6. **NON** inizializzare con README (abbiamo già i nostri file)
7. Clicca **"Create repository"**

### 3. Inizializza Repository Locale
```bash
# Naviga nella directory del progetto
cd C:\Users\Valerio\Desktop\Programmazione\EPICODE\Esercizi\U3-W3-D5

# Inizializza Git (se non già fatto)
git init

# Aggiungi tutti i file
git add .

# Primo commit
git commit -m "🎵 Initial commit: Apple Music Clone

- Implementata interfaccia responsive mobile-first
- Integrazione API Deezer per ricerca musicale
- Player musicale con controlli completi
- Sistema preferiti con Redux Toolkit
- Configurazione deployment GitHub Pages
- Codice ottimizzato senza commenti
- Build di produzione pronta"
```

### 4. Collega Repository Remoto
```bash
# Sostituisci 'TUO-USERNAME' con il tuo username GitHub
git remote add origin https://github.com/TUO-USERNAME/U3-W3-D5.git

# Verifica il remote
git remote -v

# Push iniziale
git branch -M main
git push -u origin main
```

### 5. Deploy su GitHub Pages
```bash
# Esegui il deployment
npm run deploy
```

## 🔍 Verifica Deployment

### Controlla lo Status
1. Vai al tuo repository su GitHub
2. Clicca su **"Settings"**
3. Scorri fino a **"Pages"**
4. Dovresti vedere: **"Your site is published at https://TUO-USERNAME.github.io/U3-W3-D5"**

### Test del Sito
- Attendi 2-5 minuti per la propagazione
- Visita l'URL del tuo sito
- Testa le funzionalità principali:
  - ✅ Caricamento homepage
  - ✅ Ricerca musicale
  - ✅ Player musicale
  - ✅ Sistema preferiti
  - ✅ Responsività mobile

## 🚨 Risoluzione Problemi Comuni

### Errore: "Repository not found"
```bash
# Verifica l'URL del repository
git remote get-url origin

# Se sbagliato, correggi:
git remote set-url origin https://github.com/TUO-USERNAME/U3-W3-D5.git
```

### Errore: "Permission denied"
- Assicurati di essere autenticato su GitHub
- Usa GitHub CLI o configura SSH keys
- Oppure usa HTTPS con token di accesso personale

### Pagina 404 su GitHub Pages
- Verifica che il repository sia pubblico
- Controlla che GitHub Pages sia abilitato
- Aspetta alcuni minuti per la propagazione

### Assets non caricati
- Verifica la configurazione `base` in `vite.config.ts`
- Assicurati che corrisponda al nome del repository

## 📊 Monitoraggio

### GitHub Actions (Automatico)
GitHub Pages usa automaticamente GitHub Actions per il build e deploy. Puoi monitorare:
1. Vai su **"Actions"** nel tuo repository
2. Controlla lo status dei deployment
3. Visualizza i log in caso di errori

### Analytics (Opzionale)
Per monitorare il traffico:
1. Aggiungi Google Analytics
2. Usa GitHub Insights per statistiche repository
3. Monitora le performance con Lighthouse

---

**🎯 Obiettivo**: Avere il progetto Apple Music Clone live su GitHub Pages con URL pubblico accessibile.

**⏱️ Tempo stimato**: 10-15 minuti per il setup completo.