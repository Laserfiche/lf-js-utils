// import { LfLocalizationService } from './lf-localization.service.js';


// describe('LfLocalizationService', () => {
//   let lfLocalizationService: LfLocalizationService;

//   beforeEach(() => {
//     lfLocalizationService = new LfLocalizationService();
//   });

//   it('setLanguage assigns default language if specified does not exist', () => {
//     lfLocalizationService.setLanguage('nonexistent');

//     expect(lfLocalizationService.currentResource.language).toEqual('en');
//   });

//   it('setLanguage assigns default language if specified does not exist', () => {
//     lfLocalizationService.setLanguage('fr-CA');

//     expect(lfLocalizationService.currentResource.language).toEqual('fr');
//   });

//   it('setLanguage assigns default language if specified does not exist', () => {
//     const resources = new Map([['test', {'TEST_STRING': 'test string'}]])
//     lfLocalizationService = new LfLocalizationService(resources);

//     lfLocalizationService.setLanguage('fr-CA');

//     expect(lfLocalizationService.currentResource.language).toEqual('test');
//   });

//   it('getString gets English when no language specified', () => {
//     // Arrange
//     const stringKey: string = 'INVALID_FIELD_REQUIRED_FIELD_EMPTY';
//     const englishValue: string = 'Required field is empty';

//     // Act
//     const localizedString = lfLocalizationService.getString(stringKey);

//     // Assert
//     expect(localizedString).toEqual(englishValue);
//   });

//   it('getString gets Spanish when spanish is specified', () => {
//     // Arrange
//     const stringKey: string = 'EMPTY_FILE_EXPLORER';
//     const spanishValue: string = 'Esta carpeta está vacía.';

//     // Act
//     lfLocalizationService.setLanguage('es');
//     const localizedString = lfLocalizationService.getString(stringKey);

//     // Assert
//     expect(localizedString).toEqual(spanishValue);
//   });

//   it('formatString should not replace variables if there are no variables or params', () => {
//     // Arrange
//     const stringWithNoParams: string = 'Hi there';
//     const params = undefined;

//     // Act
//     //@ts-ignore
//     const formattedString: string = lfLocalizationService.formatString(stringWithNoParams, params);

//     // Assert
//     expect(formattedString).toEqual(stringWithNoParams);
//   });

//   it('formatString should not replace variables if there are no variables to replace', () => {
//     // Arrange
//     const stringWithNoParams: string = 'Hi there';
//     const params = ['One', 'Two'];
//     let hasError: boolean = false;

//     // Act
//     try {
//       //@ts-ignore
//       lfLocalizationService.formatString(stringWithNoParams, params);
//     }
//     catch {
//       hasError = true;
//     }

//     // Assert
//     expect(hasError).toBeTruthy();
//   });

//   it('formatString should format string with 1 variable', () => {
//     // Arrange
//     const stringWith1Param: string = 'Hi there ${0}';
//     const params = ['Patrick'];

//     // Act
//     //@ts-ignore
//     const formattedString: string = lfLocalizationService.formatString(stringWith1Param, params);

//     // Assert
//     const expectedFormattedString: string = 'Hi there Patrick';
//     expect(formattedString).toEqual(expectedFormattedString);
//   });

//   it('formatString should format string with 3 variables', () => {
//     // Arrange
//     const stringWith3Params: string = 'Hi there ${0} ${2} ${1}';
//     const params = ['Patrick', 'Spongebob', 'Sandy'];

//     // Act
//     //@ts-ignore
//     const formattedString: string = lfLocalizationService.formatString(stringWith3Params, params);

//     // Assert
//     const expectedFormattedString: string = 'Hi there Patrick Sandy Spongebob';
//     expect(formattedString).toEqual(expectedFormattedString);
//   });

//   it('formatString should throw error if there are too many params', () => {
//     // Arrange
//     const stringWith2Params: string = 'Hi there ${0} ${1}';
//     const params = ['Patrick', 'Spongebob', 'Sandy'];
//     let hasError: boolean = false;

//     // Act
//     try {
//       //@ts-ignore
//       lfLocalizationService.formatString(stringWith2Params, params);
//     }
//     catch {
//       hasError = true;
//     }

//     // Assert
//     expect(hasError).toBeTruthy();
//   });

//   it('formatString should throw error if there are too few params', () => {
//     // Arrange
//     const stringWith3Params: string = 'Hi there ${0} ${2} ${1}';
//     const params = ['Patrick', 'Spongebob'];
//     let hasError: boolean = false;

//     // Act
//     try {
//       //@ts-ignore
//       lfLocalizationService.formatString(stringWith3Params, params);
//     }
//     catch {
//       hasError = true;
//     }

//     // Assert
//     expect(hasError).toBeTruthy();
//   });

//   it('formatString should work for strings with 10+ variables', () => {
//     // Arrange
//     const stringWith10PlusParams: string = 'Hi there ${0} ${1} ${2} ${3} ${4} ${5} ${6} ${7} ${8} ${9} ${10} ${11}';
//     const params = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];

//     // Act
//     //@ts-ignore
//     const formattedString: string = lfLocalizationService.formatString(stringWith10PlusParams, params);

//     // Assert
//     const expectedFormattedString: string = 'Hi there zero one two three four five six seven eight nine ten eleven';
//     expect(formattedString).toEqual(expectedFormattedString);
//   });

