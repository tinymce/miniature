import { FakeTiny } from '../alien/Types';
import * as Semver from '../ver/Semver';

// Creates a semver string out of tinymce major and minor properties this also handles
// the pre semver case with 3.x versions of tinymce having a extra dot 1.2.3.4 we simply
// ignore the extra dot and normalize that to proper semver
const createSemVer = (tinymce: FakeTiny) => {
  const semver = [ tinymce.majorVersion, tinymce.minorVersion ].join('.');
  return semver.split('.').slice(0, 3).join('.');
};

const getVersion = (tinymce: FakeTiny): Semver.Version =>
  Semver.parse(createSemVer(tinymce));

const isLessThan = (tinymce: FakeTiny | undefined, version: string): boolean =>
  !tinymce ? false : Semver.compare(getVersion(tinymce), Semver.parse(version)) === Semver.Comparison.LT;

const isGreaterThan = (tinymce: FakeTiny | undefined, version: string): boolean =>
  !tinymce ? false : Semver.compare(getVersion(tinymce), Semver.parse(version)) === Semver.Comparison.GT;

export {
  getVersion,
  isLessThan,
  isGreaterThan
};
