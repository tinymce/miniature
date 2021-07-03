import { after, afterEach, before } from '@ephox/bedrock-client';
import { Arr, Obj, Optional } from '@ephox/katamari';
import { TinyHooks } from '@ephox/mcagar';
import { SugarElement } from '@ephox/sugar';

import { load } from '../loader/Loader';
import { PluginDetails, readPlugins, registerPlugins } from '../loader/Plugins';

export interface Hook<T> {
  readonly editor: () => T;
}

export interface ShadowRootHook<T> extends Hook<T> {
  readonly shadowRoot: () => SugarElement<ShadowRoot>;
}

const setupVersion = <T, H extends Hook<T>>(
  version: string,
  setupModules: Record<string, Array<() => void>>,
  setupHook: (setupPluginModules: Array<() => void>) => H
): H => {
  let hasFailure = false;
  let plugins: Optional<PluginDetails[]> = Optional.none();
  const pluginNames = Obj.keys(setupModules);
  const modules = Arr.flatten(Obj.values(setupModules));

  before(function (done) {
    // Increase the default timeout to ensure we have time to load
    this.timeout(4000);
    // Store the original plugins
    plugins = Optional.some(readPlugins(pluginNames));
    // load the new version and restore the loaded plugins
    load(version, () => {
      plugins.each(registerPlugins);
      done();
    }, done);
  });

  const hook = setupHook(modules);

  afterEach(function () {
    if (this.currentTest?.isFailed() === true) {
      hasFailure = true;
    }
  });

  after(function (done) {
    // Increase the default timeout to ensure we have time to load
    this.timeout(4000);
    if (hasFailure) {
      done();
    } else {
      // load the latest version back into scope
      load('latest', () => {
        // Restore the original plugins
        plugins.each(registerPlugins);
        plugins = Optional.none();
        done();
      }, done);
    }
  });

  return hook;
};

const bddSetupVersion = <T = any>(
  version: string,
  settings: Record<string, any>,
  setupModules: Record<string, Array<() => void>> = {},
  focusOnInit: boolean = false
): Hook<T> => {
  return setupVersion(version, setupModules, (modules) => {
    return TinyHooks.bddSetup<any>(settings, modules, focusOnInit);
  });
};

const bddSetupVersionLight = <T = any>(
  version: string,
  settings: Record<string, any>,
  setupModules: Record<string, Array<() => void>> = {},
  focusOnInit: boolean = false
): Hook<T> => {
  return setupVersion(version, setupModules, (modules) => {
    return TinyHooks.bddSetupLight<any>(settings, modules, focusOnInit);
  });
};

const bddSetupVersionFromElement = <T = any>(
  version: string,
  settings: Record<string, any>,
  setupElement: () => TinyHooks.SetupElement,
  setupModules: Record<string, Array<() => void>> = {},
  focusOnInit: boolean = false
): Hook<T> => {
  return setupVersion(version, setupModules, (modules) => {
    return TinyHooks.bddSetupFromElement<any>(settings, setupElement, modules, focusOnInit);
  });
};

const bddSetupVersionInShadowRoot = <T = any>(
  version: string,
  settings: Record<string, any>,
  setupModules: Record<string, Array<() => void>> = {},
  focusOnInit: boolean = false
): ShadowRootHook<T> => {
  return setupVersion(version, setupModules, (modules) => {
    return TinyHooks.bddSetupInShadowRoot<any>(settings, modules, focusOnInit);
  });
};

export {
  bddSetupVersion,
  bddSetupVersionLight,
  bddSetupVersionFromElement,
  bddSetupVersionInShadowRoot
};