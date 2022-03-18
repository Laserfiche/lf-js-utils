export type resourceType = { language: string, resource: object };

export interface ILocalizationService {
  setLanguage(language: string): void;
  get currentResource(): resourceType | undefined;
  getStringAsync(key: string, params?: string[]): Promise<string>;
  debugMode: boolean;
}

export class LfLocalizationService implements ILocalizationService {
  private readonly DEFAULT_LANGUAGE: string = 'en';

  private defaultResourceLanguage: string = '';
  private _currentResource!: resourceType;
  private resourcesFolderUrl?: string;
  public debugMode: boolean = false;
  private _resources!: Map<string, object>;
  private _selectedLanguage: string = this.DEFAULT_LANGUAGE;

  constructor(resources?: Map<string, object> | string) {
    if (typeof resources == "object") {
      this._resources = resources;
    } else if (typeof resources == "string") {
      this.resourcesFolderUrl = resources;
      this._resources = new Map();
    }
    try {
      this.setLanguage(window?.navigator?.language ?? this.DEFAULT_LANGUAGE);
    }
    catch {
      this.setLanguage(this.DEFAULT_LANGUAGE);
    }
    this.setDefaultLanguage();
  }

  /**
   * Fetch the remote json file and add it to this.resources
   * @param url the remote url to the resource file
   * @param code format languagecode2-country/regioncode2
   */
  private async addResourceFromUrlAsync(url: string, code: string) : Promise<Object> {
    return await fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then(json => {
        this._resources.set(code, json);
        return json;
      });
  }

  public setLanguage(language: string): void {
      this._selectedLanguage = language;
  }

  private async getLanguageFromResourceAsync(language: string): Promise<Object | undefined> {
    let resource = this._resources.get(language);
    if (resource) {
      return resource;
    } else if (this.resourcesFolderUrl) {
      try {
        resource = await this.addResourceFromUrlAsync(`${this.resourcesFolderUrl}/${language}.json`, language);
        return resource;
      } catch (e) {
        return undefined;
      } 
    } else {
      return undefined;
    }
  }

  private async setCurrentResourceAsync(language: string) {
    const resource = await this.getLanguageFromResourceAsync(language);
    if (resource) {
      this._currentResource = { language, resource };
    }
    else {
      const languageWithoutAreaCode: string = language.split('-')[0];
      const languageWithoutAreaCodeResource = await this.getLanguageFromResourceAsync(languageWithoutAreaCode);
      if (languageWithoutAreaCodeResource) {
        this._currentResource = { language: languageWithoutAreaCode, resource: languageWithoutAreaCodeResource };
      } else {
        const defaultLanguageResource = await this.getLanguageFromResourceAsync(this.defaultResourceLanguage);
        if (defaultLanguageResource) {
          this._currentResource = { language: this.defaultResourceLanguage, resource: defaultLanguageResource };
        } else {
          throw new Error("The selected resource doesn't exist.")
        }
      }
    }
  }

  private setDefaultLanguage() {
    if (this._resources.size > 0 ) {
      this.defaultResourceLanguage = this._resources.keys().next().value;
    }
    else {
      this.defaultResourceLanguage = this.DEFAULT_LANGUAGE;
    }
  }

  public get currentResource(): resourceType | undefined {
    return this._currentResource;
  }

  public async getStringAsync(key: string, params?: string[]): Promise<string> {
    if (this._currentResource?.language != this._selectedLanguage) {
      await this.setCurrentResourceAsync(this._selectedLanguage);
    }
    let localizedString = this._currentResource?.resource[key];
    if (!localizedString) {
      const defaultResource = this._resources.get(this.defaultResourceLanguage);
      localizedString = defaultResource![key];
      if (localizedString) {
        console.warn(`Resource '${key}' not found in ${this._currentResource.language}. Falling back to ${this.defaultResourceLanguage}.`);
      }
      else {
        console.warn(`Resource '${key}' not found.`);
        return `<< ${key} >>`;
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
