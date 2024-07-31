import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactUsService } from 'src/app/core/services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    category: new FormControl('', [Validators.required]),
    isAnonymus: new FormControl(false),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    stars: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(5)])
  });
  stars = Array(5).fill(0);
  rating = 0;
  errorMessage: string | null = null;

  constructor(private contactUsService: ContactUsService, private router: Router) {
    this.form.get('isAnonymus')!.valueChanges.subscribe((isAnonymus) => {
      this.toggleAnonymity(isAnonymus);
    });
  }

  rate(star: number) {
    this.rating = star;
    this.form.get('stars')?.setValue(star);  // Set the rating value in the form control
  }

  onSubmit() {
    if (this.form.valid) {
      const nameControl = this.form.get('name');
      const emailControl = this.form.get('email');

      if (nameControl?.disabled) {
        nameControl.enable();
      }
      if (emailControl?.disabled) {
        emailControl.enable();
      }
      this.contactUsService.submitFeedback(this.convertFormValues(this.form.value)).subscribe({
        next: (response) => {
          console.log('Feedback submitted successfully', response);
          this.router.navigate(['10q4urfb']);
        },
        error: (error) => {
          console.error('Error submitting feedback', error);
          this.errorMessage = error.error?.title || 'An unexpected error occurred';
        },
      });
    } else {
      console.log('Form is invalid');
      this.errorMessage = 'Please fill in all required fields';
    }
  }

  private convertFormValues(values: any): any {
    return {
      ...values,
      category: parseInt(values.category, 10)
    };
  }

  toggleAnonymity(isAnonymus: boolean) {
    const nameControl = this.form.get('name');
    const emailControl = this.form.get('email');
    
    if (isAnonymus) {
      nameControl!.setValue('-');
      nameControl!.disable();
      emailControl!.setValue('-');
      emailControl!.disable();
    } else {
      nameControl!.setValue('');
      nameControl!.enable();
      emailControl!.setValue('');
      emailControl!.enable();
    }
  }
}
