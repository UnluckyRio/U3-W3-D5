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
      pop: ['taylor swift', 'ed sheeran', 'ariana grande'],
      rock: ['queen', 'the beatles', 'led zeppelin'],
      jazz: ['miles davis', 'john coltrane', 'ella fitzgerald'],
      electronic: ['daft punk', 'calvin harris', 'deadmau5'],
      hip_hop: ['eminem', 'drake', 'kendrick lamar']
    };

    const artists = genres[genre as keyof typeof genres] || genres.pop;
    const randomArtist = artists[Math.floor(Math.random() * artists.length)];
    
    return this.searchTracks(randomArtist);
  }
}