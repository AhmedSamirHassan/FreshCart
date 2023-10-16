import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandComponent } from './Components/brand/brand.component';
import { HomeNotFoundComponent } from './Components/home-not-found/home-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ProductComponent } from './Components/product/product.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component'
import { RouterModule, Routes  } from '@angular/router'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { AddHeaderInterceptor } from './Interceptors/add-header.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './Interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignUpComponent,
    LogInComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandComponent,
    HomeNotFoundComponent,
    WishListComponent,
    ProductComponent,
    ForgetpasswordComponent,
    ProductDetailsComponent,
    WishListComponent,
    CheckoutComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi : true
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
