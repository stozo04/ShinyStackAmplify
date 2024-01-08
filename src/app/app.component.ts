import { Component, OnInit } from '@angular/core';
import { get, post, put } from 'aws-amplify/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ShinyStacks';
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
    try {
      const restOperation = get({
        apiName: 'productsApi',
        path: '/products'
      });
      const { body } = await restOperation.response;
      // consume as a string:
      // const str = await body.text();
      // OR consume as a blob:
      //const blob = await body.blob();
      // OR consume as a JSON:
      const json = await body.json();
      console.log('GET call succeeded!!');
      //console.log('str: ', str)
      //console.log('blob: ', blob)
      console.log('json: ', json)
    } catch (error) {
      console.log('GET call failed: ', error);
    }

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
  }
}
