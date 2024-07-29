import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  
})
export class ContactUsComponent {
  form: FormGroup;
  stars = Array(5).fill(0);
  rating = 0;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      messageTitle: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      isAnonymous: [false],
      message: ['', Validators.required]
    });
  }

  rate(star: number) {
    this.rating = star;
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = {
        ...this.form.value,
        rating: this.rating
      };
      console.log('Form Data: ', formData);
      // Handle form submission
    }
  }
}
