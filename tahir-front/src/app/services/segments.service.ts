import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Segment {
  start: number;
  end: number;
  source: string;
}

@Injectable({ providedIn: 'root' })
export class SegmentsService {

  private apiUrl = 'http://localhost:3000/segments';

  constructor(private http: HttpClient) {}

  // Récupère les segments d'une vidéo YouTube
  getSegments(videoId: string): Observable<Segment[]> {
    return this.http.get<Segment[]>(`${this.apiUrl}/${videoId}`);
  }
}