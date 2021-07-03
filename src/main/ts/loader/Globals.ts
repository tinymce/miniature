import { Global, Optional } from '@ephox/katamari';

import { TinyMCE } from '../alien/Types';

const getTinymce = (): Optional<TinyMCE> => Optional.from(Global.tinymce);

const deleteTinymceGlobals = (): void => {
  delete Global.tinymce;
  delete Global.tinyMCE;
};

export {
  getTinymce,
  deleteTinymceGlobals
};
