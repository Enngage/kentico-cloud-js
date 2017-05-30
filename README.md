# Kentico Cloud SDK for Angular 2

Developer's SDK for [KenticoCloud](https://kenticocloud.com/)

#### Installation

```
npm install kentico-cloud-angular2-sdk --save
```

#### Create model

```javascript
import { BaseItem, TextField, NumberField, RichTextField, DateTimeField } from 'kentico-cloud-angular2-sdk';

export class Character extends BaseItem {
  public name: TextField;

  constructor() {
    super()
  }
}
```

#### Setup factory provider for DeliveryClient

```javascript
// core
import { Http } from '@angular/http';

// kentico cloud
import { DeliveryClient, DeliveryClientConfig, TypeResolver } from 'kentico-cloud-angular2-sdk';

// models
import { Character } from './character.class';

export function DeliveryClientFactory(http: Http) {

    let apiUrl = 'https://deliver.kenticocloud.com';
    let projectId = 'yourProjectId';

    let typeResolvers: TypeResolver[] = [
        new TypeResolver("character", () => new Character()),
    ];

    return new DeliveryClient(
        http,
        new DeliveryClientConfig(apiUrl, projectId, typeResolvers)
    )
};

export var DeliveryClientProvider =
    {
        provide: DeliveryClient,
        useFactory: DeliveryClientFactory,
        deps: [Http]
    };

```

#### Use factory provider in app.module

```javascript
import { DeliveryClientFactory } from 'your-delivery-factory-provider';

@NgModule({
  providers: [
    DeliveryClientFactory
  ],
  bootstrap: [AppComponent],
})
```

##### Use in your component

```javascript
import { Component, OnInit } from '@angular/core';

// delivery client
import { DeliveryClient } from 'kentico-cloud-angular2-sdk';

// models
import { Character } from 'character.class';

@Component({
  templateUrl: 'sample.component.html',
})
export class SampleComponent implements OnInit {

  constructor(
    private deliveryClient: DeliveryClient
  ) {
  }

  ngOnInit(): void {
    this.deliveryClient.getItems<Character>("character").subscribe(response => console.log(response));
  }
}
```
##### Filtering

This example returns all 'character' items whose 'name' element is equal to 'Rimmer'. More info in [official documentation](https://developer.kenticocloud.com/v1/reference#content-filtering)

```javascript
this.deliveryClient.getItems<Character>("character",
      [
        new EqualsFilter("elements.name", "Rimmer")
      ])
      .subscribe(response => console.log(response));
```

Supported filters: **AllFilter**, **AnyFilter**, **ContainsFilter**, **EqualsFilter**, **GreaterThanFilter**, **GreaterThanOrEqualFilter**, **Infilter**, **LessThanFilter**, **LessThanOrEqualFilter**, **RangeFilter**

##### Using query parameters

Following example returns top 5 items of 'character' type. More info in [official documentation](https://developer.kenticocloud.com/v1/reference#listing-responses) 

```javascript
this.deliveryClient.getItems<Character>("character",
      [
        new LimitParameter(5)
      ])
      .subscribe(response => console.log(response));
```

Supported query parameters: **DepthParameter**, **ElementsParameter**, **LimitParameter**, **OrderAscParameter**, **OrderDescParameter**, **SkipParameter**

##### Models

Each model class need to extend 'BaseField' and each element needs to use one of supported fields. For example if you define a 'text' field in your content type, you need to use 'TextField' in your model:

```javascript
import { BaesField TextField, NumberField, AssetsField, RichTextField, DateTimeField } from 'kentico-cloud-angular-2-sdk';

export class Character extends BaseItem {
  public name: TextField;
  public age: NumberField;
  public birthdate: DateTimeField;
  public description: RichTextField;

  constructor() {
    super()
  }
}
```

##### Modelular content

It is possible to nest content types within content types:


```javascript
import { BaesField TextField, NumberField } from 'kentico-cloud-angular-2-sdk';

export class Character extends BaseItem {
  public name: TextField;
  public age: NumbeField;

  constructor() {
    super()
  }
}

export class Movie extends BaseItem {
  public movie: TextField;
  public release: NumberField;
  public characters: Character[]

  constructor() {
    super()
  }
}
```


##### Notes

- Only `Delivery API` is supported

