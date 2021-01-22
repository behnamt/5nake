import { Scene } from 'three';
import Box from '../atoms/Box';

// TODO: read from json
const initialItemPos = [0, 5, 10, 15];

export default class Grid {
  public gridItems: Box[] = [];

  private gridItemList = [];

  constructor(scene: Scene) {
    for (let x = 0; x < initialItemPos.length; x += 1) {
      for (let y = 0; y < initialItemPos.length; y += 1) {
        for (let z = 0; z < initialItemPos.length; z += 1) {
          this.gridItemList.push({ x, y, z });
        }
      }
    }

    this.gridItemList.forEach(item => {
      const box = new Box(0.5);
      box.position.set(item.x, item.y, item.z);
      scene.add(box);
    });
  }
}
