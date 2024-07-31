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
    category: new FormControl(0, [Validators.required]),
    isAnonymus: new FormControl(false),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    stars: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(5)])
  });
  stars = Array(5).fill(0);
  rating = 0;

  constructor(private contactUsService: ContactUsService, private router: Router) {
  }

  rate(star: number) {
    this.rating = star;
    this.form.get('stars')?.setValue(star);  // Set the rating value in the form control
  }

  onSubmit() {
    if (this.form.valid) {
      this.contactUsService.submitFeedback(this.convertFormValues(this.form.value)).subscribe({
        next: (response) => {
          console.log('Feedback submitted successfully', response);
          this.router.navigate(['10q4urfb']);
        },
        error: (error) => {
          console.error('Error submitting feedback', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  private convertFormValues(values: any): any {
    return {
      ...values,
      category: parseInt(values.category, 10)
    };
  }
}
