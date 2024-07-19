import { Component, OnInit } from '@angular/core';
import { Format, BullionType } from '../../shared/classes/product';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ProductService } from 'src/app/shared/services/product.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

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
    private productService: ProductService,
    private auth: AuthService,
    private router: Router
  ) { }

  /**
   * Initializes the component by checking user login status and initialize form.
   */
  async ngOnInit(): Promise<void> {
    if (!this.auth.isUserAuthenticated()) {
      this.toast.error({ detail: "ERROR", summary: "Permission Denied", duration: 5000, position: 'topCenter' });
      this.router.navigate(['../login']);
    }
    console.log('initializeForm')
    this.initializeForm();

  }

  private initializeForm(): void {
    this.createCoinForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageKey: [''],
      pcgsURL: [''],
      format: [Format.COIN, Validators.required],
      bullionType: [BullionType.SILVER, Validators.required],
      mintMark: [''],
      quantity: [1, Validators.required],
      purchasePrice: [''],
      percentage: [''],
      year: [''],
      weight: ['', Validators.required],
    });

    this.createCoinForm.get('name')?.valueChanges.subscribe(value => {
      const { year, mintMark } = this.parseName(value);
      if (year) {
        this.createCoinForm.get('year')?.setValue(year, { emitEvent: false });
      }
      if (mintMark) {
        this.createCoinForm.get('mintMark')?.setValue(mintMark, { emitEvent: false });
      }
    });
  }

  private parseName(name: string): { year: string | null, mintMark: string | null } {
    const yearMatch = name.match(/\b(19|20)\d{2}\b/);
    const mintMarkMatch = name.match(/\(([A-Z])\)/);
    return {
      year: yearMatch ? yearMatch[0] : null,
      mintMark: mintMarkMatch ? mintMarkMatch[1] : null
    };
  }

  public async addCoin(): Promise<void> {
    await this.productService.createProduct(this.createCoinForm.value);
    this.toast.success({ detail: "SUCCESS", summary: `Changes have been saved`, duration: 5000, position: 'topCenter' });
    this.createCoinForm.reset();
    this.initializeForm();
    // Resetting the input field after successful upload
    const inputElement = document.getElementById('customFile') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = ''; // This clears the selected file from the input
    }

    this.selectedFile = null; // Resetting the selectedFile property
  }

  public async uploadImage(): Promise<void> {
    if (!this.selectedFile) {
      return;
    }

    (await this.productService.uploadImage(this.selectedFile)).subscribe({
      next: (imageKey: string) => { this.createCoinForm.get("imageKey").setValue(imageKey); },
      error: () => { this.toast.error({ detail: "Error", summary: `Error adding image`, duration: 5000, position: 'topCenter' }); }
    });
  };

  imageSelected = (e: Event) => {
    const input = e.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.selectedFile = input.files[0];
  };
}
