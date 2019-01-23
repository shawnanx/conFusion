
import { Injectable, Inject} from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback } from './../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {


  constructor(private http: HttpClient,
    private pHTTPMS: ProcessHTTPMsgService,
    @Inject('BaseURL') private BaseURL ) { }

  postFeedback(fb: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback/', fb, httpOptions)
      .pipe(catchError(this.pHTTPMS.handleError));
  }



}
