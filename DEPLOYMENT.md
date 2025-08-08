# 🚀 Guida al Deployment su GitHub Pages

## Prerequisiti

1. **Repository GitHub**: Assicurati di avere un repository GitHub per questo progetto
2. **Git configurato**: Git deve essere installato e configurato sul tuo sistema
3. **Node.js**: Versione 18 o superiore

## 📋 Passi per il Deployment

### 1. Inizializza il Repository Git (se non già fatto)

```bash
# Inizializza git nella directory del progetto
git init

# Aggiungi tutti i file
git add .

# Fai il primo commit
git commit -m "Initial commit: Apple Music Clone"

# Aggiungi il repository remoto (sostituisci con il tuo URL)
git remote add origin https://github.com/TUO-USERNAME/U3-W3-D5.git

# Push del codice
git push -u origin main
```

### 2. Deploy su GitHub Pages

```bash
# Esegui il deployment (questo comando farà automaticamente la build)
npm run deploy
```

### 3. Configura GitHub Pages

1. Vai al tuo repository su GitHub
2. Clicca su **Settings** (Impostazioni)
3. Scorri fino alla sezione **Pages**
4. In **Source**, seleziona **Deploy from a branch**
5. Seleziona il branch **gh-pages**
6. Clicca **Save**

### 4. Accedi al Sito

Dopo alcuni minuti, il tuo sito sarà disponibile all'indirizzo:
```
https://TUO-USERNAME.github.io/U3-W3-D5
```

## 🔄 Aggiornamenti Futuri

Per aggiornare il sito dopo modifiche al codice:

```bash
# Fai le tue modifiche al codice
# Poi commit e push
git add .
git commit -m "Descrizione delle modifiche"
git push origin main

# Rideploy su GitHub Pages
npm run deploy
```

## ⚙️ Configurazioni Implementate

### Package.json
- ✅ **homepage**: Configurato per GitHub Pages
- ✅ **predeploy**: Script per build automatica
- ✅ **deploy**: Script per deployment con gh-pages

### Vite.config.ts
- ✅ **base**: Configurato per il path corretto su GitHub Pages

### Build di Produzione
- ✅ **Ottimizzazione**: Bundle minificato e ottimizzato
- ✅ **Assets**: Immagini e CSS ottimizzati
- ✅ **Compatibilità**: Build compatibile con GitHub Pages

## 🐛 Risoluzione Problemi

### Problema: Pagina bianca dopo il deployment
- **Soluzione**: Verifica che la configurazione `base` in `vite.config.ts` corrisponda al nome del repository

### Problema: Assets non caricati
- **Soluzione**: Assicurati che tutti i path delle immagini siano relativi e non assoluti

### Problema: Routing non funziona
- **Soluzione**: GitHub Pages non supporta il routing lato client. Considera l'uso di hash routing o configura un file `404.html`

## 📊 Metriche di Performance

### Build Size
- **CSS**: ~264 KB (37 KB gzipped)
- **JavaScript**: ~277 KB (90 KB gzipped)
- **Assets**: ~717 KB (immagini)
- **Total**: ~1.3 MB

### Ottimizzazioni Applicate
- ✅ Tree shaking automatico
- ✅ Minificazione CSS e JS
- ✅ Compressione gzip
- ✅ Code splitting

---

**Nota**: Questo progetto è configurato per il deployment automatico su GitHub Pages. Ogni volta che esegui `npm run deploy`, viene creata automaticamente una nuova build e caricata sul branch `gh-pages`.