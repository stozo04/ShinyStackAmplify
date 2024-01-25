import { Component, OnInit } from '@angular/core';
import { uploadData } from 'aws-amplify/storage';
import { Format, BullionType } from '../../shared/classes/product';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from 'src/app/shared/services/product.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss'
})
export class CreatePageComponent implements OnInit {
  public themeLogo: string = 'assets/images/icon/logo-14.png'; // TODO: Change Logo
  selectedFile: File | undefined = undefined;
  formatOptions = Object.values(Format);
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
      format: ['', Validators.required],
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
    if (!this.selectedFile) {
      return;
    }
    try {
      const result = uploadData({
        key: uuidv4(),
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

    this.selectedFile = input.files[0];
  };
}
