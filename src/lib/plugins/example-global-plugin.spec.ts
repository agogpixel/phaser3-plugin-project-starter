import { ExampleGlobalPlugin } from './example-global-plugin';

describe('Example Global Plugin', () => {
  let game: Phaser.Game;
  let plugin: ExampleGlobalPlugin;

  // Squelch console.log output.
  jest.spyOn(console, 'log').mockImplementation(() => undefined);
  // Running game calls window.focus method.
  jest.spyOn(window, 'focus').mockImplementation(() => undefined);

  beforeAll(() => {
    game = new Phaser.Game({
      type: Phaser.HEADLESS,
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
    plugin = new ExampleGlobalPlugin(game.plugins);

    expect(plugin).toBeTruthy();
    expect(plugin instanceof ExampleGlobalPlugin).toBe(true);
  });
});
