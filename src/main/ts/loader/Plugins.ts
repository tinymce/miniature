import { Step } from '@ephox/agar';
import { Arr, Obj, Optional } from '@ephox/katamari';

import { FakeTiny } from '../alien/Types';
import { getTinymce } from './Globals';

export interface PluginDetails {
  name: string;
  instance: <T>(editor: FakeTiny, url: string) => T;
  url: Optional<string>;
}

const readAllPlugins = (): PluginDetails[] =>
  getTinymce().map((tinymce) =>
    Obj.mapToArray(tinymce.PluginManager.lookup, (plugin, name) => ({
      name,
      instance: plugin.instance,
      url: Obj.get(tinymce.PluginManager.urls, name)
    }))
  ).getOr([]);

const readPlugins = (pluginNames: string[]): PluginDetails[] =>
  Arr.filter(readAllPlugins(), (plugin) => Arr.contains(pluginNames, plugin.name));

const registerPlugins = (plugins: PluginDetails[]): void => {
  getTinymce().each((tinymce) => {
    Arr.each(plugins, (plugin) => {
      plugin.url.each((url) => tinymce.PluginManager.urls[plugin.name] = url);
      tinymce.PluginManager.add(plugin.name, plugin.instance);
    });
  });
};

const sRegisterPlugins = (plugins: PluginDetails[]): Step<unknown, unknown> =>
  Step.sync(() => registerPlugins(plugins));

export {
  readAllPlugins,
  readPlugins,
  registerPlugins,
  sRegisterPlugins
};
