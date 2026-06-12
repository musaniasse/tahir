import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SegmentsService, Segment } from '../../services/segments.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent implements OnInit {

  // L'utilisateur colle un lien YouTube ici
  youtubeUrl = '';
  videoId    = '';
  segments: Segment[] = [];

  // Préférence skip activé/désactivé
  skipEnabled = true;

  // Message de statut
  message = '';

  constructor(private segmentsService: SegmentsService) {}

  ngOnInit() {
    // Charger la préférence sauvegardée
    const saved = localStorage.getItem('skipEnabled');
    if (saved !== null) this.skipEnabled = saved === 'true';
  }

  // Extrait l'ID YouTube depuis une URL
  extractVideoId(url: string): string {
    const match = url.match(/[?&]v=([^&#]+)/);
    return match ? match[1] : '';
  }

  // Quand l'utilisateur valide l'URL
  onLoadVideo() {
    this.videoId = this.extractVideoId(this.youtubeUrl);
    if (!this.videoId) {
      this.message = 'URL invalide. Exemple : https://youtube.com/watch?v=xxxxx';
      return;
    }

    this.message = 'Chargement des segments...';
    this.segmentsService.getSegments(this.videoId).subscribe({
      next: (segs) => {
        this.segments = segs;
        this.message = segs.length > 0
          ? `${segs.length} segment(s) de pub trouvé(s)`
          : 'Aucun segment connu pour cette vidéo';
      },
      error: () => {
        this.message = 'Erreur de connexion à l\'API';
      }
    });
  }

  // Quand l'utilisateur change le toggle
  onToggleChange() {
    localStorage.setItem('skipEnabled', String(this.skipEnabled));
  }
}