import { GeneralSteps, Step } from '@ephox/agar';
import { load, loadFrom, unload } from './Loader';
import { PluginDetails, readAllPlugins, registerPlugins } from './Plugins';

const sUnload = Step.sync(unload);

const sLoad = (version: string) => {
  return GeneralSteps.sequence([
    sUnload,
    Step.async((next, die) => {
      load(version, next, die);
    })
  ]);
};

const sLoadFrom = (customUrl: string, baseUrl: string) => {
  return GeneralSteps.sequence([
    sUnload,
    Step.async((next, die) => {
      loadFrom(customUrl, baseUrl, next, die);
    })
  ]);
};

const sRegisterPlugins = (plugins: PluginDetails[]) => Step.sync(() => registerPlugins(plugins));

const sWithVersion = (version: string, step: Step<any, any>) => {
  const plugins = readAllPlugins();

  return GeneralSteps.sequence([
    sLoad(version),
    step,
    sLoad('latest'),
    sRegisterPlugins(plugins)
  ]);
};

export { sWithVersion, sLoad, sLoadFrom, sUnload };