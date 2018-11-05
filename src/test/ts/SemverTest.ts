import { UnitTest, assert } from '@ephox/bedrock';
import * as SemVer from '../../main/ts/core/SemVer';

UnitTest.test('SemverTest', () => {

  const assertSemverCompare = (expected: SemVer.Comparison, input: SemVer.Version, versionString: string) => {
    assert.eq(expected, SemVer.compare(input, SemVer.parse(versionString)));
  };

  // patch
  assertSemverCompare(SemVer.Comparison.LT, SemVer.nu(1, 1, 1), '1.1.2');
  assertSemverCompare(SemVer.Comparison.EQ, SemVer.nu(1, 1, 1), '1.1.1');
  assertSemverCompare(SemVer.Comparison.GT, SemVer.nu(1, 1, 1), '1.1.0');

  assertSemverCompare(SemVer.Comparison.LT, SemVer.nu(1, 1, 0), '1.1.1');
  assertSemverCompare(SemVer.Comparison.GT, SemVer.nu(1, 1, 2), '1.1.1');

  // minor
  assertSemverCompare(SemVer.Comparison.LT, SemVer.nu(1, 1, 1), '1.2.1');
  assertSemverCompare(SemVer.Comparison.EQ, SemVer.nu(1, 1, 1), '1.1.1');
  assertSemverCompare(SemVer.Comparison.GT, SemVer.nu(1, 1, 1), '1.0.1');

  assertSemverCompare(SemVer.Comparison.LT, SemVer.nu(1, 0, 1), '1.1.1');
  assertSemverCompare(SemVer.Comparison.GT, SemVer.nu(1, 2, 1), '1.1.1');

  // major
  assertSemverCompare(SemVer.Comparison.LT, SemVer.nu(1, 1, 1), '2.1.1');
  assertSemverCompare(SemVer.Comparison.EQ, SemVer.nu(1, 1, 1), '1.1.1');
  assertSemverCompare(SemVer.Comparison.GT, SemVer.nu(1, 1, 1), '0.1.1');

  assertSemverCompare(SemVer.Comparison.LT, SemVer.nu(0, 1, 1), '1.1.1');
  assertSemverCompare(SemVer.Comparison.GT, SemVer.nu(2, 1, 1), '1.1.1');

});