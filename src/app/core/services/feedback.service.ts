import { Injectable } from '@angular/core';
import {FeedbackDto} from '../models/feedback.model'
import { RestBaseService } from './rest-base.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  readonly endpoint: string = ''

  constructor(private readonly baseService: RestBaseService) { }
}
