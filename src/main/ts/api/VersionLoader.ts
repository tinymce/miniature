import { Pipeline, Step } from '@ephox/agar';
import { readPlugins, registerPlugins, sRegisterPlugins } from '../loader/Plugins';
import * as TinyVersions from '../loader/Versions';
import { TinyLoader } from '@ephox/mcagar';

export type SuccessCallback = (v: any, logs?) => void;
export type FailureCallback = (err: Error | string, logs?) => void;
export type SetupCallback = (editor, SuccessCallback, FailureCallback) => void;
export type SetupCallbackStep = <T, U>(editor) => Step<T, U>;

export type LoaderSetup = (callback: SetupCallback, settings: Record<string, any>, success: SuccessCallback, failure: FailureCallback) => void;

export const setupVersion = (version: string, testPlugins: string[], callback: SetupCallback, settings: Record<string, any>, success: SuccessCallback, failure: FailureCallback) => {
  const plugins = readPlugins(testPlugins);

  Pipeline.async({}, [
    TinyVersions.sWithVersion(version, Step.async((next, die) => {
      registerPlugins(plugins);
      TinyLoader.setup(callback, settings, next, die);
    })),
    sRegisterPlugins(plugins)
  ], success, failure);
};

export const sSetupVersion = <T, U>(version: string, testPlugins: string[], callback: SetupCallbackStep, settings: Record<string, any>) => {
  return Step.async((next, die) => {
    return setupVersion(version, testPlugins, (editor, onSuccess, onError) => {
      Pipeline.async({}, [ callback(editor) ], onSuccess, onError);
    }, settings, next, die);
  })
};