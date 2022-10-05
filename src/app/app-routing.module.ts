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
import { MagazineComponent } from './components/magazine/magazine.component';
import { JournalistComponent } from './components/journalist/journalist.component';
import { TbrComponent } from './components/tbr/tbr.component';

const routes: Routes = [
  { path: '', redirectTo: '/frontpage', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
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
    path: 'tbr',
    component: TbrComponent,
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
  {
    path: 'magazines',
    component: MagazinesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'magazine',
    component: MagazineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'journalist',
    data: { journalist: null },
    component: JournalistComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
