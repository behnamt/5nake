import { Mesh, BoxBufferGeometry, MeshStandardMaterial } from 'three';

export default class Box extends Mesh {
  constructor(width = 1) {
    super(
      new BoxBufferGeometry(width, width, width),
      new MeshStandardMaterial({
        color: 0xff0000,
      }),
    );
  }
}
