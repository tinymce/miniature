import { Assertions, GeneralSteps, Pipeline } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock-client';
import 'tinymce';

import { FakeTiny } from 'tinymce/miniature/alien/Types';
import * as VersionLoader from 'tinymce/miniature/api/VersionLoader';

import { sAssertVersion } from '../module/AssertVersion';

declare const tinymce: any;

tinymce.PluginManager.urls.test = '/project/dist/test';
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
tinymce.PluginManager.add('test', function (editor: FakeTiny, url: string) {
  return { url };
});

const sTestVersion = (loadVersion: string, expectedMajor: number, expectedMinor: number) =>
  VersionLoader.sSetupVersion(loadVersion, [ 'test' ], (editor) => GeneralSteps.sequence([
    sAssertVersion(expectedMajor, expectedMinor),
    Assertions.sAssertEq('Should be the expected url', '/project/dist/test', editor.plugins.test.url)
  ]), {
    plugins: [ 'test', 'code' ]
  });

UnitTest.asynctest('TinyLoaderVersionTest', (success, failure) => {
  Pipeline.async({}, [
    sTestVersion('5.0.x', 5, 0),
    sTestVersion('6.0.x', 6, 0)
  ], success, failure);
});
