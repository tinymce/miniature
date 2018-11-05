import { UnitTest, assert } from '@ephox/bedrock';
import { TinyVer } from '../../main/ts/api/Main';

UnitTest.test('TinyVerTest', () => {
  const assertgetVersion = (expected, tiny) => {
    assert.eq(expected, TinyVer.getVersion(tiny));
  };
  const fakeTiny = (majorVersion, minorVersion) => ({ majorVersion, minorVersion });
  const v = (major, minor, patch) => ({ major, minor, patch });

  assertgetVersion(v(1, 2, 3), fakeTiny('1', '2.3'));
  assertgetVersion(v(1, 2, 3), fakeTiny('1', '2.3.4.5.6'));

  assertgetVersion(v(0, 0, 0), fakeTiny('arne', 'bertil.tommy'));
});