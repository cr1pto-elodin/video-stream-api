import { Injectable } from "@nestjs/common";
import { IVideosService } from "./videos.service.interface";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VideosServiceImpl implements IVideosService {
    private videoPath: string = '';
    
    constructor(){
        this.videoPath = path.join(process.cwd(), 'videos');
    }

    getPartialStream(range: string) {
        const stat = fs.statSync(this.videoPath);
        const fileSize = stat.size;

        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
    
        const fileStream = fs.createReadStream(this.videoPath, { start, end });
    
        const headers = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };
    
        return {
          stream: fileStream,
          headers,
          status: 206,
        };
    }
}