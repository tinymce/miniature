import { Step } from '@ephox/agar';
import { Assert } from '@ephox/bedrock-client';

import { FakeTiny } from 'tinymce/miniature/alien/Types';
import { getTinymce } from 'tinymce/miniature/loader/Globals';

const assertTinymceVersion = (tinymce: FakeTiny, expectedMajor: number, expectedMinor: number): void => {
  const major = parseInt(tinymce.majorVersion, 10);
  const minor = parseInt(tinymce.minorVersion.split('.')[0], 10);

  Assert.eq('Not expected major', expectedMajor, major);
  Assert.eq('Not expected minor', expectedMinor, minor);
};

const assertVersion = (expectedMajor: number, expectedMinor: number): void => {
  const tinymce = getTinymce().getOrDie('Failed to get global tinymce');
  assertTinymceVersion(tinymce, expectedMajor, expectedMinor);
};

const sAssertVersion = (expectedMajor: number, expectedMinor: number): Step<unknown, unknown> =>
  Step.sync(() => assertVersion(expectedMajor, expectedMinor));

export {
  assertVersion,
  sAssertVersion
};
