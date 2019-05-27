import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppItemComponent } from './store/app-item/app-item.component';
import { AppListComponent } from './store/app-list/app-list.component';
import { CategoriesComponent } from './store/categories/categories.component';

import { TdAppService } from './services/td-app.service';

@NgModule({
  declarations: [AppComponent, AppItemComponent, AppListComponent, CategoriesComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TdAppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
