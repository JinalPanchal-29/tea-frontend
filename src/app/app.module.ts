import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from  '@angular/common/http';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireStorageModule} from '@angular/fire/compat/storage'
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterLoginComponent,
    HomeComponent,
    ProfileComponent,
    BookmarkComponent,
    TimelineComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
