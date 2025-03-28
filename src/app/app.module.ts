import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { NotificationComponent } from './shared/notification/notification.component';

// Services
import { ConfigService } from './services/config.service';
import { ApiResponseService } from './services/api-response.service';
import { ProductService } from './services/product.service';
import { StorageService } from './services/storage.service';

// Factory function for TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'products', component: ProductsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    ProductsComponent,
    DashboardHomeComponent,
    LanguageSelectorComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [
    ConfigService,
    ApiResponseService,
    ProductService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
