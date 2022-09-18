import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { LoginComponent } from './components/frontpage/login/login.component';
import { ForgotPasswordComponent } from './components/menu/forgot-password/forgot-password.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/frontpage', pathMatch: 'full' },
  {
    path: 'article/:key',
    component: ArticleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'frontpage',
    component: FrontpageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
