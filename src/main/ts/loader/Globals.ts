import { Global, Optional } from '@ephox/katamari';

const getTinymce = () => Optional.from(Global.tinymce);

const deleteTinymceGlobals = () => {
  delete Global.tinymce;
  delete Global.tinyMCE;
};

export {
  getTinymce,
  deleteTinymceGlobals
};
