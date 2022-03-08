# laserfiche-ui-components-core
This project contains utility functions to be used with Laserfiche projects.

# Getting started
```
npm install @laserfiche/laserfiche-ui-components-core
```
# Documenentation 

## LfLocalizationService

`LfLocalizationService` is a service that handles internationalization and localization, mapping text to its corresponding translated texts in the selected language. We provide [language resources files in JSON](https://github.com/Laserfiche/laserfiche-ui-components-core/tree/main/src/i18n), but you can also add your own translation resource following our API.

### Example Usage
```ts
import { LfLocalizationService } from '@laserfiche/laserfiche-ui-components-core';

// use default language resource
let localizationService: LfLocalizationService = new LfLocalizationService();
let loading = localizationService.getString('LOADING');  // loading -> "loading..."

// switch default language
localizationService.setDefaultLanguage('ar');
loading = localizationService.getString('LOADING');  // loading -> "جارٍ التحميل..."

// adding custom language resource
localizationService = new LfLocalizationService([
    ['jp', {
    "LOADING": "読み込み中..."
    }],
    ['ir', {
    "LOADING": "ag lódáil..."
    }],
]);
localizationService.setDefaultLanguage('ir');
loading = localizationService.getString('LOADING');  # loading -> "ag lódáil..."
```

### API

#### Properties

|Name | Description|
|--|--|
|debugMode: boolean| Default to false. TODO|
|readonly resources: Map<string, object>| The default language resource map. |
    
#### Methods

|Name | Description|
|--|--|
|constructor(resources?: Map<string, object>);       | Users can provide custom language resource, or use the provided language resources. |
|setLanguage(language: string): resourceType;        | Sets the default language. |
|get currentResource(): resourceType;                | Gets the current selected language's resource mapping. |
|getString(key: string, params?: string[]): string;  | Gets the translated key using the current selected language. |

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
  <td> ?    </td>
  <td> <pre> 
  const originalDateString: string = '2021-03-25';
  const deserializedDate: string = DatetimeUtils.deserializeDateValue(originalDateString);
  // ? </pre></td>
</tr>
<tr>
  <td> static serializeDateValue(date: Date | undefined): string | undefined  </td>
  <td> ?  </td>
  <td> <pre>
  const originalDateString: string = '2021-03-25T00:00:00-07:00';
  const dateWithOffset: Date = new Date(originalDateString);
  const serializedDate: string | undefined = DatetimeUtils.serializeDateValue(dateWithOffset);
  // serializedDate -> '2021-03-25T00:00:00' </pre> </td>
  </tr>
 <tr>
  <td>static isValidDate(date: Date): boolean  </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
 <tr>
  <td>static compareDateStrings(first: string, second: string): boolean  </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  </table>
  
## Other Utility Functions
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
  <td> convertBase64ToUint8Array(base64: string): Uint8Array </td>
  <td> ?    </td>
  <td> <pre> 
   </pre></td>
</tr>
<tr>
  <td> async convertReaderToBase64Async(reader: ReadableStreamDefaultReader<Uint8Array> | undefined)  </td>
  <td> ?  </td>
  <td> <pre>
   </pre> </td>
  </tr>
 <tr>
  <td> convertUint8ArrayToString(uint8array: Uint8Array): string  </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
 <tr>
  <td> convertStringToBase64(nonBase64String: string): string  </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
   <tr>
  <td> convertBase64toString(base64String: string): string  </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
     <tr>
  <td> clone<T>(object: T): T  </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  <tr>
  <td> filterObjectsByName<T extends ObjectWithName>(nodesToFilter?: T[], filterText?: string): T[] | undefined  </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  
   <tr>
  <td> getMIMETypeFromExtension(extension: string | undefined): string </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  
 <tr>
  <td> getIconPathFromExtension(ext: string | undefined, shortcut: boolean = false): string[] </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  
  <tr>
  <td>  getIconPathFromId(iconId: string, shortcut: boolean = false): string[]  </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  
 <tr>
  <td>  getSingleIconPathById(iconId: string)  </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  
 <tr>
  <td>  getIconIdFromExtension(ext: string | undefined): string   </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  
<tr>
  <td>  getBaseName(path: string): string   </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  
<tr>
  <td>  sanitizeFileName(fileName: string): string   </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  
  
<tr>
  <td>  removeFileExtension(fileName: string)   </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  
  
<tr>
  <td>  getFileExtension(fileName: string): string | undefined  </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  
  
<tr>
  <td>   combinePaths(path1: string, path2: string): string  </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  
 <tr>
  <td>  getCleanedExtension(extension: string | undefined): string | undefined </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  
<tr>
  <td>  getListOfFolderNames(path: string): string[]   </td>
  <td> ?  </td>
  <td> <pre> ?
   </pre> </td>
  </tr>
  
 </table>
  
 # Contribution
Please follow our [contributing guidelines]()
