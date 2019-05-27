import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { throwError as ObservableThrow } from 'rxjs';
import { of as ObservableOf } from 'rxjs';

import { App } from 'src/app/model/app';

@Injectable({
  providedIn: 'root'
})
export class TdAppService {
  private apps: App[];
  private apps$: Observable<App[]>;

  private appCategoryNameSubject: BehaviorSubject<string>;
  public appCategoryName$: Observable<string>;
  public selectedCategory: string;

  private allApps = false;

  constructor(private http: HttpClient) {
    this.appCategoryNameSubject = new BehaviorSubject<string>('');
    this.appCategoryName$ = this.appCategoryNameSubject.asObservable();

  }

  getApps(query?: string): Observable<App[]> {
    /**
     * TdAppService mirrors the API with the GET method making the call to retrieve app data.
     * The query parameter, is used to search the API
     */
    const params = new HttpParams()
        .set('q', query);

    this.apps$ = this.http.get<App[]>('/apps', { params });

    return this.apps$;
  }

  triggerCategoryChange(cat: string) {
    /**
     * Trigger a subject to be listened by the categories component
     */
    this.appCategoryNameSubject.next(cat);
  }
}
