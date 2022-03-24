export type resourceType = { language: string, resource: object };

export interface ILocalizationService {
  setLanguage(language: string): void;
  get currentResource(): resourceType | undefined;
  getString(key: string, params?: string[]): string;
  initResourcesFromUrlAsync(url: string): Promise<void>;
  debugMode: boolean;
}

export class LfLocalizationService implements ILocalizationService {

  /**
   * Whether or not to use psedo language
   */
  public debugMode: boolean = false;

  private readonly DEFAULT_LANGUAGE: string = 'en';
  private _currentResource?: resourceType;
  private _resources: Map<string, object>;
  private _selectedLanguage: string = this.DEFAULT_LANGUAGE;

  constructor(resources?: Map<string, object> | undefined) {
    if (resources) {
      if (!resources.get(this.DEFAULT_LANGUAGE)) {
        throw new Error(`Required language resource ${this.DEFAULT_LANGUAGE} is not found in provided map.`)
      }
      this._resources = resources;
    }
    else {
      this._resources = new Map();
    }
    try {
      this.setLanguage(window?.navigator?.language ?? this.DEFAULT_LANGUAGE);
    }
    catch {
      this.setLanguage(this.DEFAULT_LANGUAGE);
    }
  }

  /**
   * Checks if the file exists in _resources, if not adds the language file to _resources,
   * and sets default language
   *  
   * @param url the url to the language file's folder
   */
  public async initResourcesFromUrlAsync(url: string): Promise<void> {
    this._resources = new Map();
    if (!url.endsWith('\/')) {
      url = url.concat('\/');
    }
    try {
      await this.addResourceFromUrlAsync(`${url}${this.DEFAULT_LANGUAGE}.json`, this.DEFAULT_LANGUAGE);
      this.setResource(this.DEFAULT_LANGUAGE);
    }
    catch {
      throw new Error(`Required language resource ${this.DEFAULT_LANGUAGE} is not found in URL.`);
    }
    try {
      await this.addResourceFromUrlAsync(`${url}${this._selectedLanguage}.json`, this._selectedLanguage);
      this.setResource(this._selectedLanguage);
    }
    catch {
      const languageWithoutDash: string = this._selectedLanguage.split('-')[0];
      if (languageWithoutDash != this._selectedLanguage) {
        try {
          await this.addResourceFromUrlAsync(`${url}${languageWithoutDash}.json`, languageWithoutDash);
          this.setResource(languageWithoutDash);
          console.warn(`Selected language resource ${this._selectedLanguage} is not found in URL. Fall back to ${languageWithoutDash}.`);
        }
        catch {
          console.warn(`Selected language resource ${this._selectedLanguage} is not found in URL.`);
        }
      }
      console.warn(`Selected language resource ${this._selectedLanguage} is not found in URL.`);
    }                                         // TODO: decide whether or not to do this
    // we use setLanguage to know what language to set to, but that doesn't mean the language exists
    // so we need to use setLanguage after initResourceAsync
  }

  /**
   * Sets currentResource given the language code,
   * falls back to language without area code if language is not found in resource,
   * falls back to default language if neither language or language without area code is not found,
   * if default language is also not found, gives a console warning without set currentResource
   */
  public setLanguage(language: string): void {
    this._selectedLanguage = language;
    this.setResource(language);
  }

  /**
   * Returns the current language resource in use
   */
  public get currentResource(): resourceType | undefined {
    return this._currentResource;
  }

  /**
   * Returns the translated formated string if exists,
   * falls back to default resource if translated string doesn't exist in current resource
   * throws an error if current resource does not exist
   * @param key the string to translate 
   * @param params the tokens to replace in translated string if exist
   * @returns the translated string with tokens
   */
  public getString(key: string, params?: string[]): string {
    if (!this._currentResource) {
      throw new Error('Current resource not found. Call setLanguage to set current language.');
    }
    let localizedString = this._currentResource?.resource[key];
    if (!localizedString) {
      const defaultResource = this._resources?.get(this.DEFAULT_LANGUAGE);
      localizedString = defaultResource![key];
      if (localizedString) {
        console.warn(`Resource '${key}' not found in ${this._currentResource?.language}. Falling back to ${this.DEFAULT_LANGUAGE}.`);
      }
      else {
        throw new Error(`Resource '${key}' not found. Use initResourcesFromUrlAsync to load resource.`);
      }
    }
    try {
      const formattedString: string = this.formatString(localizedString, params);
      return this.convertToPseudoLanguage(formattedString);
    }
    catch {
      console.warn(`Given arguments for ${key} did not match required number of arguments.`);
      return this.convertToPseudoLanguage(localizedString);
    }
  }

  /**
   * Fetchs the remote json file and add it to this._resources
   * @param url the remote url to the resource file
   * @param code format languagecode2-country/regioncode2
   */
  private async addResourceFromUrlAsync(url: string, code: string): Promise<Object> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    } else {
      const json = await response.json();
      this._resources.set(code, json);
      return json;
    }
  }

  private convertToPseudoLanguage(value: string): string {
    if (!this.debugMode) {
      return value;
    }
    let pseudoLocalizedText = '_';
    for (const character of value) {
      if (this.ACCENTED_MAP[character]) {
        pseudoLocalizedText += this.ACCENTED_MAP[character];
      }
      else {
        pseudoLocalizedText += character;
      }
    }
    return pseudoLocalizedText + '_';
  }

  /**
   * Sets _currentResource based on given language, if language exists in _resource, 
   * else,  set to  without dash if exists in _resource, 
   * else, set to default language which is guaranteed to exist.
   * @param language 
   * @returns 
   */
  private setResource(language: string): void {
    const resource = this._resources.get(language);
    if (resource) {
      this._currentResource = { language: language, resource: resource };
    }
    else {
      console.warn(`Selected language resource ${this._selectedLanguage} is not found. Use initResourcesFromUrlAsync to load resource.`);
      const languageWithoutDash: string = this._selectedLanguage.split('-')[0];
      if (languageWithoutDash != this._selectedLanguage) {
        const languageWithoutDashResource = this._resources.get(languageWithoutDash);
        if (languageWithoutDashResource) {
          this._currentResource = { language: languageWithoutDash, resource: languageWithoutDashResource };
          return;
        }
      }
      const defaultResource = this._resources.get(this.DEFAULT_LANGUAGE);
      if (defaultResource) {
        this._currentResource = { language: this.DEFAULT_LANGUAGE, resource: defaultResource };
      }
    }
  }

  private formatString(stringToFormat: string, params?: string[]): string {
    const expectedParams: RegExpMatchArray = stringToFormat.match(/\$\{\d*\}/g) ?? [];
    const expectedNumParams: number = new Set(expectedParams).size;
    if ((expectedNumParams > 0 && params?.length !== expectedNumParams)
      || (expectedNumParams === 0 && params && params.length > 0)) {
      throw new Error(`Expected ${expectedNumParams} arguments. Actual arguments: ${params?.length ?? '0'}.`);
    }
    if (params && params.length > 0) {
      for (let i = 0; i < params.length; i++) {
        const replacement: string = params[i];
        const varRegex: RegExp = new RegExp(`\\$\\{${i}\\}`, 'g');
        stringToFormat = stringToFormat.replace(varRegex, replacement);
      }
    }
    return stringToFormat;
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
