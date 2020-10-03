import { Chain, Step } from '@ephox/agar';
import { Assert } from '@ephox/bedrock-client';
import { FakeTiny } from 'tinymce/miniature/alien/Types';
import { getTinymce } from 'tinymce/miniature/loader/Globals';

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

const sAssertVersion = (expectedMajor: number, expectedMinor: number) =>
  Step.sync(() => assertVersion(expectedMajor, expectedMinor));

const cAssertEditorVersion = (expectedMajor: number, expectedMinor: number) =>
  Chain.op<any>((editor) => assertTinymceVersion(editor.editorManager, expectedMajor, expectedMinor));

export {
  assertVersion,
  sAssertVersion,
  cAssertEditorVersion
};