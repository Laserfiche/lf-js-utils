import { formatString } from './string-utils.js';

export type resourceType = { language: string; resource: object };

export interface ILocalizationService {
  setLanguage(language: string): void;
  currentResource: resourceType | undefined;
  getString(key: string, params?: string[]): string;
  initResourcesFromUrlAsync(url: string): Promise<void>;
  debugMode: boolean;
}

const ResourceNotFoundError_NAME = 'ResourceNotFoundError';
class ResourceNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ResourceNotFoundError_NAME;
  }
}

export class LfLocalizationService implements ILocalizationService {
  /**
   * When true, returns pseudo language string. Defaults to false.
   * @example
   * ```typescript
   * const resource = new Map([
   *  ['jp', { "LOADING": "読み込み中..." }],
   *  ['ir', { "LOADING": "ag lódáil..." }],
   *  ['en', { "LOADING": "Loading..." }]
   * ]);
   * localizationService = new LfLocalizationService(resource);
   * localizationService.debugMode = true;
   * localizationService.getString('LOADING'); // '_ŀǿȧḓīƞɠ..._'
   * ```
   */
  public debugMode: boolean = false;

  private readonly DEFAULT_LANGUAGE: string = 'en';
  private _currentResource?: resourceType;
  private _resources: Map<string, object> = new Map<string, object>();
  private _selectedLanguage: string = this.DEFAULT_LANGUAGE;

  /**
   *
   * @example
   * ```typescript
   * const resource = new Map([
   *  ['jp', { "LOADING": "読み込み中..." }],
   *  ['ir', { "LOADING": "ag lódáil..." }],
   *  ['en', { "LOADING": "Loading..." }]  // have to provide 'en' in map
   * ]);
   * const localizationService = new LfLocalizationService(resource);
   *
   * // or
   *
   * const localizationService = new LfLocalizationService();
   * // have to call initResourcesFromUrlAsync later to load resources dynamically
   * ```
   */
  constructor(resources?: Map<string, object> | undefined) {
    if (resources) {
      if (!resources.get(this.DEFAULT_LANGUAGE)) {
        throw new ResourceNotFoundError(
          `Required language resource ${this.DEFAULT_LANGUAGE} is not found in provided map.`
        );
      }
      this._resources = resources;
    } else {
      console.log('No static resources provided. Call initResourcesFromUrlAsync to load resources dynamically.');
    }
    try {
      this.setLanguage(window?.navigator?.language ?? this.DEFAULT_LANGUAGE);
    } catch {
      this.setLanguage(this.DEFAULT_LANGUAGE);
    }
  }

  /**
   * Resets the resource map to include remote language resource files: en by default, and
   * the closest selected language
   * (e.g.: if selected language is fr-CA, and fr-CA doesn't exists but fr exists, it loads fr)
   *
   * @param url the url to the language file's folder
   * @example
   * ```typescript
   * const localizationService = new LfLocalizationService();
   * const resourcesFolder = 'https://cdn.jsdelivr.net/npm/@laserfiche/lf-resource-library@3.0.0/resources/laserfiche-base';
   * localizationService.setLanguage('fr-CA');
   * await localizationService.initResourcesFromUrlAsync(resourcesFolder); // loads en.json and fr.json
   * ```
   */
  public async initResourcesFromUrlAsync(url: string): Promise<void> {
    this._resources = new Map();
    this._currentResource = undefined;
    url = this.terminateUrlWithSlash(url);
    await this.getDefaultLanguageResourceAsync(url);
    await this.getSelectedLanguageResourceAsync(url);
  }

  /**
   * Loads the selected langauge resource given the url pointing to the folder of the resource,
   * if HTTP receives 404 error, loads the non-region-specific language resource,
   * throws error otherwise
   * @param url
   */
  private async getSelectedLanguageResourceAsync(url: string) {
    if (!this.setLanguageResource(this._selectedLanguage)) {
      try {
        await this.addResourceFromUrlAsync(`${url}${this._selectedLanguage}.json`, this._selectedLanguage);
        this.setLanguageResource(this._selectedLanguage);
        console.log(`Loaded resource from ${url}${this._selectedLanguage}.json.`);
      } catch (e) {
        if ((e as Error)?.name === ResourceNotFoundError_NAME) {
          const languageWithoutDash: string = this._selectedLanguage.split('-')[0];
          if (!this.setLanguageResource(languageWithoutDash)) {
            try {
              await this.addResourceFromUrlAsync(`${url}${languageWithoutDash}.json`, languageWithoutDash);
              this.setLanguageResource(languageWithoutDash);
              console.warn(
                `Selected language resource ${this._selectedLanguage} is not found at ${url}${this._selectedLanguage}.json. Loaded resource from ${url}${languageWithoutDash}.json.`
              );
            } catch {
              this.setLanguageResource(this.DEFAULT_LANGUAGE);
              console.warn(
                `Selected language resource ${this._selectedLanguage} is not found at ${url}${this._selectedLanguage}.json.`
              );
            }
          }
        } else {
          console.error(e);
        }
      }
    }
  }

