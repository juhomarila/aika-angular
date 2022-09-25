import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { LoginComponent } from './components/frontpage/login/login.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { SupportComponent } from './components/support/support.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MagazinesComponent } from './components/magazines/magazines.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { MyLibraryComponent } from './components/my-library/my-library.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/frontpage', pathMatch: 'full' },
  {
    path: 'frontpage',
    component: FrontpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blogs',
    component: BlogsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'support',
    component: SupportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favourites',
    component: FavouritesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-library',
    component: MyLibraryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'magazines', component: MagazinesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
