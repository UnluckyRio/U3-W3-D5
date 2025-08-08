# Apple Music Clone - React Application

## 📖 Descrizione del Progetto

Questa applicazione è una replica dell'interfaccia di Apple Music sviluppata con React, TypeScript e Redux Toolkit. Il progetto implementa un'interfaccia utente moderna e responsive che replica fedelmente il design e le funzionalità principali di Apple Music.

## 🚀 Tecnologie Utilizzate

- **Frontend**: React 18 con TypeScript
- **Routing**: React Router DOM
- **State Management**: Redux Toolkit
- **UI Framework**: Bootstrap 5 + React Bootstrap
- **Build Tool**: Vite
- **API**: Deezer API tramite Strive School proxy
- **Styling**: CSS3 con variabili CSS personalizzate

## 🏗️ Architettura del Progetto

### Struttura delle Directory

```
src/
├── components/          # Componenti riutilizzabili
│   ├── Sidebar.tsx     # Menu laterale di navigazione
│   ├── MusicCard.tsx   # Card per visualizzare i brani
│   ├── MusicPlayer.tsx # Player musicale principale
│   └── SearchBar.tsx   # Barra di ricerca
├── pages/              # Pagine dell'applicazione
│   ├── Home.tsx        # Homepage con brani in evidenza
│   └── Novita.tsx      # Pagina delle novità musicali
├── store/              # Configurazione Redux
│   ├── index.ts        # Store principale
│   ├── musicSlice.ts   # Slice per la gestione della musica
│   └── playerSlice.ts  # Slice per il player musicale
├── services/           # Servizi API
│   └── deezerApi.ts    # Servizio per l'API Deezer
└── types/              # Definizioni TypeScript
    └── music.ts        # Tipi per i dati musicali
```

## 🎵 Funzionalità Implementate

### 1. **Interfaccia Utente**
- ✅ Layout responsive mobile-first
- ✅ Sidebar di navigazione con menu principale e sezioni aggiuntive
- ✅ Design fedele ad Apple Music con tema scuro
- ✅ Animazioni e transizioni fluide
- ✅ Supporto per diverse dimensioni di schermo

### 2. **Gestione della Musica**
- ✅ Ricerca di brani, artisti e album tramite API Deezer
- ✅ Visualizzazione di brani in evidenza
- ✅ Sezioni "Chill" e "MUSICA UNO" con contenuti curati
- ✅ Pagina "Novità" con le ultime uscite
- ✅ Card musicali con informazioni dettagliate (titolo, artista, durata, album)

### 3. **Player Musicale**
- ✅ Controlli di riproduzione (play/pause, volume)
- ✅ Barra di progresso interattiva
- ✅ Visualizzazione del brano corrente
- ✅ Gestione dello stato di riproduzione tramite Redux

### 4. **Sistema dei Preferiti**
- ✅ Aggiunta/rimozione brani dai preferiti
- ✅ Persistenza dello stato tramite Redux
- ✅ Indicatori visivi per i brani preferiti

### 5. **Ricerca Avanzata**
- ✅ Ricerca in tempo reale con debounce
- ✅ Gestione degli stati di caricamento e errore
- ✅ Risultati filtrati per brani, artisti e album
- ✅ Funzionalità di cancellazione ricerca

## 🎨 Decisioni di Design

### **Approccio Mobile-First**
L'applicazione è stata sviluppata seguendo un approccio mobile-first, garantendo un'esperienza ottimale su tutti i dispositivi:
- Breakpoint responsive: 480px, 768px, 992px, 1200px
- Layout flessibile con CSS Grid e Flexbox
- Componenti adattivi che si ridimensionano automaticamente

### **Sistema di Colori**
Utilizzo di variabili CSS per mantenere coerenza visiva:
```css
--primary-color: #ff3b30;     /* Rosso Apple Music */
--secondary-color: #ff6b47;   /* Rosso secondario */
--background-dark: #000000;   /* Sfondo principale */
--background-medium: #1a1a1a; /* Sfondo intermedio */
--background-light: #2a2a2a;  /* Sfondo chiaro */
```

### **Gestione dello Stato**
Implementazione di Redux Toolkit per una gestione efficiente dello stato:
- **musicSlice**: Gestisce i brani, preferiti e risultati di ricerca
- **playerSlice**: Controlla lo stato del player (brano corrente, riproduzione, volume)

### **Componenti Riutilizzabili**
Creazione di componenti modulari e riutilizzabili:
- `MusicCard`: Supporta diverse dimensioni (small, medium, large)
- `SearchBar`: Componente autonomo con logica di ricerca integrata
- `Sidebar`: Menu di navigazione responsive

## 🔧 Configurazione e Installazione

### Prerequisiti
- Node.js (versione 18 o superiore)
- npm o yarn

### Installazione
```bash
# Clona il repository
git clone [repository-url]

# Naviga nella directory del progetto
cd apple-music-clone

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

### Script Disponibili
```bash
npm run dev      # Avvia il server di sviluppo
npm run build    # Crea la build di produzione
npm run preview  # Anteprima della build di produzione
npm run lint     # Esegue il linting del codice
```

## 🌐 API Integration

### Deezer API
L'applicazione utilizza l'API di Deezer tramite il proxy di Strive School:
- **Endpoint**: `https://striveschool-api.herokuapp.com/api/deezer/search`
- **Parametri**: `q` (query di ricerca)
- **Esempio**: `https://striveschool-api.herokuapp.com/api/deezer/search?q=queen`

### Gestione degli Errori
- Implementazione di try-catch per tutte le chiamate API
- Messaggi di errore user-friendly
- Fallback per connessioni lente o non disponibili

## 📱 Responsive Design

### Breakpoint Implementati
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop Small**: 768px - 992px
- **Desktop Large**: > 992px

### Adattamenti per Dispositivo
- **Mobile**: Layout a colonna singola, menu collassabile
- **Tablet**: Layout a due colonne, sidebar ridotta
- **Desktop**: Layout completo con sidebar estesa

## 🎯 Funzionalità Future

### Possibili Miglioramenti
- [ ] Implementazione di playlist personalizzate
- [ ] Sistema di raccomandazioni basato sui preferiti
- [ ] Modalità offline con cache locale
- [ ] Integrazione con servizi di streaming reali
- [ ] Sistema di autenticazione utente
- [ ] Condivisione social dei brani
- [ ] Equalizzatore audio avanzato

## 🧪 Testing

### Strategie di Test Implementabili
- Unit testing per i componenti React
- Integration testing per le chiamate API
- E2E testing per i flussi utente principali
- Performance testing per ottimizzazioni

## 📊 Performance

### Ottimizzazioni Implementate
- Lazy loading per le immagini delle copertine
- Debounce per la ricerca (300ms)
- Memoizzazione dei componenti con React.memo
- Chunking automatico con Vite

## 🔒 Sicurezza

### Misure di Sicurezza
- Sanitizzazione degli input utente
- Validazione dei dati API
- Gestione sicura degli errori
- Prevenzione XSS attraverso React

## 👥 Contributi

Per contribuire al progetto:
1. Fork del repository
2. Creazione di un branch per la feature
3. Commit delle modifiche
4. Push del branch
5. Apertura di una Pull Request

## 📄 Licenza

Questo progetto è stato sviluppato per scopi educativi come parte del corso Epicode.

---

**Sviluppato con ❤️ utilizzando React, TypeScript e Redux Toolkit**
