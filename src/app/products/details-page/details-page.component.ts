import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductRename, Type, BullionType } from '../../shared/classes/product';
import { get, put } from 'aws-amplify/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { uploadData } from 'aws-amplify/storage';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

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
  breadCrumbTitle: string;
  breadCrumbPath: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private toast: NgToastService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      this.breadCrumbTitle = params.get('type') + " Collection";
      this.breadCrumbPath = params.get('format');
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

    this.loadCoinDetails();
  }

  private async loadCoinDetails(): Promise<void> {
    // GET PRODUCT BY ID (WORKS)
    try {
      const restOperation = get({
        apiName: 'productsApi',
        path: `/products/object/${this.productId}`,
      });
      const { body } = await restOperation.response;
      const json = await body.json() as unknown as ProductRename;
      this.product$.next(json);
      this.product$.subscribe(res => this.editCoinForm.patchValue(res));

    } catch (error) {
      this.toast.error({ detail: "ERROR", summary: `Error loading data: ${error.err}`, duration: 5000, position: 'topCenter' });
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
      this.toast.success({ detail: "SUCCESS", summary: `Changes have been saved`, duration: 5000, position: 'topCenter' });
      this.loadCoinDetails();
    } catch (error) {
      this.toast.error({ detail: "ERROR", summary: `Error saving data: ${error.err}`, duration: 5000, position: 'topCenter' });
      console.log('PUT call failed: ', error);
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
      this.toast.success({ detail: "SUCCESS", summary: `File Uploaded`, duration: 5000, position: 'topCenter' });
    } catch (error) {
      this.toast.error({ detail: "ERROR", summary: `Error uploading file: ${error.err}`, duration: 5000, position: 'topCenter' });
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
