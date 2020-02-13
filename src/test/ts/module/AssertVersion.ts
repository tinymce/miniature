import { Step, Chain } from '@ephox/agar';
import { getTinymce } from '../../../main/ts/loader/Globals';
import { FakeTiny } from '../../../main/ts/alien/Types';
import { Assert } from '@ephox/bedrock-client';

const assertTinymceVersion = (tinymce: FakeTiny, expectedMajor: number, expectedMinor: number) => {
  const major = parseInt(tinymce.majorVersion, 10);
  const minor = parseInt(tinymce.minorVersion.split('.')[0], 10);

  Assert.eq('Not expected major', expectedMajor, major);
  Assert.eq('Not expected minor', expectedMinor, minor);
};

const assertVersion = (expectedMajor: number, expectedMinor: number) => {
  const tinymce = getTinymce().getOrDie('Failed to get global tinymce');
  assertTinymceVersion(tinymce, expectedMajor, expectedMinor);
};

const sAssertVersion = (expectedMajor: number, expectedMinor: number) => {
  return Step.sync(() => assertVersion(expectedMajor, expectedMinor));
};

const cAssertEditorVersion = (expectedMajor: number, expectedMinor: number) => {
  return Chain.op<any>((editor) => assertTinymceVersion(editor.editorManager, expectedMajor, expectedMinor));
};

export {
  assertVersion,
  sAssertVersion,
  cAssertEditorVersion
};