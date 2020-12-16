import { deleteTinymceGlobals, getTinymce } from './Globals';
import { loadScript, removeTinymceElements } from './Script';
import { updateTinymceUrls } from './Urls';

const versionToPackageName = (version: string) => version === 'latest' ? 'tinymce' : `tinymce-${version}`;

const loadFrom = (customUrl: string, baseUrl: string, success: () => void, failure: (err: Error) => void): void => {
  unload();
  loadScript(customUrl, () => {
    getTinymce().each((tinymce) => {
      tinymce.baseURL = baseUrl;
      tinymce.baseURI = new tinymce.util.URI(tinymce.baseURL);
    });
    success();
  }, failure);
};

const load = (version: string, success: () => void, failure: (err: Error) => void): void => {
  const packageName = versionToPackageName(version);

  unload();
  loadScript(`/project/node_modules/${packageName}/tinymce.min.js`, () => {
    updateTinymceUrls(versionToPackageName(version));
    success();
  }, failure);
};

const unload = (): void => {
  getTinymce().each((tinymce) => tinymce.remove());
  removeTinymceElements();
  deleteTinymceGlobals();
};

export { load, loadFrom, unload };
