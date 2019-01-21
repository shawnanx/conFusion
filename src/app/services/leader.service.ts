import { Injectable } from '@angular/core';
import { Leader } from './../shared/leader';
import { LEADERS } from './../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    // simulate server latency w 2s delay
    return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id: string): Observable<Leader> {
    // simulate server latency w 2s delay
    return of(LEADERS.filter(leader => (leader.id === id))[0])
      .pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    // simulate server latency w 2s delay
    return of(LEADERS.filter(leader => (leader.featured))[0])
      .pipe(delay(2000));
  }

}




