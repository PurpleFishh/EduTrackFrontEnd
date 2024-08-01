import { Injectable } from '@angular/core';
import {FeedbackDto, FeedbackFiltersDto} from '../models/feedback.model'
import { RestBaseService } from './rest-base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  readonly endpoint: string = 'Feedback'

  constructor(private readonly baseService: RestBaseService) { }

  getFeedback(feedbackFilters: FeedbackFiltersDto): Observable<string> {
    let url = `${this.endpoint}/GetFeedback?${this.feedbackFiltersSerializer(feedbackFilters)}`;
    return this.baseService.get<string>(url);
  }

  private feedbackFiltersSerializer(filters: FeedbackFiltersDto): string {
    const queryParams: string[] = [];

    if (filters.byName) {
      filters.byName.forEach(name => queryParams.push(`byName=${encodeURIComponent(name)}`));
      console.log("byName");
    }

    if (filters.byEmail) {
      filters.byEmail.forEach(email => queryParams.push(`byEmail=${encodeURIComponent(email)}`));
      console.log("byEmail");
    }

    if (filters.byTitle) {
      filters.byTitle.forEach(title => queryParams.push(`byTitle=${encodeURIComponent(title)}`));
      console.log("byTitle");
    }

    if (filters.byCategories) {
      filters.byCategories.forEach(category => queryParams.push(`byCategories=${encodeURIComponent(category)}`));
      console.log("bycatterogies");
    }

    if (filters.startDate && filters.startDate !== null && filters.startDate !== undefined) {
      if ( filters.startDate.toString() != "Invalid Date") {
        queryParams.push(`startDate=${encodeURIComponent(filters.startDate.toISOString())}`);
        console.log("startDate");
      }
        

    }

    if (filters.endDate && filters.endDate !== null && filters.endDate !== undefined) {
      if ( filters.endDate.toString() != "Invalid Date") {
          queryParams.push(`endDate=${encodeURIComponent(filters.endDate.toISOString())}`);
          console.log("endDate");
      }
    }

    if (filters.stars) {
      filters.stars.forEach(star => queryParams.push(`stars=${encodeURIComponent(star)}`));
      console.log("stars");
    }

    if (filters.isAnonymus !== null && filters.isAnonymus !== undefined ) {
      console.log('isAnonymus:', filters.isAnonymus);
      queryParams.push(`isAnonymus=${encodeURIComponent(filters.isAnonymus)}`);
    }

    return queryParams.join('&');
  }
}
