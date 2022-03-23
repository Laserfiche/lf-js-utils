import { LfLocalizationService } from './lf-localization.service.js';
require('isomorphic-fetch');

describe('LfLocalizationService', () => {
  let lfLocalizationService: LfLocalizationService;

  // TODO: load from lf-resource-library
  const resourcesFolder = 'https://cdn.jsdelivr.net/npm/@laserfiche/laserfiche-ui-components-core@2.0.2--preview-1984093174/dist/i18n';

  beforeEach(() => {
    lfLocalizationService = new LfLocalizationService();
  });

  it('currentResource is undefined if language file does not exist in constructor and is not provided with initAsync', () => {
    expect(lfLocalizationService.currentResource).toEqual(undefined);
  });

  it('setLanguage does not set currentResource if language file does not exist in constructor and is not provided with initAsync', () => {
    lfLocalizationService.setLanguage('nonexistent');

    expect(lfLocalizationService.currentResource).toEqual(undefined);
  });

  it('setLanguage does not set currentResource if language file does not exist in constructor and is not provided with initAsync', () => {
    lfLocalizationService.setLanguage('fr-CA');

    expect(lfLocalizationService.currentResource).toEqual(undefined);
  });

  it('setLanguage assigns default language to the first language provided in constructor if specified does not exist', () => {
    const resources = new Map([['test', { 'TEST_STRING': 'test string' }]]);
    lfLocalizationService = new LfLocalizationService(resources);
    lfLocalizationService.setLanguage('fr-CA');

    expect(lfLocalizationService.currentResource?.language).toEqual('test');
  });

  it('setLanguage assigns specified language if specified exist', async () => {
    await lfLocalizationService.initResourcesFromUrlAsync(resourcesFolder + '/fr.json')
    lfLocalizationService.setLanguage('fr');

    expect(lfLocalizationService.currentResource?.language).toEqual('fr');
  });

  it('setLanguage assigns default language if specified does not exist, but default exist', async () => {
    await lfLocalizationService.initResourcesFromUrlAsync(resourcesFolder + '/en.json')
    lfLocalizationService.setLanguage('fr');

    expect(lfLocalizationService.currentResource?.language).toEqual('en');
  });

  it('setLanguage assigns language without area code if specified does not exist, but language without area code exists', async () => {
    await lfLocalizationService.initResourcesFromUrlAsync(resourcesFolder + '/fr.json')
    lfLocalizationService.setLanguage('fr-CA');

    expect(lfLocalizationService.currentResource?.language).toEqual('fr');
  });

  it('getString throws when no language specified', () => {
    // Arrange
    const stringKey: string = 'INVALID_FIELD_REQUIRED_FIELD_EMPTY';
    const error: string = 'current Resource not found. Call setLanguage to set current language.';

    // Assert
    expect(() => {
      lfLocalizationService.getString(stringKey)
    }).toThrow(error);
  });

  it('getString gets Spanish when spanish is specified', async () => {
    // Arrange
    const stringKey: string = 'EMPTY_FILE_EXPLORER';
    const spanishValue: string = 'Esta carpeta está vacía.';

    // Act
    await lfLocalizationService.initResourcesFromUrlAsync(resourcesFolder + '/es.json')
    lfLocalizationService.setLanguage('es');
    const localizedString = lfLocalizationService.getString(stringKey);

    // Assert
    expect(localizedString).toEqual(spanishValue);
  });

  it('formatString should not replace variables if there are no variables or params', () => {
    // Arrange
    const stringWithNoParams: string = 'Hi there';
    const params = undefined;

    // Act
    //@ts-ignore
    const formattedString: string = lfLocalizationService.formatString(stringWithNoParams, params);

    // Assert
    expect(formattedString).toEqual(stringWithNoParams);
  });

  it('formatString should not replace variables if there are no variables to replace', () => {
    // Arrange
    const stringWithNoParams: string = 'Hi there';
    const params = ['One', 'Two'];
    let hasError: boolean = false;

    // Act
    try {
      //@ts-ignore
      lfLocalizationService.formatString(stringWithNoParams, params);
    }
    catch {
      hasError = true;
    }

    // Assert
    expect(hasError).toBeTruthy();
  });

  it('formatString should format string with 1 variable', () => {
    // Arrange
    const stringWith1Param: string = 'Hi there ${0}';
    const params = ['Patrick'];

    // Act
    //@ts-ignore
    const formattedString: string = lfLocalizationService.formatString(stringWith1Param, params);

    // Assert
    const expectedFormattedString: string = 'Hi there Patrick';
    expect(formattedString).toEqual(expectedFormattedString);
  });

  it('formatString should format string with 3 variables', () => {
    // Arrange
    const stringWith3Params: string = 'Hi there ${0} ${2} ${1}';
    const params = ['Patrick', 'Spongebob', 'Sandy'];

    // Act
    //@ts-ignore
    const formattedString: string = lfLocalizationService.formatString(stringWith3Params, params);

    // Assert
    const expectedFormattedString: string = 'Hi there Patrick Sandy Spongebob';
    expect(formattedString).toEqual(expectedFormattedString);
  });

  it('formatString should throw error if there are too many params', () => {
    // Arrange
    const stringWith2Params: string = 'Hi there ${0} ${1}';
    const params = ['Patrick', 'Spongebob', 'Sandy'];
    let hasError: boolean = false;

    // Act
    try {
      //@ts-ignore
      lfLocalizationService.formatString(stringWith2Params, params);
    }
    catch {
      hasError = true;
    }

    // Assert
    expect(hasError).toBeTruthy();
  });

  it('formatString should throw error if there are too few params', () => {
    // Arrange
    const stringWith3Params: string = 'Hi there ${0} ${2} ${1}';
    const params = ['Patrick', 'Spongebob'];
    let hasError: boolean = false;

    // Act
    try {
      //@ts-ignore
      lfLocalizationService.formatString(stringWith3Params, params);
    }
    catch {
      hasError = true;
    }

    // Assert
    expect(hasError).toBeTruthy();
  });

  it('formatString should work for strings with 10+ variables', () => {
    // Arrange
    const stringWith10PlusParams: string = 'Hi there ${0} ${1} ${2} ${3} ${4} ${5} ${6} ${7} ${8} ${9} ${10} ${11}';
    const params = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];

    // Act
    //@ts-ignore
    const formattedString: string = lfLocalizationService.formatString(stringWith10PlusParams, params);

    // Assert
    const expectedFormattedString: string = 'Hi there zero one two three four five six seven eight nine ten eleven';
    expect(formattedString).toEqual(expectedFormattedString);
  });

  it('formatString should work for strings with variables that appear twice', () => {
    // Arrange
    const stringWithRepeatedParams: string = 'Hi there ${0} ${1} ${0}';
    const params = ['zero', 'one'];

    // Act
    //@ts-ignore
    const formattedString: string = lfLocalizationService.formatString(stringWithRepeatedParams, params);

    // Assert
    const expectedFormattedString: string = 'Hi there zero one zero';
    expect(formattedString).toEqual(expectedFormattedString);
  });

  it('formatString should throw error if variables are repeated, and there are too many params', () => {
    // Arrange
    const stringWithRepeatedParams: string = 'Hi there ${0} ${1} ${0}';
    const params = ['zero', 'one', 'zero'];
    let hasError: boolean = false;

    // Act
    try {
      //@ts-ignore
      lfLocalizationService.formatString(stringWithRepeatedParams, params);
    }
    catch {
      hasError = true;
    }

    // Assert
    expect(hasError).toBeTruthy();
  });

  it('should be able to set custom json', () => {
    const resources: Map<string, object> = new Map([['en', { "TEST_STRING": "test res" }], ['es', { "TEST_STRING": "prueba" }]]);
    lfLocalizationService = new LfLocalizationService(resources);

    let localizedString = lfLocalizationService.getString('TEST_STRING');
    expect(localizedString).toEqual('test res');

    lfLocalizationService.setLanguage('es');
    localizedString = lfLocalizationService.getString('TEST_STRING');
    expect(localizedString).toEqual('prueba');
  });

  it('should be able to set custom json, default to English if translation does not exist', () => {
    const resources: Map<string, object> = new Map([['en', { "TEST_STRING": "test res" }], ['es', { "TEST_STRING": "prueba" }]]);
    lfLocalizationService = new LfLocalizationService(resources);

    let localizedString = lfLocalizationService.getString('TEST_STRING');
    expect(localizedString).toEqual('test res');

    lfLocalizationService.setLanguage('ar');
    localizedString = lfLocalizationService.getString('TEST_STRING');
    expect(localizedString).toEqual('test res');
  });

  it('should be able to set custom json, fr-CA will default to fr if no fr-CA', () => {
    const resources: Map<string, object> = new Map([['en', { "TEST_STRING": "test res" }], ['fr', { "TEST_STRING": "french test" }]]);
    lfLocalizationService = new LfLocalizationService(resources);

    let localizedString = lfLocalizationService.getString('TEST_STRING');
    expect(localizedString).toEqual('test res');

    lfLocalizationService.setLanguage('fr-CA');
    localizedString = lfLocalizationService.getString('TEST_STRING');
    expect(localizedString).toEqual('french test');
  });

  it('should be able to set custom json, fr-CA should use fr-CA if exists', () => {
    const resources: Map<string, object> = new Map([['en', { "TEST_STRING": "test res" }], ['fr', { "TEST_STRING": "french test" }], ['fr-CA', { "TEST_STRING": "french CA test" }]]);
    lfLocalizationService = new LfLocalizationService(resources);

    let localizedString = lfLocalizationService.getString('TEST_STRING');
    expect(localizedString).toEqual('test res');

    lfLocalizationService.setLanguage('fr');
    localizedString = lfLocalizationService.getString('TEST_STRING');
    expect(localizedString).toEqual('french test');

    lfLocalizationService.setLanguage('fr-CA');
    localizedString = lfLocalizationService.getString('TEST_STRING');
    expect(localizedString).toEqual('french CA test');
  });

  it('should be able to set custom json, fr-CA will default to en if no fr-CA or no fr', () => {
    const resources: Map<string, object> = new Map([['en', { "TEST_STRING": "test res" }], ['es', { "TEST_STRING": "prueba" }]]);
    lfLocalizationService = new LfLocalizationService(resources);

    let localizedString = lfLocalizationService.getString('TEST_STRING');
    expect(localizedString).toEqual('test res');

    lfLocalizationService.setLanguage('fr-CA');
    localizedString = lfLocalizationService.getString('TEST_STRING');
    expect(localizedString).toEqual('test res');
  });

  it('should create pseudo language in debug mode for english', async () => {
    lfLocalizationService.debugMode = true;
    await lfLocalizationService.initResourcesFromUrlAsync(resourcesFolder + '/en.json');
    lfLocalizationService.setLanguage('en');

    expect(lfLocalizationService.getString('APPLY_CHANGES')).toEqual('_Ḓǿ ẏǿŭ ẇȧƞŧ ŧǿ ȧƥƥŀẏ ẏǿŭř ƒīḗŀḓ ƈħȧƞɠḗş?_');
  });

  it('should create pseudo language in debug mode for spanish', async () => {
    lfLocalizationService.debugMode = true;
    await lfLocalizationService.initResourcesFromUrlAsync(resourcesFolder + '/en.json');
    await lfLocalizationService.initResourcesFromUrlAsync(resourcesFolder + '/es.json');

    lfLocalizationService.setLanguage('es');

    expect(lfLocalizationService.getString('APPLY_CHANGES')).toEqual('_¿Ḓḗşḗȧ ȧƥŀīƈȧř şŭş ƈȧḿƀīǿş ḓḗ ƈȧḿƥǿ?_');
  });

  it('extractCodeFromUrl should extract the language code from url', () => {
    const url = 'https://cdn.jsdelivr.net/npm/@laserfiche/lf-resource-library@2.0.2--preview/laserfiche-base/en.json';
    const expectedCode = 'en';
    // @ts-ignore
    const receivedCode = lfLocalizationService.extractCodeFromUrl(url);

    expect(receivedCode).toEqual(expectedCode);
  });

  it('extractCodeFromUrl should extract the language code from url', () => {
    const url = 'https://cdn.jsdelivr.net/npm/@laserfiche/lf-resource-library@2.0.2--preview/laserfiche-base/en-US.json';
    const expectedCode = 'en-US';
    // @ts-ignore
    const receivedCode = lfLocalizationService.extractCodeFromUrl(url);

    expect(receivedCode).toEqual(expectedCode);
  });

  it('extractCodeFromUrl should extract the language code from url', () => {
    const url = 'https://cdn.jsdelivr.net/npm/@laserfiche/lf-resource-library@2.0.2--preview/laserfiche-base/zh-Hans.json';
    const expectedCode = 'zh-Hans';
    // @ts-ignore
    const receivedCode = lfLocalizationService.extractCodeFromUrl(url);

    expect(receivedCode).toEqual(expectedCode);
  });

  it('extractCodeFromUrl should throw if the url format is unexpected', () => {
    const url = 'https://cdn.jsdelivr.net/npm/@laserfiche/lf-resource-library@2.0.2--preview/laserfiche-base/zh-Hans-something.json';
    const error = 'Unexpected URL format.';

    expect(() => {
    // @ts-ignore
      lfLocalizationService.extractCodeFromUrl(url)
    }).toThrow(error);
  });
});