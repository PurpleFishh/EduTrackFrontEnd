import { Injectable } from '@angular/core';
import { FeedbackDto } from '../models/feedback.model';
import { RestBaseService } from './rest-base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
	readonly endpoint: string = 'Feedback';

  	constructor(private readonly baseService: RestBaseService) { }

	submitFeedback(feedback: FeedbackDto): Observable<boolean> {
		return this.baseService.add<boolean, FeedbackDto>(
			`${this.endpoint}/AddFeedback?`,
			feedback);
	}

	private feedbackSerializer(feedback: any): string {
		return Object.keys(feedback)
			.filter(key => feedback[key] !== undefined && feedback[key] !== null)
			.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(feedback[key])}}`)
			.join('&');
	}
}