//   it('formatString should work for strings with variables that appear twice', () => {
//     // Arrange
//     const stringWithRepeatedParams: string = 'Hi there ${0} ${1} ${0}';
//     const params = ['zero', 'one'];

//     // Act
//     //@ts-ignore
//     const formattedString: string = lfLocalizationService.formatString(stringWithRepeatedParams, params);

//     // Assert
//     const expectedFormattedString: string = 'Hi there zero one zero';
//     expect(formattedString).toEqual(expectedFormattedString);
//   });

//   it('formatString should throw error if variables are repeated, and there are too many params', () => {
//     // Arrange
//     const stringWithRepeatedParams: string = 'Hi there ${0} ${1} ${0}';
//     const params = ['zero', 'one', 'zero'];
//     let hasError: boolean = false;

//     // Act
//     try {
//       //@ts-ignore
//       lfLocalizationService.formatString(stringWithRepeatedParams, params);
//     }
//     catch {
//       hasError = true;
//     }

//     // Assert
//     expect(hasError).toBeTruthy();
//   });

//   it('should be able to set custom json', () => {
//     const resources: Map<string, object> = new Map([['en', { "TEST_STRING": "test res" }], ['es', { "TEST_STRING": "prueba" }]]);
//     lfLocalizationService = new LfLocalizationService(resources);

//     let localizedString = lfLocalizationService.getString('TEST_STRING');
//     expect(localizedString).toEqual('test res');

//     lfLocalizationService.setLanguage('es');
//     localizedString = lfLocalizationService.getString('TEST_STRING');
//     expect(localizedString).toEqual('prueba');
//   });

//   it('should be able to set custom json, default to English if translation does not exist', () => {
//     const resources: Map<string, object> = new Map([['en', { "TEST_STRING": "test res" }], ['es', { "TEST_STRING": "prueba" }]]);
//     lfLocalizationService = new LfLocalizationService(resources);

//     let localizedString = lfLocalizationService.getString('TEST_STRING');
//     expect(localizedString).toEqual('test res');

//     lfLocalizationService.setLanguage('ar');
//     localizedString = lfLocalizationService.getString('TEST_STRING');
//     expect(localizedString).toEqual('test res');
//   });

//   it('when empty map of custom resources, throw error', () => {
//     expect(() => new LfLocalizationService(new Map())).toThrow();
//   });

//   it('should be able to set custom json, fr-CA will default to fr if no fr-CA', () => {
//     const resources: Map<string, object> = new Map([['en', { "TEST_STRING": "test res" }], ['fr', { "TEST_STRING": "french test" }]]);
//     lfLocalizationService = new LfLocalizationService(resources);

//     let localizedString = lfLocalizationService.getString('TEST_STRING');
//     expect(localizedString).toEqual('test res');

//     lfLocalizationService.setLanguage('fr-CA');
//     localizedString = lfLocalizationService.getString('TEST_STRING');
//     expect(localizedString).toEqual('french test');
//   });

//   it('should be able to set custom json, fr-CA should use fr-CA if exists', () => {
//     const resources: Map<string, object> = new Map([['en', { "TEST_STRING": "test res" }], ['fr', { "TEST_STRING": "french test" }], ['fr-CA', { "TEST_STRING": "french CA test" }]]);
//     lfLocalizationService = new LfLocalizationService(resources);

//     let localizedString = lfLocalizationService.getString('TEST_STRING');
//     expect(localizedString).toEqual('test res');

//     lfLocalizationService.setLanguage('fr');
//     localizedString = lfLocalizationService.getString('TEST_STRING');
//     expect(localizedString).toEqual('french test');

//     lfLocalizationService.setLanguage('fr-CA');
//     localizedString = lfLocalizationService.getString('TEST_STRING');
//     expect(localizedString).toEqual('french CA test');
//   });

//   it('should be able to set custom json, fr-CA will default to en if no fr-CA or no fr', () => {
//     const resources: Map<string, object> = new Map([['en', { "TEST_STRING": "test res" }], ['es', { "TEST_STRING": "prueba" }]]);
//     lfLocalizationService = new LfLocalizationService(resources);

//     let localizedString = lfLocalizationService.getString('TEST_STRING');
//     expect(localizedString).toEqual('test res');

//     lfLocalizationService.setLanguage('fr-CA');
//     localizedString = lfLocalizationService.getString('TEST_STRING');
//     expect(localizedString).toEqual('test res');
//   });

//   it('should create pseudo language in debug mode for english', () => {
//     lfLocalizationService.debugMode = true;

//     expect(lfLocalizationService.getString('APPLY_CHANGES')).toEqual('_Ḓǿ ẏǿŭ ẇȧƞŧ ŧǿ ȧƥƥŀẏ ẏǿŭř ƒīḗŀḓ ƈħȧƞɠḗş?_');
//   });

//   it('should create pseudo language in debug mode for spanish', () => {
//     lfLocalizationService.debugMode = true;

//     lfLocalizationService.setLanguage('es');

//     expect(lfLocalizationService.getString('APPLY_CHANGES')).toEqual('_¿Ḓḗşḗȧ ȧƥŀīƈȧř şŭş ƈȧḿƀīǿş ḓḗ ƈȧḿƥǿ?_');
//   });
// });
