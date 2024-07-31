import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { FeedbackFiltersDto } from 'src/app/core/models/feedback.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  // form: FormGroup;
  // name: FormControl = new FormControl('');
  errorMessage: string | null = null;

  name: string = '';
  byName: string[] = [];

  email: string = '';
  byEmail: string[] = [];

  title: string = '';
  byTitle: string[] = [];

  startDate: Date | null = null;
  endDate: Date | null = null;
  isAnonymus: boolean = false;

  form = new FormGroup({
    name: new FormControl(this.byName),
    email: new FormControl(this.byEmail, [Validators.email]),
    title: new FormControl(this.byTitle),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    stars: new FormControl([]),
    isAnonymus: new FormControl(undefined),
    category: new FormControl([])
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.feedbackService.getFeedback(this.serializeForm(this.form.value)).subscribe({
        next: (response) => {
          console.log('Feedback retrived successfully', response, typeof(response));
          // TODO: add to items to local storage
          // clerearing local Storage
          const keysToRemove: string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('feedbackItem_')) {
              keysToRemove.push(key);
            }
          }
          for (const key of keysToRemove) {
            localStorage.removeItem(key);
          }
          // puting the feedback in the local Storage
          const feedbackData = response;
          if (Array.isArray(feedbackData)) {
            feedbackData.forEach((item: any, index: number) => {
              localStorage.setItem(`feedbackItem_${index}`, JSON.stringify(item));
            });

            this.showFeedback();
          } else {
            console.error('Parsed response is not an array:', feedbackData);
          }
        },
        error: (error) => {
          console.error('Error geting feedback', error);
          this.errorMessage = error.error?.title || 'An unexpected error occurred';
        },
      });
    } else {
      console.log('Form is invalid');
      this.errorMessage = 'Form is invalid';
    }
  }

  private showFeedback() {
    const storedFeedbackData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('feedbackItem_')) {
        const item = localStorage.getItem(key);
        if (item) {
          storedFeedbackData.push(JSON.parse(item));
        }
      }
    }
    console.log("stored items in local staorage", storedFeedbackData);
  }

  constructor(private fb:FormBuilder, private feedbackService: FeedbackService) {
    // this.form = this.fb.group({
    //   byName: this.fb.array([]),
    // })
  }

  addItem(type: string) {
    if (this.name && type == 'name') {
      this.byName.push(this.name);
      this.name = '';
    }
    if (this.email && type == 'email') {
      const emailControl = new FormControl(this.email, Validators.email)
      if (emailControl.valid)
        this.byEmail.push(this.email);
      else
        this.errorMessage = 'Email is invalid!';
      this.email = '';
    }
    if (this.title && type == 'title') {
      this.byTitle.push(this.title);
      this.title = '';
    }
  }

  removeItem(index: number, type: string) {
    if (type == 'name')
      this.byName.splice(index, 1);
    if (type == 'email')
      this.byEmail.splice(index, 1);
    if (type == 'title')
      this.byTitle.splice(index, 1);
  }

  resetForm() {
    this.byName = [];
    this.byEmail = [];
    this.byTitle = [];
    this.form.reset({
      name: this.byName,
      email: this.byEmail,
      title: this.byTitle,
      startDate: '',
      endDate: '',
      stars: [],
      isAnonymus: undefined,
      category: []
    });
  }

  resetAnonymity() {
    this.form.get('isAnonymus')?.reset();
  }

  private serializeForm(formValue: any): FeedbackFiltersDto {
    return {
      byName: formValue.name.length > 0 ? formValue.name : undefined,
      byEmail: formValue.email.length > 0 ? formValue.email : undefined,
      byTitle: formValue.title.length > 0 ? formValue.title : undefined,
      byCategories: formValue.category.length > 0 ? formValue.category : undefined,
      startDate: formValue.startDate ? new Date(formValue.startDate) : null,
      endDate: formValue.endDate ? new Date(formValue.endDate) : null,
      stars: formValue.stars.length > 0 ? formValue.stars : undefined,
      isAnonymus: formValue.isAnonymus !== undefined ? formValue.isAnonymus : null,
    };
  }
}
