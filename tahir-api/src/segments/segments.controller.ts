import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { SegmentsService } from './segments.service';
import { Segment } from './segment.interface';

@Controller('segments')
export class SegmentsController {
  constructor(private readonly segmentsService: SegmentsService) {}

  // GET http://localhost:3000/segments/VIDEO_ID

  // Retourne les segments de pub pour une vidéo
  @Get(':videoId')
  getSegments(@Param('videoId') videoId: string): Segment[] {
    return this.segmentsService.getSegments(videoId);
  }

  // POST http://localhost:3000/segments/VIDEO_ID
  // Ajoute des segments manuellement (pour les tests)
  @Post(':videoId')
  addSegments(
    @Param('videoId') videoId: string,
    @Body() body: { segments: Segment[] },
  ): Segment[] {
    return this.segmentsService.addSegments(videoId, body.segments);
  }
}
