import { Component, OnInit } from '@angular/core';
import { get, post, put } from 'aws-amplify/api';
import { uploadData, list, getUrl } from 'aws-amplify/storage';


export interface Image {
  key: string;
  url: URL;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  title = 'ShinyStacks';
  selectedFile: File | undefined = undefined
  images: Image[] = [];
  async ngOnInit() {
    // POST
    // try {
    //   const todo = {
    //     id: '1',
    //     name: '2019 American Silver Eagle',
    //     description: 'This is my description of my very first product!',
    //     price: 89.99
    //   };
    //   const restOperation = post({
    //     apiName: 'productsApi',
    //     path: '/products',
    //     options: {
    //       body: todo
    //     }
    //   });
    //   await restOperation.response;
    //   console.log('POST call succeeded');
    //   console.log(restOperation.response);
    // } catch (e) {
    //   console.log('POST call failed: ', e);
    // }


    // GET
    // try {
    //   const restOperation = get({
    //     apiName: 'productsApi',
    //     path: '/products'
    //   });
    //   const { body } = await restOperation.response;
    //   // consume as a string:
    //   // const str = await body.text();
    //   // OR consume as a blob:
    //   //const blob = await body.blob();
    //   // OR consume as a JSON:
    //   const json = await body.json();
    //   console.log('GET call succeeded!!');
    //   //console.log('str: ', str)
    //   //console.log('blob: ', blob)
    //   console.log('json: ', json)
    // } catch (error) {
    //   console.log('GET call failed: ', error);
    // }

    // PUT
    //   try {
    //     const todo = { name: 'My first todo', message: 'Hello world!' };
    //     const restOperation = put({
    //       apiName: 'itemsApi',
    //       path: 'items/2',
    //       options: {
    //         body: todo
    //       }
    //     });
    //     const response = await restOperation.response;
    //     console.log('PUT call succeeded: ', response);
    //   } catch (err) {
    //     console.log('PUT call failed: ', err);
    //   }

    // GET ALL IMAGES
    this.getAllImages();
  }

  imageSelected = (e: Event) => {
    const input = e.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.selectedFile = input.files[0];
  };

  uploadImage = async () => {
    if (!this.selectedFile) {
      return;
    }
    console.log('file: ', this.selectedFile)
    try {
      const result = await uploadData({
        key: this.selectedFile.name,
        data: this.selectedFile
      }).result;
      console.log('Succeeded: ', result);
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  getAllImages = async () => {
    try {
      list({
        options: {
          listAll: true
        }
      }).then(result => {
        result.items.forEach(async imageObject => {
          const objectKey = imageObject.key;

          if (objectKey !== undefined) {
            const signedURL = await getUrl({
              key: objectKey
            });

            console.log('signed URL: ', signedURL.url);
            this.images.push({ key: objectKey, url: signedURL.url });
          }
        })
      });
    } catch (error) {
      console.log(error);
    }
  };

  removeImage = async (key: string) => {
    // await Storage.remove(key, { level: 'private' });
    // this.images = [];
    // this.getAllImages();
  };
}
