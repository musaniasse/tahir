import { Injectable } from '@nestjs/common';
import { Segment } from './segment.interface';

@Injectable()
export class SegmentsService {
  private store: Map<string, Segment[]> = new Map();

  getSegments(videoId: string): Segment[] {
    return this.store.get(videoId) || [];
  }

  addSegments(videoId: string, segments: Segment[]): Segment[] {
    const existing = this.store.get(videoId) || [];
    const merged = this.mergeAndSort([...existing, ...segments]);
    this.store.set(videoId, merged);
    return merged;
  }

  private mergeAndSort(segments: Segment[]): Segment[] {
    if (segments.length === 0) return [];

    const sorted = segments.sort((a, b) => a.start - b.start);
    const merged: Segment[] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const last = merged[merged.length - 1];
      const curr = sorted[i];
      if (curr.start <= last.end + 1) {
        last.end = Math.max(last.end, curr.end);
      } else {
        merged.push(curr);
      }
    }
    return merged;
  }
}
