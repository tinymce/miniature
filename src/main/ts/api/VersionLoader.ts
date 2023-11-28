import { Pipeline, Step, TestLogs } from '@ephox/agar';
import { TinyLoader } from '@ephox/mcagar';

import * as Loader from '../loader/Loader';
import { readPlugins, registerPlugins, sRegisterPlugins } from '../loader/Plugins';
import * as TinyVersions from '../loader/Versions';

export type SuccessCallback = (v: any, logs: TestLogs) => void;
export type FailureCallback = (err: Error | string, logs: TestLogs) => void;
export type SetupCallback = (editor: any, success: SuccessCallback, failure: FailureCallback, logs?: TestLogs) => void;
export type SetupCallbackStep = <T, U>(editor: any) => Step<T, U>;

export type LoaderSetup = (callback: SetupCallback, settings: Record<string, any>, success: SuccessCallback, failure: FailureCallback) => void;

export const setupVersion = (
  version: string,
  testPlugins: string[],
  callback: SetupCallback,
  settings: Record<string, any>,
  success: SuccessCallback,
  failure: FailureCallback,
  logs: TestLogs = TestLogs.init()
): void => {
  const plugins = readPlugins(testPlugins);

  Pipeline.async({}, [
    TinyVersions.sWithVersion(version, Step.raw((_, next, die, initLogs) => {
      registerPlugins(plugins);
      TinyLoader.setup(
        (e, s, f) => callback(e, s, f, initLogs),
        settings,
        (v, nextLogs) => next(v, nextLogs || initLogs),
        (e, nextLogs) => die(e, nextLogs || initLogs));
    })),
    sRegisterPlugins(plugins)
  ], success, failure, logs);
};

export const sSetupVersion = <T, U>(version: string, testPlugins: string[], callback: SetupCallbackStep, settings: Record<string, any>): Step<T, U> =>
  Step.raw((_, next, die, initLogs) =>
    setupVersion(version, testPlugins, (editor, onSuccess, onError, logs) => {
      Pipeline.async({}, [ callback(editor) ], onSuccess, onError, logs);
    }, settings, next, die, initLogs)
  );

export const sWithVersion = TinyVersions.sWithVersion;

export const pLoadVersion = (version: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    Loader.load(version, resolve, reject);
  });
};
