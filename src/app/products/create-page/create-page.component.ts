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
    this.productService.getAllImages();
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
      percentage: [''],
      year: [''],
      weight: ['', Validators.required],
    });
  }

  public async addCoin(): Promise<void> {
    await this.productService.createProduct(this.createCoinForm.value);
    this.toast.success({ detail: "SUCCESS", summary: `Changes have been saved`, duration: 5000, position: 'topCenter' });
  }

  public async uploadImage(): Promise<void> {
    if (!this.selectedFile) {
      return;
    }

    this.productService.uploadImage(this.selectedFile);
  };

  imageSelected = (e: Event) => {
    const input = e.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.selectedFile = input.files[0];
  };
}
