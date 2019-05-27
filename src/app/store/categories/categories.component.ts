import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { App } from 'src/app/model/app';
import { Subscription } from 'src/app/model/subscription';

import { Observable } from 'rxjs';
import { TdAppService } from 'src/app/services/td-app.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {
  public apps$: Observable<App[]>;
  public active: boolean = false;
  public apps: App[];
  public subscriptions: Subscription[];
  public categories: string[] = [];
  public selectedCategory: string = 'All categories';
  public reqCat: string = '';
  public item: App[];

  constructor(private tdAppService: TdAppService) { }

  ngOnInit() {
    /**
     * Gets all categories from the REST API and sorts them
     * by alphabetic order
     */
    this.apps$ = this.tdAppService.getApps(this.reqCat);

    this.apps$.subscribe((item) => {
      this.item = item;
      this.item.forEach((prop) => {
        (prop.categories).forEach((value) => {
          this.categories.push(value);
        });
      });

      this.categories = this.categories.filter((v, i, a) => a.indexOf(v) === i);
      this.categories.sort();
      this.categories.unshift('All categories');
    });
  }

  filterCategory(cat: string) {
    this.selectedCategory = cat;
    /**
     * The Subject appCategoryNameSubjec triggers an event - change category -  whenever the user clicks a new category
     */
    this.tdAppService.triggerCategoryChange(cat);
  }
}
