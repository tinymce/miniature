import { Option, Obj, Arr } from '@ephox/katamari';
import { Step } from '@ephox/agar';
import { getTinymce } from './Globals';
import { FakeTiny } from '../alien/Types';

export interface PluginDetails {
  name: string;
  instance: <T>(editor: FakeTiny, url: string) => T;
  url: Option<string>;
}

const readAllPlugins = (): PluginDetails[] => {
  return getTinymce().map((tinymce) => {
    return Obj.mapToArray(tinymce.PluginManager.lookup, (plugin, name) => {
      return {
        name,
        instance: plugin.instance,
        url: Obj.get(tinymce.PluginManager.urls, name)
      };
    });
  }).getOr([]);
};

const readPlugins = (pluginNames: string[]): PluginDetails[] => {
  return Arr.filter(readAllPlugins(), (plugin) => Arr.contains(pluginNames, plugin.name));
};

const registerPlugins = (plugins: PluginDetails[]) => {
  getTinymce().each((tinymce) => {
    Arr.each(plugins, (plugin) => {
      plugin.url.each((url) => tinymce.PluginManager.urls[plugin.name] = url);
      tinymce.PluginManager.add(plugin.name, plugin.instance);
    });
  });
};

const sRegisterPlugins = (plugins: PluginDetails[]) => Step.sync(() => registerPlugins(plugins));

export {
  readAllPlugins,
  readPlugins,
  registerPlugins,
  sRegisterPlugins
};
