import { createPluginApiMixin } from '@agogpixel/phaser3-ts-utils/mixins/scene/create-plugin-api-mixin';

import { ExampleGameObject } from '../gameobjects/example-gameobject';

export class ExampleScenePlugin extends Phaser.Plugins.ScenePlugin {
  public static readonly exampleGameObjectKey = 'example2';

  public static readonly SceneMixin = createPluginApiMixin<
    ExampleScenePlugin,
    'gcd',
    { [ExampleScenePlugin.exampleGameObjectKey]: typeof ExampleScenePlugin.exampleGameObjectFactory },
    { [ExampleScenePlugin.exampleGameObjectKey]: typeof ExampleScenePlugin.exampleGameObjectCreator }
  >();

  protected static exampleGameObjectFactory(x: number, y: number, style: Phaser.Types.GameObjects.Text.TextStyle) {
    const self = this as unknown as Phaser.GameObjects.GameObjectFactory;
    return self['displayList'].add(new ExampleGameObject(self['scene'], x, y, style)) as ExampleGameObject;
  }

  protected static exampleGameObjectCreator(
    config: Phaser.Types.GameObjects.GameObjectConfig & {
      style?: Phaser.Types.GameObjects.Text.TextStyle;
      padding?: Phaser.Types.GameObjects.Text.TextPadding;
    } = {},
    addToScene?: boolean
  ) {
    const self = this as unknown as Phaser.GameObjects.GameObjectCreator;
    const get = Phaser.Utils.Objects.GetAdvancedValue;

    const style: Phaser.Types.GameObjects.Text.TextStyle = get(config, 'style', {});

    const padding: Phaser.Types.GameObjects.Text.TextPadding = get(config, 'padding', null);

    if (padding !== null) {
      style.padding = padding;
    }

    const gameObject = new ExampleGameObject(self['scene'], 0, 0, style);

    if (addToScene !== undefined) {
      config.add = addToScene;
    }

    Phaser.GameObjects.BuildGameObject(self['scene'], gameObject, config);

    gameObject.autoRound = get(config, 'autoRound', true);
    gameObject['resolution'] = get(config, 'resolution', 1);

    return gameObject;
  }

  public constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager, pluginKey: string) {
    super(scene, pluginManager, pluginKey);

    pluginManager.registerGameObject(
      ExampleScenePlugin.exampleGameObjectKey,
      ExampleScenePlugin.exampleGameObjectFactory,
      ExampleScenePlugin.exampleGameObjectCreator
    );
  }

  public gcd(a: number, b: number): number {
    return !b ? Math.max(a, -a) : this.gcd(b, a % b);
  }
}
