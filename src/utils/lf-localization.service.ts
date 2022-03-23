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
   * whether or not to psedo language
   */
  public debugMode: boolean = false;

  private readonly DEFAULT_LANGUAGE: string = 'en';
  private defaultResourceLanguage: string = '';
  private _currentResource?: resourceType;
  private _resources: Map<string, object>;

  constructor(resources?: Map<string, object> | undefined) {
    if (resources) {
      this._resources = resources;
      this.setDefaultLanguage();
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
   * checks if the file exists in _resources, if not adds the language file to _resources
   * sets default language
   *  
   * @param url the url to the language file
   */
  public async initResourcesFromUrlAsync(url: string): Promise<void> {
    const code = this.extractCodeFromUrl(url);
    const resource = this._resources.get(code);
    if (!resource) {
        await this.addResourceFromUrlAsync(url, code);
    }
    this.setDefaultLanguage();
  }

  /**
   * sets currentResource given the language code
   * falls back to language without area code if language is not found in resource
   * falls back to default language if neither language or language without area code is not found
   * if default language is also not found, gives a console warning without set currentResource
   */
  public setLanguage(language: string): void {
    console.log("default language", this.defaultResourceLanguage)
    const resource = this._resources.get(language);

    if (resource) {
      this._currentResource = { language, resource };
    }
    else {
      const languageWithoutDash: string = language.split('-')[0];
      const customShorterStringResources = this._resources.get(languageWithoutDash);
      if (customShorterStringResources) {
        this._currentResource = { language: languageWithoutDash, resource: customShorterStringResources };
        console.warn(`Resource '${language}' not found. Call initAsync to load the source from url first. Falling back to ${languageWithoutDash}.`)
      }
      else {
        const defaultResources = this._resources.get(this.defaultResourceLanguage);
        if (defaultResources) {
          this._currentResource = { language: this.defaultResourceLanguage, resource: defaultResources! };
          console.warn(`Resource '${language}' not found. Call initAsync to load the source from url first. Falling back to ${this.defaultResourceLanguage}.`)
        }
        else {
          console.warn(`Resource '${language}' not found. Call initAsync to load the source from url first.`);
        }
      }
    }
  }

  /**
   * returns the current language resource in use
   */
  public get currentResource(): resourceType | undefined {
    return this._currentResource;
  }

  /**
   * returns the translated formated string if exists,
   * falls back to default resource if translated string doesn't exist in current resource
   * throws an error if current resource does not exist
   * @param key the string to translate 
   * @param params the tokens to replace in translated string if exist
   * @returns the translated string with tokens
   */
  public getString(key: string, params?: string[]): string {
    if (!this._currentResource) {
      throw new Error('current Resource not found. Call setLanguage to set current language.');
    }
    let localizedString = this._currentResource?.resource[key];
    if (!localizedString) {
      const defaultResource = this._resources?.get(this.defaultResourceLanguage);
      localizedString = defaultResource![key];
      if (localizedString) {
        console.warn(`Resource '${key}' not found in ${this._currentResource?.language}. Falling back to ${this.defaultResourceLanguage}.`);
      }
      else {
        throw new Error(`Resource '${key}' not found. Call initAsync to load the source from url first.`);
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
  private async addResourceFromUrlAsync(url: string, code: string) : Promise<Object> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    } else {
      const json = await response.json();
      this._resources.set(code, json);
      return json;
    }
  }

  /**
   * Extracts the language code from the given url
   * Throws an error if url format is unexpected
   * @param url 
   * @returns code extracted from url
   */
  private extractCodeFromUrl(url: string): string {
    const fileStart = url.lastIndexOf('/');
    const fileString = url.substring(fileStart+1);
    const code = fileString.split('.')[0];
    const regex = new RegExp('^[a-z]{2}(-[a-zA-Z]+)?$', 'g');
    if (code.match(regex)) {
      return code;
    }
    else {
      throw new Error('Unexpected URL format.');
    }
  }

  /**
   * sets defaultResourceLanguage if DEFAULT_LANGUAGE exists in _resources
   * otherwise, if _resources exists, sets the first language resource in _resources to be defaultResourceLanguage
   */
  private setDefaultLanguage() {
    if (this._resources?.get(this.DEFAULT_LANGUAGE)) {
      this.defaultResourceLanguage = this.DEFAULT_LANGUAGE;
    }
    else if (this._resources?.size > 0) {
      this.defaultResourceLanguage = this._resources?.keys().next().value;
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
