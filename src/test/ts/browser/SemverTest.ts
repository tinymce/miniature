import { UnitTest, assert } from '@ephox/bedrock-client';
import * as Semver from '../../../main/ts/ver/Semver';

UnitTest.test('SemverTest', () => {

  const assertSemverCompare = (expected: Semver.Comparison, input: Semver.Version, versionString: string) => {
    assert.eq(expected, Semver.compare(input, Semver.parse(versionString)));
  };

  // patch
  assertSemverCompare(Semver.Comparison.LT, Semver.nu(1, 1, 1), '1.1.2');
  assertSemverCompare(Semver.Comparison.EQ, Semver.nu(1, 1, 1), '1.1.1');
  assertSemverCompare(Semver.Comparison.GT, Semver.nu(1, 1, 1), '1.1.0');

  assertSemverCompare(Semver.Comparison.LT, Semver.nu(1, 1, 0), '1.1.1');
  assertSemverCompare(Semver.Comparison.GT, Semver.nu(1, 1, 2), '1.1.1');

  // minor
  assertSemverCompare(Semver.Comparison.LT, Semver.nu(1, 1, 1), '1.2.1');
  assertSemverCompare(Semver.Comparison.EQ, Semver.nu(1, 1, 1), '1.1.1');
  assertSemverCompare(Semver.Comparison.GT, Semver.nu(1, 1, 1), '1.0.1');

  assertSemverCompare(Semver.Comparison.LT, Semver.nu(1, 0, 1), '1.1.1');
  assertSemverCompare(Semver.Comparison.GT, Semver.nu(1, 2, 1), '1.1.1');

  // major
  assertSemverCompare(Semver.Comparison.LT, Semver.nu(1, 1, 1), '2.1.1');
  assertSemverCompare(Semver.Comparison.EQ, Semver.nu(1, 1, 1), '1.1.1');
  assertSemverCompare(Semver.Comparison.GT, Semver.nu(1, 1, 1), '0.1.1');

  assertSemverCompare(Semver.Comparison.LT, Semver.nu(0, 1, 1), '1.1.1');
  assertSemverCompare(Semver.Comparison.GT, Semver.nu(2, 1, 1), '1.1.1');

});