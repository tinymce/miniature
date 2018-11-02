import * as SemVer from './SemVer';
import { FakeTiny } from '../alien/Types';

// Creates a semver string out of tinymce major and minor properties this also handles
// the pre semver case with 3.x versions of tinymce having a extra dot 1.2.3.4 we simply
// ignore the extra dot and normalize that to proper semver
const createSemVer = function (tinymce: FakeTiny) {
  const semver = [tinymce.majorVersion, tinymce.minorVersion].join('.');
  return semver.split('.').slice(0, 3).join('.');
};

const getVersion = function (tinymce: FakeTiny) {
  return tinymce ? SemVer.parse(createSemVer(tinymce)) : null;
};

const isLessThan = function (tinymce: FakeTiny, version: string) {
  return SemVer.compare(getVersion(tinymce), SemVer.parse(version)) < 0;
};

export {
  getVersion,
  isLessThan
};
