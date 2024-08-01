import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { FeedbackFiltersDto } from 'src/app/core/models/feedback.model';
import { FeedbackCategory } from 'src/app/core/models/feedback.model';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
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
  storedFeedbackData: any[] = [];
  displayedFeedbackData: any[] = [];
  pageSize = 5;
  pageIndex = 0;
  totalFeedback = 0;

  sortCriteria: string = 'date'; // Default sorting criteria
  sortDirection: 'asc' | 'desc' = 'asc'; // Default sorting direction

   @ViewChild(MatPaginator) paginator!: MatPaginator;

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
    const feedbackData = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('feedbackItem_')) {
        const item = localStorage.getItem(key);
        if (item) {
          feedbackData.push(JSON.parse(item));
        }
      }
    }
    this.storedFeedbackData = feedbackData;
    this.totalFeedback = this.storedFeedbackData.length;
    this.updateDisplayedFeedback();
    console.log("stored items in local staorage", feedbackData);
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

  getFeedbackCategory(value: FeedbackCategory): string {
    switch (value) {
      case FeedbackCategory.ContentQuality:
        return 'Content Quality';
      case FeedbackCategory.UserExperience:
        return 'User Experience';
      case FeedbackCategory.TechnicalPerformance:
        return 'Technical Performance';
      case FeedbackCategory.EducationalTools:
        return 'Educational Tools';
      case FeedbackCategory.AssessmentAndFeedback:
        return 'Assessment and Feedback';
      default:
        return 'Unknown Category';
    }
  }

  updateDisplayedFeedback() {
    let sortedData = this.sortData(this.storedFeedbackData, this.sortCriteria, this.sortDirection);
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedFeedbackData = sortedData.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedFeedback();
  }

  onSortChange(event: any) {
    const [criteria, direction] = event.value.split('_');
    this.sortCriteria = criteria;
    this.sortDirection = direction as 'asc' | 'desc';
    this.updateDisplayedFeedback();
  }

  sortData(data: any[], criteria: string, direction: 'asc' | 'desc'): any[] {
    return data.slice().sort((a, b) => {
      let comparison = 0;
      
      switch (criteria) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'stars':
          comparison = a.stars - b.stars;
          break;
        case 'category':
          comparison = a.category - b.category;
          break;
        default:
          return 0;
      }

      return direction === 'desc' ? -comparison : comparison;
    });
  }
}
