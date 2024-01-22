import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ProductRename, Type, BullionType } from '../../shared/classes/product';
import { get, put } from 'aws-amplify/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { uploadData } from 'aws-amplify/storage';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss'
})
export class DetailsPageComponent implements OnInit {
  public themeLogo: string = '../../assets/images/icon/logo-14.png'; // Change Logo
  product$ = new BehaviorSubject<ProductRename>(null);
  productId: string;
  typeOptions = Object.values(Type);
  bullionOptions = Object.values(BullionType);
  selectedFile: File | undefined = undefined;
  editCoinForm: UntypedFormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder) {
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      console.log('params: ', params)
      this.productId = params.get('id');
    });

    this.editCoinForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      preSignedURL: ['', Validators.required],
      pcgsURL: [''],
      type: ['', Validators.required],
      bullionType: ['', Validators.required],
      mintMark: [''],
      quantity: ['', Validators.required],
      purchasePrice: [''],
      weight: ['', Validators.required],
    });

    // GET PRODUCT BY ID (WORKS)
    try {
      const restOperation = get({
        apiName: 'productsApi',
        path: '/products',
        options: {
          queryParams: {
            id: this.productId
          }
        }
      });
      const { body } = await restOperation.response;
      const json = await body.json() as unknown as ProductRename[];

      this.product$.next(json[0]);
      this.product$.subscribe(res => console.log('HERE: ', this.editCoinForm.patchValue(res)));
      console.log('GET call succeeded: ', json);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  }

  public async updateChanges(): Promise<void> {
    try {
      const restOperation = put({
        apiName: 'productsApi',
        path: `/products`,
        options: {
          body: this.editCoinForm.value,
          queryParams: {
            id: this.productId
          }
        }
      });
      const response = await restOperation.response;
      console.log('PUT call succeeded: ', response);
    } catch (err) {
      console.log('PUT call failed: ', err);
    }
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
