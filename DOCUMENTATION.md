## LfLocalizationService

`LfLocalizationService` is a service that handles internationalization and localization, mapping text to its corresponding translated texts in the selected language. We provide lf-resource-library(coming soon), but you can also add your own translation resource map following our API.

### Example Usage
```ts
import { LfLocalizationService } from '@laserfiche/laserfiche-ui-components-core';

// use default language resource
let localizationService: LfLocalizationService = new LfLocalizationService('https://cdn.jsdelivr.net/npm/@laserfiche/laserfiche-ui-components-core@2.0.2--preview-1984093174/dist/i18n');
let loading = await localizationService.getStringAsync('LOADING');  // loading -> "loading..."

// switch default language
localizationService.setLanguage('ar');
loading = await localizationService.getStringAsync('LOADING');  // loading -> "جارٍ التحميل..."

// adding custom language resource
let localizationService = new LfLocalizationService(new Map([
  ['jp', {
  "LOADING": "読み込み中..."
  }],
  ['ir', {
  "LOADING": "ag lódáil..."
  }]
]));
localizationService.setLanguage('ir');
loading = await localizationService.getStringAsync('LOADING');  // loading -> "ag lódáil..."
```

### API

#### Properties

|Name | Description|
|--|--|
|debugMode: boolean| Default to false. In debug mode, getStringAsync returns the pseudo language of the translated string.|
    
#### Methods

|Name | Description|
|--|--|
|constructor(resources?: Map<string, object> | string);       | Users can provide custom language resource map or an url pointing to the folder of the resource files. |
|setLanguage(language: string): resourceType;        | Sets the default language. |
|get currentResource(): resourceType | undefined;                | Gets the current selected language's resource mapping, can be undefined because we lazy load resource at getStringAsync. |
|async getStringAsync(key: string, params?: string[]): string;  | Load the resource file if necessary, and gets the translated key using the current selected language.  |
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
  <td>  Takes in a timezone-less string representation of a date, and reconstruct the date given the client's timezone, returns the date with timezone in string.  </td>
  <td> <pre> 
  const originalDateString: string = '2021-03-25';
  const deserializedDate: string = DatetimeUtils.deserializeDateValue(originalDateString);
  // deserializedDate -> '2021-03-25T00:00:00.000Z', adds timezone offset </pre></td>
</tr>
<tr>
  <td> static serializeDateValue(date: Date | undefined): string | undefined  </td>
  <td> Removes the timezone offset of the given date and returns the ISO string format without the offset (YYYY-MM-DDTHH:MM:SS) </td>
  <td> <pre>
  const originalDateString: string = '2021-03-25T00:00:00-07:00'; // assume the offset is the timezone is in PDT
  const dateWithOffset: Date = new Date(originalDateString);
  const serializedDate: string | undefined = DatetimeUtils.serializeDateValue(dateWithOffset);
  // serializedDate -> '2021-03-25T00:00:00', removes the offset </pre> </td>
  </tr>
  </table>
  