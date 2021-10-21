import { ExampleScenePlugin } from './example-scene-plugin';

describe('Example Scene Plugin', () => {
  let game: Phaser.Game;
  let scene: Phaser.Scene;
  let plugin: ExampleScenePlugin;

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

  it('instantiates', () => {
    plugin = new ExampleScenePlugin(scene, game.plugins, 'test-scene-plugin');

    expect(plugin).toBeTruthy();
    expect(plugin instanceof ExampleScenePlugin).toBe(true);
  });
});
