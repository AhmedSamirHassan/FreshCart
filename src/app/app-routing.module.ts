import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './Components/log-in/log-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { BrandComponent } from './Components/brand/brand.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { ProductsComponent } from './Components/products/products.component';
import { HomeNotFoundComponent } from './Components/home-not-found/home-not-found.component';
import { AuthGuard } from './Guards/auth.guard';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'login',  component: LogInComponent},
  {path: 'register', component: SignUpComponent},
  {path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  {path: 'cart', canActivate: [AuthGuard], component: CartComponent},
  {path: 'brand', canActivate: [AuthGuard], component: BrandComponent},
  {path: 'categories',canActivate: [AuthGuard], component: CategoriesComponent},
  {path: 'Products',canActivate: [AuthGuard], component: ProductsComponent},
  {path: 'wishlist',canActivate: [AuthGuard], component: WishListComponent},
  {path: 'product/:id', canActivate: [AuthGuard], component: ProductDetailsComponent},
  {path: 'checkout/:cartId', canActivate: [AuthGuard], component: CheckoutComponent},
  {path: 'forgetpassword', component: ForgetpasswordComponent},
  {path: '**', component: HomeNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
