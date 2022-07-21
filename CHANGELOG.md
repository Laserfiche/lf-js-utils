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
- `jwtUtils` has been moved to `@laserfiche/lf-api-client-core`.

## 3.0.5

### Features

### Fixes

### Chore & Maintenance

- First stable release to NPM.


