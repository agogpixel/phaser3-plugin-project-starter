import { createPluginApiMixin } from '@agogpixel/phaser3-ts-utils/mixins/scene/create-plugin-api-mixin';

import { ExampleGameObject } from '../gameobjects/example-gameobject';

export class ExampleGlobalPlugin extends Phaser.Plugins.BasePlugin {
  public static readonly exampleGameObjectKey = 'example';

  public static readonly SceneMixin = createPluginApiMixin<
    ExampleGlobalPlugin,
    'gcd',
    { [ExampleGlobalPlugin.exampleGameObjectKey]: typeof ExampleGlobalPlugin.exampleGameObjectFactory },
    { [ExampleGlobalPlugin.exampleGameObjectKey]: typeof ExampleGlobalPlugin.exampleGameObjectCreator }
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

  public constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    pluginManager.registerGameObject(
      ExampleGlobalPlugin.exampleGameObjectKey,
      ExampleGlobalPlugin.exampleGameObjectFactory,
      ExampleGlobalPlugin.exampleGameObjectCreator
    );
  }

  public gcd(a: number, b: number): number {
    return !b ? Math.max(a, -a) : this.gcd(b, a % b);
  }
}
