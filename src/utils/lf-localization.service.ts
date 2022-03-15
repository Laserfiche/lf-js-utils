export type resourceType = { language: string, resource: object };

export class LfLocalizationService {
  private readonly DEFAULT_LANGUAGE: string = 'en';

  private defaultResourceLanguage: string = '';
  private _currentResource!: resourceType;

  constructor(resources?: Map<string, object>) {
    if (!resources) {
      resources = new Map();
    }
    if (resources.size === 0) {
      console.warn('No resources defined. Resources must be added.');
    }
    this.resources = resources;
    this.setDefaultLanguage();
    this.setLanguage(navigator?.language ?? this.DEFAULT_LANGUAGE);
  }

  public async addResourceFromUrl(url: string, code: string) {
    await fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(json => {
      this.resources.set(code, json);
    })
  }

  public debugMode: boolean = false;
  public readonly resources: Map<string, object>;

  public setLanguage(language: string): resourceType {
    const resource = this.resources.get(language);

    if (resource) {
      this._currentResource = { language, resource };
    }
    else {
      const languageWithoutDash: string = language.split('-')[0];
      const customShorterStringResources = this.resources.get(languageWithoutDash);
      if (customShorterStringResources) {
        this._currentResource = { language: languageWithoutDash, resource: customShorterStringResources };
      }
      else {
        const defaultResources = this.resources.get(this.defaultResourceLanguage);
        this._currentResource = { language: this.defaultResourceLanguage, resource: defaultResources! };
      }
    }
    return this._currentResource;
  }

  private setDefaultLanguage() {
    if (this.resources.get(this.DEFAULT_LANGUAGE)) {
      this.defaultResourceLanguage = this.DEFAULT_LANGUAGE;
    }
    else {
      this.defaultResourceLanguage = this.resources.keys().next().value;
    }
  }

  public get currentResource(): resourceType {
    return this._currentResource;
  }

  public getString(key: string, params?: string[]): string {
    let localizedString = this._currentResource.resource[key];
    if (!localizedString) {
      const defaultResource = this.resources.get(this.defaultResourceLanguage);
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