  /**
   * Loads the default langauge resource given the url pointing to the folder of the resource,
   * throws error if resource not found
   * @param url
   */
  private async getDefaultLanguageResourceAsync(url: string) {
    try {
      await this.addResourceFromUrlAsync(`${url}${this.DEFAULT_LANGUAGE}.json`, this.DEFAULT_LANGUAGE);
    } catch (e) {
      if ((e as Error)?.name === ResourceNotFoundError_NAME) {
        throw new ResourceNotFoundError(
          `Required language resource ${this.DEFAULT_LANGUAGE} is not found in ${url}${this.DEFAULT_LANGUAGE}.json.`
        );
      } else {
        throw e;
      }
    }
  }

  /**
   * Sets currentResource given the language code, fall back to available resource if necessary.
   * @example
   * ```typescript
   * const localizationService = new LfLocalizationService();
   * const resourcesFolder = 'https://cdn.jsdelivr.net/npm/@laserfiche/lf-resource-library@3.0.0/resources/laserfiche-base';
   * localizationService.setLanguage('fr-CA');  // gives a warning since no resource exists at this point
   * await localizationService.initResourcesFromUrlAsync(resourcesFolder); // loads en.json and fr.json because language has been set to be fr-CA
   * localizationService.currentLanguage // {'language': 'fr', 'resource': { ... }}
   * ```
   * @example
   * ```typescript
   * const resource = new Map([
   *  ['jp', { "LOADING": "読み込み中..." }],
   *  ['ir', { "LOADING": "ag lódáil..." }],
   *  ['en', { "LOADING": "Loading..." }]
   * ]);
   * localizationService = new LfLocalizationService(resource);
   * localizationService.setLanguage('ir');  // set currentResource to ir
   * localizationService.currentLanguage // {'language': 'ir', 'resource':{ "LOADING": "ag lódáil..." }}
   * ```
   */
  public setLanguage(language: string): void {
    this._selectedLanguage = language;
    this.setResourceWithFallBack(language);
  }

  /**
   * Returns the current language resource in use
   * @example
   * ```typescript
   * const resource = new Map([
   *  ['jp', { "LOADING": "読み込み中..." }],
   *  ['ir', { "LOADING": "ag lódáil..." }],
   *  ['en', { "LOADING": "Loading..." }]
   * ]);
   * localizationService = new LfLocalizationService(resource);
   * localizationService.currentResource // {'language': 'en', 'resource':{ "LOADING": "Loading..." }}
   * ```
   */
  public get currentResource(): resourceType | undefined {
    return this._currentResource;
  }

  /**
   * Returns the translated formatted string if exists,
   * falls back to default resource if translated string doesn't exist in current resource
   * throws an error if current resource does not exist
   * @param key the string to translate
   * @param params the tokens to replace in translated string if exist
   * @returns the translated string with tokens
   * @example
   * ```typescript
   * const resource = new Map([
   *  ['jp', { "LOADING": "読み込み中..." }],
   *  ['ir', { "LOADING": "ag lódáil..." }],
   *  ['en', { "LOADING": "Loading..." }]
   * ]);
   * localizationService = new LfLocalizationService(resource);
   * localizationService.getString('LOADING'); // 'Loading...'
   * localizationService.setLanguage('ir');
   * localizationService.getString('LOADING'); // 'ag lódáil...'
   * ```
   */
  public getString(key: string, params?: string[]): string {
    if (!this._currentResource) {
      console.warn('Current resource not found.');
      return `<< ${key} >>`;
    }
    let localizedString: string | undefined = this._currentResource?.resource[key];
    if (!localizedString) {
      const defaultResource = this._resources.get(this.DEFAULT_LANGUAGE);
      if (defaultResource) {
        localizedString = defaultResource[key];
      }
      if (localizedString) {
        console.warn(`Resource '${key}' not found in ${this._currentResource?.language}.
        Falling back to ${this.DEFAULT_LANGUAGE}.`);
      } else {
        console.warn(`Resource '${key}' not found. Use initResourcesFromUrlAsync to load resource.`);
        return `<< ${key} >>`;
      }
    }
    try {
      const formattedString: string = formatString(localizedString, params);
      return this.convertToPseudoLanguage(formattedString);
    } catch {
      console.warn(`Given arguments for ${key} did not match required number of arguments.`);
      return this.convertToPseudoLanguage(localizedString);
    }
  }

