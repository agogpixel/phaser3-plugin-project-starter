export class ExampleGameObject extends Phaser.GameObjects.Text {
  public constructor(scene: Phaser.Scene, x: number, y: number, style: Phaser.Types.GameObjects.Text.TextStyle) {
    super(scene, x, y, 'Hello World!', style);
  }
}
