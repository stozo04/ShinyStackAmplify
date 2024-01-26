import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, Format, BullionType } from '../../shared/classes/product';
import { Observable } from 'rxjs';
import { uploadData } from 'aws-amplify/storage';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss'
})
export class DetailsPageComponent implements OnInit {
  public themeLogo: string = '../../assets/images/icon/logo-14.png'; // Change Logo
  product$: Observable<Product>;
  productId: string;
  formatOptions = Object.values(Format);
  bullionOptions = Object.values(BullionType);
  selectedFile: File | undefined = undefined;
  editCoinForm: UntypedFormGroup;
  breadcrumb: string;
  breadcrumbRoute: string;
  breadcrumbTitle: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private toast: NgToastService,
    private productService: ProductService,
    private router: Router,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      this.breadcrumbTitle = params.get('type') + " Collection";
      this.breadcrumb = `${params.get('format')}`;
      this.breadcrumbRoute = `/products/${params.get('type')}/${params.get('format')}/list`;
    });

    this.editCoinForm = this.formBuilder.group({
      id: ['', Validators.required],
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
      weight: ['', Validators.required],
    });

    this.loadCoinDetails();
  }

  private async loadCoinDetails(): Promise<void> {
    this.product$ = await this.productService.getProduct(this.productId, true);
    this.product$.subscribe(res => this.editCoinForm.patchValue(res));
  }

  public async updateChanges(): Promise<void> {
    this.product$ = await this.productService.updateProduct(this.editCoinForm.value);
    this.toast.success({ detail: "SUCCESS", summary: `Changes have been saved`, duration: 5000, position: 'topCenter' });
  }

  public async deleteCoin(): Promise<void> {
    this.product$ = await this.productService.deleteProduct(this.productId);
    this.toast.success({ detail: "SUCCESS", summary: `Coin was deleted`, duration: 5000, position: 'topCenter' });
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  uploadImage = async () => {
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
