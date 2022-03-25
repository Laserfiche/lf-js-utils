## LfLocalizationService

`LfLocalizationService` is a service that handles internationalization and localization, mapping text to its corresponding translated texts in the selected language. We provide [language resources files in JSON](https://github.com/Laserfiche/laserfiche-ui-components-core/tree/main/src/i18n), but you can also add your own translation resource following our API.

### Example Usage
```ts
import { LfLocalizationService } from '@laserfiche/lf-js-utils';

// use default language resource
let localizationService: LfLocalizationService = new LfLocalizationService();
let loading = localizationService.getString('LOADING');  // loading -> "loading..."

// switch default language
localizationService.setLanguage('ar');
loading = localizationService.getString('LOADING');  // loading -> "جارٍ التحميل..."

// add custom language resource
let localizationService = new LfLocalizationService(new Map([
  ['jp', {
  "LOADING": "読み込み中..."
  }],
  ['ir', {
  "LOADING": "ag lódáil..."
  }]
]));
localizationService.setLanguage('ir');
loading = localizationService.getString('LOADING');  // loading -> "ag lódáil..."

// add external resource
lfLocalizationService.setLanguage('fr');
localizationService.initResourcesFromUrlAsync('https://cdn.jsdelivr.net/npm/@laserfiche/laserfiche-ui-components-core@2.0.2--preview-1984093174/dist/i18n');
loading = localizationService.getString('LOADING');  // loading -> "Charger..."
```

### API

#### Properties

|Name | Description|
|--|--|
|debugMode: boolean| When true, returns pseudo language string. Defaults to false. |
|readonly resources: Map<string, object>| The default language resource map. |
    
#### Methods

|Name | Description|
|--|--|
|constructor(resources?: Map<string, object>);       | Users can provide languages resources through a map in the constructor, or later with a url via initResourcesFromUrlAsync. |
|setLanguage(language: string): void;        | Sets the default language. |
|get currentResource(): resourceType | undefined;                | Gets the current selected language's resource mapping. |
|getString(key: string, params?: string[]): string;  | Gets the translated key using the current selected language. Returns key if no resource is found in selected language or english. |
|initResourcesFromUrlAsync(url: string): Promise<void>;  | Initializes the service with the selected language, given the url to a folder containing resources.

#### Types


resourceType  = { language: string, resource: object };

## DatetimeUtils
`DatetimeUtils` is a collection of utility methods that handles basic datetime 

<table>
<tr>
<th>
Name
</th>
<th>
Description
</th>
<th>
Example
</th>
</tr>
<tr>
  <td> static deserializeDateValue(date: string \| undefined): string </td>
  <td>  Given a string reprentation of a date with no timezone offset, returns the string representation of the date including the user's timezone offset.  </td>
  <td> <pre> 
  const originalDateString: string = '2021-03-25';
  const deserializedDate: string = DatetimeUtils.deserializeDateValue(originalDateString);
  // deserializedDate -> '2021-03-25T00:00:00.000Z', adds timezone offset </pre></td>
</tr>
<tr>
  <td> static serializeDateValue(date: Date | undefined): string | undefined  </td>
  <td> Removes the timezone offset of the given date and returns the ISO string format without the offset (YYYY-MM-DDTHH:MM:SS) </td>
  <td> <pre>
  const originalDateString: string = '2021-03-25T00:00:00-07:00'; // assume the offset matches the timezone (PDT)
  const dateWithOffset: Date = new Date(originalDateString);
  const serializedDate: string | undefined = DatetimeUtils.serializeDateValue(dateWithOffset);
  // serializedDate -> '2021-03-25T00:00:00', removes the offset </pre> </td>
  </tr>
  </table>
  