import { Assertions } from '@ephox/agar';
import { before, context, describe, it } from '@ephox/bedrock-client';
import { Arr } from '@ephox/katamari';
import 'tinymce';

import { FakeTiny } from 'tinymce/miniature/alien/Types';
import * as VersionHooks from 'tinymce/miniature/api/VersionHooks';

import { assertVersion } from '../module/AssertVersion';

declare const tinymce: any;

const TestPlugin = () => {
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  tinymce.PluginManager.add('test', function (editor: FakeTiny, url: string) {
    return { url };
  });
};

describe('VersionHooksTest', () => {
  before(() => {
    tinymce.PluginManager.urls.test = '/project/dist/test';
    TestPlugin();
  });

  Arr.each([
    { loadVersion: '5.0.x', major: 5, minor: 0 },
    { loadVersion: '6.0.x', major: 6, minor: 0 },
  ], (spec) => {
    context(`Test loading ${spec.loadVersion}`, () => {
      const hook = VersionHooks.bddSetupVersion(spec.loadVersion, {
        plugins: [ 'test', 'code' ]
      }, {
        test: [ TestPlugin ]
      });

      it('should match correct version', () => {
        assertVersion(spec.major, spec.minor);
      });

      it('should have the correct plugin url', () => {
        const editor = hook.editor();
        Assertions.assertEq('Should be the expected url', '/project/dist/test', editor.plugins.test.url);
      });
    });
  });
});
