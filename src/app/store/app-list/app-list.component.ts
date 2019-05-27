import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { App } from 'src/app/model/app';
import { Observable, from } from 'rxjs';
import { TdAppService } from 'src/app/services/td-app.service';
// import { LeftNavigationService } from 'src/app/services/left-navigation.service';

import { Subject } from 'rxjs';
import {
  debounceTime, switchMap,
  distinctUntilChanged, startWith
} from 'rxjs/operators';

import { share } from 'rxjs/operators';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppListComponent implements OnInit {

  public apps$: Observable<App[]>;
  private reqCat: string = '';
  private apps: App[];
  private currentPageApps: App[] = [];
  private numberOfApps: number;
  private appsPerPage: number;
  private numberOfPages: number = 3;
  private firstPageApps: number;
  private currentPage: number;
  public selectedPage: number = 1;
  private page: number = 1;

  public searchString: string = '';
  private searchTerms: Subject<string> = new Subject();


  constructor(private tdAppService: TdAppService) {

  }

  ngOnInit() {
    /**
     * Introduced a member variable called searchTerms, which is a Subject.
     *  A Subject is a special type in RxJS that acts as both an observer as well as an observable.
     * That is, it is capable of both emitting events as well as subscribing to one.
     * The app uses this searchTerms subject to trigger an event whenever the user types in the search box
     */
    this.apps$ = this.searchTerms.pipe(
      startWith(this.searchString),
      // debounceTime(500),
      distinctUntilChanged(),
      switchMap((query) => this.tdAppService.getApps(query)),
      share()
    );
    /**
     * Subscribing the Observable which emits an asynchronous  data stream containing the apps
     */
    this.apps$.subscribe((app) => {
      this.apps = app;
      this.sortListOfApps();
      /**
       * Calculate pagination info
       */
      this.getPaginationInfo();
      /**
       * Initially loads page 1 of all apps
       */
      this.loadpage(1);
    });
    /**
     * Starts listening to the Observable appCategoryName which is multicasting the category whenever a new one is requested
     */
    this.watchForCategoryChange();
  }

  sortListOfApps() {
    /**
     * Sorts list of apps by ascending order of the sum of the plans price
     */
    this.apps.sort((appA, appB) => {
      let totalPlansPriceA = 0;
      let totalPlansPriceB = 0;

      appA.subscriptions.forEach((subs) => {
        totalPlansPriceA += subs.price;
      });
      appB.subscriptions.forEach((subs) => {
        totalPlansPriceB += subs.price;
      });
      if (totalPlansPriceA < totalPlansPriceB) {
        return -1;
      }
      if (totalPlansPriceA > totalPlansPriceB) {
        return 1;
      }
      return 0;
    });
  }

  watchForCategoryChange() {
    /**
     * The Subject Behavior defined in the AppService is responsible for trigger an event whenever the user requests a new category
     */
    this.tdAppService.appCategoryName$.subscribe((reqCat) => {
      /**
       * get all the apps if none of the categories has been clicked
       */
      if (reqCat !== '') {
        this.apps$ = this.tdAppService.getApps('');
        /**
         * Filter the array by category
         */
        this.apps$.subscribe((app) => {
          this.apps = app;
          if (reqCat !== 'All categories') {
            this.apps = this.apps.filter(cat => cat.categories.find(elem => elem === reqCat));
          }
          /**
           * Sorting by ascending order of the sum of the plans price
           */
          this.sortListOfApps();

          this.getPaginationInfo();
          /**
           * When the App first loads, the first page is loaded
           */
          this.loadpage(1);
        });
      }
    });
  }

  loadpage(page?: number) {
    /**
     * Calculates indexer for the page required (segment of the array, required)
     */
    let start = 0;
    let end = 0;
    switch (page) {
      case 1:
        this.selectedPage = page;
        start = 0;
        end = this.appsPerPage + (this.numberOfApps % this.numberOfPages);
        break;
      case 2:
        this.selectedPage = page;
        start = this.appsPerPage + (this.numberOfApps % this.numberOfPages);
        end = 2 * this.appsPerPage + (this.numberOfApps % this.numberOfPages);
        break;

      case 3:
        this.selectedPage = page;
        start = 2 * this.appsPerPage + (this.numberOfApps % this.numberOfPages);
        end = 3 * this.appsPerPage + (this.numberOfApps % this.numberOfPages);
        break;
    }
    this.currentPageApps = this.apps.slice(start, end);
    this.currentPage = page;
  }

  getPaginationInfo() {
    /**
     * Algorithm chosen to paginate - if at least 3 apps exists then 3 pages should be available
     */
    this.numberOfApps = this.apps.length;
    this.appsPerPage = Math.floor(this.numberOfApps / this.numberOfPages);
    this.firstPageApps = this.appsPerPage + (this.numberOfApps % this.numberOfPages);
  }


  search() {
  /**
   * The searchTerms subject to trigger an event whenever the user types in the search box
   */
    this.searchTerms.next(this.searchString);
  }
}
