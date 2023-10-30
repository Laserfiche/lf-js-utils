<!--Copyright (c) Laserfiche.
Licensed under the MIT License. See LICENSE in the project root for license information.-->

## 4.0.8
### Features
- `LfMetadataValidationUtils`: add `isNullOrEmpty` to test if an string is consisted of white-space character
### Fixes

### Chore & Maintenance

## 4.0.7
### Features
- `LfLocalizationService`: If Language cookie exists in expected LF format, language will default to that UI culture
- Add `convertBytesToString` in `StringUtils` to convert a raw number of bytes to an abbreviated string (MB, GB, etc.)

### Fixes

### Chore & Maintenance

## 4.0.6
### Features

### Fixes

### Chore & Maintenance
- Update build pipeline to use Node 16

## 4.0.5
### Features

- `StringUtils` now contains `trimEnd` function remove all the trailing occurrences of a character from a string.

### Fixes

### Chore & Maintenance

## 4.0.4
### Features

- `IconUtils` references icon url from `lfxstatic` instead of `jsdelivr`.
- `localizationService` documentation references language resource files from `lfxstatic` instead of `jsdelivr`.

### Fixes

### Chore & Maintenance


## 4.0.3

### Features

- `localizationService` Change default language to be `en-US`.
  - example: 
    ```ts
    // this will throw an error "Required language resource en-US is not found in provided map."
    const resources = new Map([['en', { TEST_STRING: 'test string' }]]);
    let lfLocalizationService = new LfLocalizationService(resources);

    // change to this instead
    const resources = new Map([['en-US', { TEST_STRING: 'test string' }]]);
    let lfLocalizationService = new LfLocalizationService(resources);
    ```
- Requested language without culture will default to the closes language with culture.
  - example:
    ```ts
      let lfLocalizationService = new LfLocalizationService();
      lfLocalizationService.setLanguage('fr');
      await lfLocalizationService.initResourcesFromUrlAsync(...);
      lfLocalizationService.currentResource?.language => 'fr-FR';
    ```

### Fixes

- `localizationService` Fix localizationService returns en when requested zh-CN ([52](https://github.com/Laserfiche/lf-js-utils/issues/52)).
- `localizationService` Fix switching language from es to unavailable language resource does not default to en ([51](https://github.com/Laserfiche/lf-js-utils/issues/51)).

### Chore & Maintenance
- Compatible with `@laserfiche/resource-library@4`.

## 4.0.2

### Features
- Refactor utils and add general purpose `CoreUtils`.

### Fixes

### Chore & Maintenance

- Use `@laserfiche/resource-library@3`.
- Remove documentation in npm package.
- **[BREAKING]** `jwtUtils` has been moved to `@laserfiche/lf-api-client-core`.

## 3.0.5

### Features

### Fixes

### Chore & Maintenance

- First stable release to NPM.


