import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FrontpageModule } from './frontpage/frontpage.module';
import { MenuModule } from './menu/menu.module';
import { BlogsComponent } from './blogs/blogs.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MagazinesComponent } from './magazines/magazines.component';
import { SettingsComponent } from './settings/settings.component';
import { SupportComponent } from './support/support.component';
import { MyLibraryComponent } from './my-library/my-library.component';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { JournalistComponent } from './journalist/journalist.component';
import { MagazineComponent } from './magazine/magazine.component';

@NgModule({
  declarations: [
    MagazinesComponent,
    BlogsComponent,
    SupportComponent,
    FavouritesComponent,
    SettingsComponent,
    MyLibraryComponent,
    SearchComponent,
    JournalistComponent,
    MagazineComponent,
  ],
  imports: [CommonModule, RouterModule, FrontpageModule, MenuModule],
  exports: [
    FrontpageModule,
    MenuModule,
    MagazinesComponent,
    BlogsComponent,
    SupportComponent,
    FavouritesComponent,
    SettingsComponent,
  ],
  providers: [SharedModule, FrontpageModule],
})
export class ComponentsModule {}
