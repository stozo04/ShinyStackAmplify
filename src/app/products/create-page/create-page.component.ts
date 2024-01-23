import { Component, OnInit } from '@angular/core';
import { uploadData } from 'aws-amplify/storage';
import { Type, BullionType } from '../../shared/classes/product';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss'
})
export class CreatePageComponent implements OnInit {
  public themeLogo: string = 'assets/images/icon/logo-14.png'; // TODO: Change Logo
  selectedFile: File | undefined = undefined;
  typeOptions = Object.values(Type);
  bullionOptions = Object.values(BullionType);
  createCoinForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private toast: NgToastService,
    private productService: ProductService
  ) { }

  async ngOnInit(): Promise<void> {
    this.createCoinForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageKey: [''],
      pcgsURL: [''],
      type: ['', Validators.required],
      bullionType: ['', Validators.required],
      mintMark: [''],
      quantity: ['', Validators.required],
      purchasePrice: [''],
      weight: ['', Validators.required],
    });

  }

  public async addCoin(): Promise<void> {
    await this.productService.createProduct(this.createCoinForm.value);
    this.toast.success({ detail: "SUCCESS", summary: `Changes have been saved`, duration: 5000, position: 'topCenter' });
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
