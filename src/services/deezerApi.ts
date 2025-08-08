import { Track } from '../store/favoritesSlice';

// URL base dell'API Deezer
const BASE_URL = 'https://striveschool-api.herokuapp.com/api/deezer';

// Interfaccia per la risposta dell'API
interface DeezerResponse {
  data: Track[];
  total: number;
  next?: string;
}

// Servizio per le chiamate API
export class DeezerApiService {
  // Cerca brani per query
  static async searchTracks(query: string): Promise<Track[]> {
    try {
      const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      
      const data: DeezerResponse = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Errore nella ricerca:', error);
      throw error;
    }
  }

  // Ottiene i brani più popolari di un artista
  static async getArtistTopTracks(artistId: number): Promise<Track[]> {
    try {
      const response = await fetch(`${BASE_URL}/artist/${artistId}/top?limit=50`);
      
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      
      const data: DeezerResponse = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Errore nel recupero dei brani dell\'artista:', error);
      throw error;
    }
  }

  // Ottiene brani casuali per genere (simulato con ricerche predefinite)
  static async getRandomTracksByGenre(genre: string): Promise<Track[]> {
    const genres = {
      pop: ['taylor swift', 'ed sheeran', 'ariana grande', 'dua lipa', 'billie eilish', 'olivia rodrigo', 'harry styles', 'bruno mars'],
      rock: ['queen', 'the beatles', 'led zeppelin', 'coldplay', 'imagine dragons', 'maroon 5', 'onerepublic', 'linkin park'],
      jazz: ['miles davis', 'john coltrane', 'ella fitzgerald', 'frank sinatra', 'louis armstrong', 'duke ellington'],
      electronic: ['daft punk', 'calvin harris', 'deadmau5', 'david guetta', 'martin garrix', 'the chainsmokers', 'marshmello', 'skrillex'],
      hip_hop: ['eminem', 'drake', 'kendrick lamar', 'post malone', 'travis scott', 'j cole', 'kanye west', 'lil wayne'],
      r_and_b: ['beyonce', 'rihanna', 'the weeknd', 'sza', 'frank ocean', 'alicia keys', 'john legend', 'usher'],
      latin: ['bad bunny', 'j balvin', 'ozuna', 'maluma', 'daddy yankee', 'karol g', 'rosalia', 'shakira']
    };

    const artists = genres[genre as keyof typeof genres] || genres.pop;
    const randomArtist = artists[Math.floor(Math.random() * artists.length)];
    
    return this.searchTracks(randomArtist);
  }
}