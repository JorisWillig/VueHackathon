export interface TileConfig {
  id: string;
  width: number;
  height: number;
  xPos: number;
  yPos: number;
  
}

export default interface Tile {
  tileConfig: TileConfig,
  contentComponent: string;
  contentData: any;
}