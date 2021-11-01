import { ExampleGameObject } from '../gameobjects/example-gameobject';

import { ExampleScenePlugin } from './example-scene-plugin';

describe('Example Scene Plugin', () => {
  let game: Phaser.Game;
  let scene: Phaser.Scene;
  let plugin: ExampleScenePlugin;

  // Squelch console.log output.
  jest.spyOn(console, 'log').mockImplementation(() => undefined);
  // Running game calls window.focus method.
  jest.spyOn(window, 'focus').mockImplementation(() => undefined);

  afterAll(() => {
    game.destroy(true, true);
    game['runDestroy']();
    delete global.Phaser;
  });

  describe('standalone', () => {
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

    it('instantiates', () => {
      plugin = new ExampleScenePlugin(scene, game.plugins, 'test-scene-plugin');

      expect(plugin).toBeTruthy();
      expect(plugin instanceof ExampleScenePlugin).toBe(true);
    });

    it('calculates the GCD of two integers', () => {
      plugin = new ExampleScenePlugin(scene, game.plugins, 'test-scene-plugin');

      const a = 1071;
      const b = 462;
      const expected = 21;

      expect(plugin.gcd(a, b)).toEqual(expected);
      expect(plugin.gcd(b, a)).toEqual(expected);
    });
  });

  describe('via game config', () => {
    class BaseScene extends Phaser.Scene {}
    class Scene extends ExampleScenePlugin.SceneMixin('example', BaseScene) {}

    let scene: Scene;

    beforeAll((done) => {
      game = new Phaser.Game({
        type: Phaser.HEADLESS,
        scene: {
          init: function () {
            scene = this as Scene;
            done();
          }
        },
        plugins: {
          scene: [{ key: 'ExampleScenePlugin', plugin: ExampleScenePlugin, mapping: 'example', start: true }]
        },
        callbacks: {
          postBoot: () => game.loop.stop()
        }
      });

      // TODO: Test env issue: Pretend that built-in textures were loaded...
      game.textures.emit(Phaser.Textures.Events.READY);
    });

    it('maps to a scene', () => {
      expect(scene.example).toBeTruthy();
      expect(scene.example instanceof ExampleScenePlugin).toEqual(true);
    });

    it("maps a game object to a scene's game object factory", () => {
      expect(scene.add.example2).toBeTruthy();
      expect(typeof scene.add.example2).toEqual('function');
    });

    it("adds a mapped game object via the scene's game object factory", () => {
      const gameObject = scene.add.example2(123, 234, {});

      expect(gameObject).toBeTruthy();
      expect(gameObject instanceof ExampleGameObject).toEqual(true);
    });

    it("maps a game object to a scene's game object creator", () => {
      expect(scene.make.example2).toBeTruthy();
      expect(typeof scene.make.example2).toEqual('function');
    });

    it("makes a mapped game object via the scene's game object creator", () => {
      let gameObject: ExampleGameObject;

      [undefined, {}, { padding: {} }].forEach((config) => {
        gameObject = scene.make.example2(config);

        expect(gameObject).toBeTruthy();
        expect(gameObject instanceof ExampleGameObject).toEqual(true);
      });

      gameObject = scene.make.example2({}, true);

      expect(gameObject).toBeTruthy();
      expect(gameObject instanceof ExampleGameObject).toEqual(true);
    });

    it('calculates the GCD of two integers via scene mapping', () => {
      const a = 1071;
      const b = 462;
      const expected = 21;

      expect(scene.example.gcd(a, b)).toEqual(expected);
      expect(scene.example.gcd(b, a)).toEqual(expected);
    });
  });
});
