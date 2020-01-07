import { Element, Attr, DomEvent, Insert, Body, SelectorFilter, Remove } from '@ephox/sugar';
import { Arr, Strings } from '@ephox/katamari';

export const loadScript = (url: string, success: () => void, failure: (err: Error) => void) => {
  const script = Element.fromTag('script');

  Attr.set(script, 'src', url);

  const onLoad = DomEvent.bind(script, 'load', () => {
    onLoad.unbind();
    onError.unbind();
    success();
  });

  const onError = DomEvent.bind(script, 'error', () => {
    onError.unbind();
    onLoad.unbind();
    failure(new Error(`Failed to load script: ${url}`));
  });

  Insert.append(Body.body(), script);
};

const isTinymcePackageUrl = (url: string) => Strings.contains(url, '/node_modules/tinymce/') || Strings.contains(url, '/node_modules/tinymce-');
const hasPackageUrl = (name: string) => (elm: Element) => {
  return Attr.has(elm, name) && isTinymcePackageUrl(Attr.get(elm, name));
};

export const removeTinymceElements = () => {
  const elements = Arr.flatten([
    // Some older versions of tinymce leaves elements behind in the dom
    SelectorFilter.all('.mce-notification,.mce-window,#mce-modal-block'),
    Arr.filter(SelectorFilter.all('script'), hasPackageUrl('src')),
    Arr.filter(SelectorFilter.all('link'), hasPackageUrl('href')),
  ]);

  Arr.each(elements, Remove.remove);
};