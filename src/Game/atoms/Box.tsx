import { Mesh, BoxBufferGeometry, MeshStandardMaterial } from 'three';

export default class Box extends Mesh {
  constructor() {
    super(
      new BoxBufferGeometry(1.0, 1.0, 1.0),
      new MeshStandardMaterial({
        color: 0xff0000,
      }),
    );
  }
}
