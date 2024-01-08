import { Component, OnInit } from '@angular/core';
import { get, post } from 'aws-amplify/api';

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
    //   const restOperation = post({
    //     apiName: 'itemsApi',
    //     path: '/items',
    //     options: {
    //       body: {
    //         message: 'Mow the lawn'
    //       }
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
        apiName: 'itemsApi',
        path: '/items'
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
  }
}
