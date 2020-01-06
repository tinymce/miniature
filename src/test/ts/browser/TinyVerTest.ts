import { UnitTest, assert } from '@ephox/bedrock-client';
import { TinyVer } from '../../../main/ts/api/Main';
import { FakeTiny } from '../../../main/ts/alien/Types';

interface VersionBlock {
  major: number;
  minor: number;
  patch: number;
}

UnitTest.test('TinyVerTest', () => {
  const assertgetVersion = (expected: VersionBlock, tiny: FakeTiny) => {
    assert.eq(expected, TinyVer.getVersion(tiny));
  };
  const fakeTiny = (majorVersion: string, minorVersion: string): FakeTiny => ({ majorVersion, minorVersion, plugins: {} });
  const v = (major: number, minor: number, patch: number): VersionBlock => ({ major, minor, patch });

  assertgetVersion(v(1, 2, 3), fakeTiny('1', '2.3'));
  assertgetVersion(v(1, 2, 3), fakeTiny('1', '2.3.4.5.6'));

  assertgetVersion(v(0, 0, 0), fakeTiny('arne', 'bertil.tommy'));

  assert.eq(true, TinyVer.isLessThan(fakeTiny('4', '5.5'), '4.6.5'));
  assert.eq(true, TinyVer.isGreaterThan(fakeTiny('4', '5.5'), '4.4.5'));
  assert.eq(false, TinyVer.isGreaterThan(null as any, '4.5.5'));
  assert.eq(false, TinyVer.isLessThan(null as any, '4.5.5'));
});