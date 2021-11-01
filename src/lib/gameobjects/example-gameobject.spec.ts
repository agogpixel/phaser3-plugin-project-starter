import { ExampleGameObject } from './example-gameobject';

describe('Example Global Plugin', () => {
  let game: Phaser.Game;
  let scene: Phaser.Scene;
  let gameObject: ExampleGameObject;

  // Squelch console.log output.
  jest.spyOn(console, 'log').mockImplementation(() => undefined);
  // Running game calls window.focus method.
  jest.spyOn(window, 'focus').mockImplementation(() => undefined);

  beforeAll((done) => {
    game = new Phaser.Game({
      type: Phaser.HEADLESS,
      scene: {
        init: function () {
          scene = this;
          done();
        }
      },
      callbacks: {
        postBoot: () => game.loop.stop()
      }
    });

    // TODO: Test env issue: Pretend that built-in textures were loaded...
    game.textures.emit(Phaser.Textures.Events.READY);
  });

  afterAll(() => {
    game.destroy(true, true);
    game['runDestroy']();
    delete global.Phaser;
  });

  it('instantiates with value', () => {
    gameObject = new ExampleGameObject(scene, 312, 224, {
      fontFamily: 'Arial',
      fontSize: '64px',
      color: '#00ff00'
    });

    expect(gameObject).toBeTruthy();
    expect(gameObject instanceof ExampleGameObject).toBe(true);
    expect(gameObject.text).toEqual('Hello World!');
  });
});
