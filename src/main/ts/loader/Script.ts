import { Arr, Strings } from '@ephox/katamari';
import { Attribute, DomEvent, Insert, Remove, SelectorFilter, SugarBody, SugarElement } from '@ephox/sugar';

export const loadScript = (url: string, success: () => void, failure: (err: Error) => void): void => {
  const script = SugarElement.fromTag('script');

  Attribute.set(script, 'src', url);

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

  Insert.append(SugarBody.body(), script);
};

const isTinymcePackageUrl = (url: string): boolean =>
  Strings.contains(url, '/node_modules/tinymce/') || Strings.contains(url, '/node_modules/tinymce-');

const hasPackageUrl = (name: string) => (elm: SugarElement<Element>): boolean =>
  Attribute.getOpt(elm, name).exists(isTinymcePackageUrl);

export const removeTinymceElements = (): void => {
  const elements = Arr.flatten([
    // Some older versions of tinymce leaves elements behind in the dom
    SelectorFilter.all('.mce-notification,.mce-window,#mce-modal-block'),
    Arr.filter(SelectorFilter.all('script'), hasPackageUrl('src')),
    Arr.filter(SelectorFilter.all('link'), hasPackageUrl('href')),
  ]);

  Arr.each(elements, Remove.remove);
};