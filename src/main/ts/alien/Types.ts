export interface FakeTiny {
  majorVersion: string;
  minorVersion: string;
}

export interface TinyMCE extends FakeTiny {
  baseURL: string;
  baseURI: any;

  PluginManager: any;

  util: {
    URI: any;
  };

  remove (): void;
  remove (selector: string | Editor): Editor | void;
}

export interface Editor {
  editorManager: any;
}