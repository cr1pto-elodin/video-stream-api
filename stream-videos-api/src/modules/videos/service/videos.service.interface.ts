export const VIDEOS_SERVICE = 'VIDEOS_SERVICE';

export interface IVideosService {
    getPartialStream(range: string);
}