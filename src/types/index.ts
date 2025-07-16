export interface Patient {
  id: number;
  name: string;
  image: string;
  entries: any[];
  metrics: any[];
}

export interface Entry {
  date: string;
  excerpt: string;
  imageUrl: string;
  audioUrl: string;
  metrics: Metrics;
}

export interface Metrics {
  wpm: number;
  pause: number;
  articulation: number;
  diversity: number;
  semantic: number;
  prosody: number;
  risk: number;
}

