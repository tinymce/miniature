import { Assertions, GeneralSteps, Pipeline } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock-client';
import 'tinymce';

import { FakeTiny } from 'tinymce/miniature/alien/Types';
import * as VersionLoader from 'tinymce/miniature/api/VersionLoader';

import { sAssertVersion } from '../module/AssertVersion';

declare const tinymce: any;

tinymce.PluginManager.urls.test = '/project/dist/test';
tinymce.PluginManager.add('test', (editor: FakeTiny, url: string) => ({ url }));

const sTestVersion = (loadVersion: string, expectedMajor: number, expectedMinor: number) =>
  VersionLoader.sSetupVersion(loadVersion, [ 'test' ], (editor) => GeneralSteps.sequence([
    sAssertVersion(expectedMajor, expectedMinor),
    Assertions.sAssertEq('Should be the expected url', '/project/dist/test', editor.plugins.test.url)
  ]), {
    plugins: [ 'test', 'code' ]
  });

UnitTest.asynctest('TinyLoaderVersionTest', (success, failure) => {
  Pipeline.async({}, [
    sTestVersion('4.5.x', 4, 5),
    sTestVersion('4.8.x', 4, 8),
    sTestVersion('5.0.x', 5, 0)
  ], () => success(), failure);
});
