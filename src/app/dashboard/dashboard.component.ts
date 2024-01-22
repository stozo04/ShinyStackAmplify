import { Component, OnInit } from '@angular/core';
import { getUrl, list, uploadData } from 'aws-amplify/storage';
import { get, post, put } from 'aws-amplify/api';
import { NewProduct } from '../shared/classes/product';
import { Type, BullionType } from '../shared/classes/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public themeLogo: string = 'assets/images/icon/logo-14.png'; // TODO: Change Logo
  selectedFile: File | undefined = undefined;
  typeOptions = Object.values(Type);
  bullionOptions = Object.values(BullionType);
  constructor() { }

  async ngOnInit(): Promise<void> {
    // POST PRODUCT (WORKS)
    // try {
    //   const product = {
    //     name: '1 oz Silver Buffalo Round',
    //     description: 'The 1 oz Silver Buffalo round captures the essence of American history and natural beauty in a tangible form. Struck from one troy ounce of .999 fine silver, the Silver Buffalo round offers investors a way to own physical Silver. Inspired by the iconic Buffalo Nickel designed by James Earle Fraser in 1913, this round pays homage to the rugged spirit of the American West. The obverse features a detailed profile of a Native American chief, exuding a sense of dignity and cultural significance. On the reverse, a powerful depiction of an American bison stands as a symbol of strength and the untamed wilderness. The 1 oz Silver Buffalo round not only celebrates America\'s past but also gives an accessible way to own a piece of Americana.',
    //     preSignedURL: "https://myproducts110247-develop.s3.us-west-2.amazonaws.com/public/silver_buffalo.jpg?x-amz-content-sha256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAXLVGJQXEGRSG5BPG%2F20240122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240122T155038Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDb2cFkPyY%2BB1xgNg2Ea7c%2F9dDnqts%2FVjYjtyAh20OVhAiEA0AFwBYBgCNf03y22ud1EziE2RlU%2BTanM6C0RX4wObnAqxAQISRAAGgw1MDYwODExNTA0MDgiDG8HWb3a2AAlQ3%2BZuSqhBMTkAr3KZNzeF9%2F8g5A595QdNv5SQaVwtKQp9g7oLld49rIloqA%2Bpdggg%2B4sNTqlzDUZuSn4WyAufjuxJOmnOA74TL5QSz3jy2Uave7NCnMgz4mZE6kEaZY3PoSKr5mXcQhsfNblE%2Fxd4AZTr3N0IUdMc9bwkQM1enxVQUpIlD8tRqJwe83HbihBu9bLX2EXaKuqASxfIHLTSu2%2B1mZCPAlN0r9anT0zIbzVnFm6ubcpMTxHj%2BO9gOauwA7Vh9xshNHvJwBAwMVThgpvRS4ZZzT5vpZ1McUdN%2Bnd7DMDmlkTQ1kDFT3medU%2B6%2F9Xw7i0rEg%2F9etNZT9fHh4wG1gKWqw6mxgQmwWlP1lQY0ymeAwTw2yKpchgsnkQH3OeBUTsURkOnt4CbFAUYEvmIdpIlMFKB5k8vTceA%2FYD%2BoB9Q46pBjrnjURYeBqAXzxw11XYgfBn31ChnXhABcCLMIRSXZ6ka7jOMvY2Rcbk7ZCajlyvbEVpa7ZFS11sI6ATThTDzrng1kAS3sIxAv8djVVR8wPK1QwAef4QSSAVqMbOYRuwpP%2BNF9yZ4H6o0t4Usb08ec9SXSD2jCl0aKOPZlxvEgbw0HFmZD7Jo1LiE3eP4ZOQK7lWrbgwzmpSWJMxOEK043e65DbVH0k%2Fom4IdFdQXwWklEYcBl8AL%2BQSwuz1ub4u%2F2YYc333bZL4vD8cgkLeojisRELkR8NtwSuhdCqfBGp6MM2duq0GOoUCGkTVH%2F5E%2BcTt6wbIAvWDJro%2FGKEbo20miPGk0bhY22wmPX67ZGz%2FDKh%2FRhPA7p70SPaI3WuTvlTy%2B2qfkJNi6cIjydrwDMiihnUt7%2BpMI2Tb4puPxAVwUZCxwYFQRkirpMZyH%2BP2Tqda%2BsURXWbzNMs5FmxRUTjM9ruXkbZammQDlEX0EWBJYvQHEn69DzazXS3OSSLLxFkWYFYA2z0S3M%2Fqi4qP4ztAehIOdHczFQIxAXAWM%2F9i%2Fz270T0uCFM2cF%2F1GRlR%2FU0XCUBd7PJbYLVCZa5v48qBfp1NFi5FvWOlYcZgjf0XHaGggKwZKVXrxd%2F4LuGVSW1seM%2FVjGMyJvqeG10f&X-Amz-Signature=ab523ab46fba74934ff626bc685b429455ba650c2405dd7cefb99b8a80cc3801",
    //     type: ProductType.SILVER,
    //     quantity: 20,
    //     purchasePrice: 24.30,
    //     weight: '1 Ounce'

    //   };
    //   const restOperation = put({
    //     apiName: 'productsApi',
    //     path: '/products',
    //     options: {
    //       body: product
    //     }
    //   });
    //   const response = await restOperation.response;
    //   console.log('PUT call succeeded: ', response);
    // } catch (err) {
    //   console.log('PUT call failed: ', err);
    // }


    // GET ALL IMAGES
    //   try {
    //     const response = await list({
    //       prefix: '',
    //       options: {
    //         listAll: true
    //       }
    //     });
    //     console.log('files: ', response)

    //     response.items.forEach(async image => {
    //       const url = await getUrl({ key: image.key });
    //       console.log('url: ', url)
    //     });
    //   } catch (error) {
    //     console.log('Error ', error);
    //   }
  }


  uploadImage = async () => {
    console.log('uploadImage')
    if (!this.selectedFile) {
      return;
    }
    try {
      const result = uploadData({
        key: this.selectedFile.name,
        data: this.selectedFile
      }).result;
      console.log('Succeeded: ', result);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  imageSelected = (e: Event) => {
    const input = e.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }
    console.log('input: ', input.files[0]);

    this.selectedFile = input.files[0];
    console.log('this.selectedFile: ', this.selectedFile);
  };
}
