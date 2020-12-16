import { getTinymce } from './Globals';

const setTinymceBaseUrl = (tinymce: any, baseUrl: string): void => {
  const prefix = document.location.protocol + '//' + document.location.host;
  tinymce.baseURL = baseUrl.indexOf('://') === -1 ? prefix + baseUrl : baseUrl;
  tinymce.baseURI = new tinymce.util.URI(tinymce.baseURL);
};

const updateTinymceUrls = (packageName: string): void => {
  getTinymce().each((tinymce) => {
    setTinymceBaseUrl(tinymce, `/project/node_modules/${packageName}`);
  });
};

export {
  setTinymceBaseUrl,
  updateTinymceUrls
};