  /**
   * Fetchs the remote json file and add it to this._resources
   * @param url the remote url to the resource file
   * @param code format languagecode2-country/regioncode2
   */
  private async addResourceFromUrlAsync(url: string, code: string): Promise<object> {
    const response = await fetch(url);
    if (response.status === 404) {
      throw new ResourceNotFoundError(`HTTP error ${response.status} at ${url}`);
    } else if (response.status === 200) {
      const json = await response.json();
      this._resources.set(code, json);
      return json;
    } else {
      throw new Error(`addResourceFromUrlAsync(${url}) HTTP status ${response.status}.`);
    }
  }

  /**
   * Sets _currentResource based on given language, if language exists in _resource,
   * else if language does not exist in _resource, set to the language without dash if exists in _resource,
   * else if language without dash doesn't exist, set to default language which is guaranteed to exist.
   * @param language
   * @returns
   */
  private setResourceWithFallBack(language: string): void {
    const setCurrentResourceSuccess = this.setLanguageResource(language);
    if (setCurrentResourceSuccess) return;
    const languageWithoutDash: string = this._selectedLanguage.split('-')[0];
    if (languageWithoutDash != this._selectedLanguage) {
      const setCurrentResourceFallBackSuccess = this.setLanguageResource(languageWithoutDash);
      if (setCurrentResourceFallBackSuccess) return;
      const setCurrentResourceFallBackDefaultSuccess = this.setLanguageResource(this.DEFAULT_LANGUAGE);
      if (setCurrentResourceFallBackDefaultSuccess) {
        console.warn(`Selected language resource ${this._selectedLanguage} is not found. Use initResourcesFromUrlAsync to load resource.
      Fall back to use default language ${this.DEFAULT_LANGUAGE}.`);
      } else {
        console.warn('Resource is not found. Cannot set currentResource.');
        this._currentResource = undefined;
      }
    }
  }

  /**
   * Sets _currentResource based on given language
   * @param language
   * @returns true if _currentResource is set, false if language doesn't exist in _resource
   */
  private setLanguageResource(language: string): boolean {
    const resource = this._resources.get(language);
    if (resource) {
      this._currentResource = { language: language, resource: resource };
      return true;
    }
    return false;
  }

  /**
   * Ensures the url ends with '/'
   * @param url
   * @returns path with '/'
   */
  private terminateUrlWithSlash(url: string) {
    if (!url.endsWith('/')) {
      url = url.concat('/');
    }
    return url;
  }

  private convertToPseudoLanguage(value: string): string {
    if (!this.debugMode) {
      return value;
    }
    let pseudoLocalizedText = '_';
    for (const character of value) {
      if (this.ACCENTED_MAP[character]) {
        pseudoLocalizedText += this.ACCENTED_MAP[character];
      } else {
        pseudoLocalizedText += character;
      }
    }
    return pseudoLocalizedText + '_';
  }

  private readonly ACCENTED_MAP = {
    a: 'ȧ',
    A: 'Ȧ',
    b: 'ƀ',
    B: 'Ɓ',
    c: 'ƈ',
    C: 'Ƈ',
    d: 'ḓ',
    D: 'Ḓ',
    e: 'ḗ',
    E: 'Ḗ',
    f: 'ƒ',
    F: 'Ƒ',
    g: 'ɠ',
    G: 'Ɠ',
    h: 'ħ',
    H: 'Ħ',
    i: 'ī',
    I: 'Ī',
    j: 'ĵ',
    J: 'Ĵ',
    k: 'ķ',
    K: 'Ķ',
    l: 'ŀ',
    L: 'Ŀ',
    m: 'ḿ',
    M: 'Ḿ',
    n: 'ƞ',
    N: 'Ƞ',
    o: 'ǿ',
    O: 'Ǿ',
    p: 'ƥ',
    P: 'Ƥ',
    q: 'ɋ',
    Q: 'Ɋ',
    r: 'ř',
    R: 'Ř',
    s: 'ş',
    S: 'Ş',
    t: 'ŧ',
    T: 'Ŧ',
    v: 'ṽ',
    V: 'Ṽ',
    u: 'ŭ',
    U: 'Ŭ',
    w: 'ẇ',
    W: 'Ẇ',
    x: 'ẋ',
    X: 'Ẋ',
    y: 'ẏ',
    Y: 'Ẏ',
    z: 'ẑ',
    Z: 'Ẑ',
  };
}
