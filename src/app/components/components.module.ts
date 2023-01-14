import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FrontpageModule } from './frontpage/frontpage.module';
import { MenuModule } from './menu/menu.module';
import { MagazinesComponent } from './magazines/magazines.component';
import { SettingsComponent } from './settings/settings.component';
import { SupportComponent } from './support/support.component';
import { MyLibraryComponent } from './my-library/my-library.component';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { JournalistComponent } from './journalist/journalist.component';
import { MagazineComponent } from './magazine/magazine.component';
import { NgxTranslateModule } from '../ngx-translate/ngx-translate.module';
import { SettingModalComponent } from './settings/setting-modal/setting-modal.component';
import { TbrComponent } from './tbr/tbr.component';
import { StoreModule } from '@ngrx/store';
import { genreReducers, magazineReducers } from '../shared/store/reducers/';

@NgModule({
  declarations: [
    MagazinesComponent,
    SupportComponent,
    SettingsComponent,
    MyLibraryComponent,
    SearchComponent,
    JournalistComponent,
    MagazineComponent,
    SettingModalComponent,
    TbrComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FrontpageModule,
    MenuModule,
    NgxTranslateModule,
    SharedModule,
  ],
  exports: [
    FrontpageModule,
    MenuModule,
    MagazinesComponent,
    SupportComponent,
    SettingsComponent,
  ],
  providers: [SharedModule, FrontpageModule],
})
export class ComponentsModule {}
