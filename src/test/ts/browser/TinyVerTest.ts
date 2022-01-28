import { Assert, UnitTest } from '@ephox/bedrock-client';

import { FakeTiny } from 'tinymce/miniature/alien/Types';
import * as TinyVer from 'tinymce/miniature/api/TinyVer';

interface VersionBlock {
  major: number;
  minor: number;
  patch: number;
}

UnitTest.test('TinyVerTest', () => {
  const assertgetVersion = (expected: VersionBlock, tiny: FakeTiny) => {
    Assert.eq('', expected, TinyVer.getVersion(tiny));
  };
  const fakeTiny = (majorVersion: string, minorVersion: string): FakeTiny => ({ majorVersion, minorVersion });
  const v = (major: number, minor: number, patch: number): VersionBlock => ({ major, minor, patch });

  assertgetVersion(v(1, 2, 3), fakeTiny('1', '2.3'));
  assertgetVersion(v(1, 2, 3), fakeTiny('1', '2.3.4.5.6'));

  assertgetVersion(v(0, 0, 0), fakeTiny('arne', 'bertil.tommy'));

  Assert.eq('', true, TinyVer.isLessThan(fakeTiny('4', '5.5'), '4.6.5'));
  Assert.eq('', true, TinyVer.isGreaterThan(fakeTiny('4', '5.5'), '4.4.5'));
  Assert.eq('', false, TinyVer.isGreaterThan(undefined, '4.5.5'));
  Assert.eq('', false, TinyVer.isLessThan(undefined, '4.5.5'));
});
