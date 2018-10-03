import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { SortPage } from '../pages/sort/sort';

import { DataService } from '../services/data.service';
import { FormatterService } from '../services/formater.service';

import { ItemComponent } from '../components/item/item';
import { ValueComponent } from '../components/value/value';

import { HasValuePipe, FormatPipe } from '../shared/shared.pipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    SortPage,
    ValueComponent,
    ItemComponent,
    HasValuePipe,
    FormatPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    SortPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    DataService,
    FormatterService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
