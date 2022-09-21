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

@NgModule({
  declarations: [
    MagazinesComponent,
    BlogsComponent,
    SupportComponent,
    FavouritesComponent,
    SettingsComponent,
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
})
export class ComponentsModule {}
