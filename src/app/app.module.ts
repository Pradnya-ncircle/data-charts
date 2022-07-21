import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { AssetComponent } from './assets/asset.component';

import {  ChartsModule } from 'ng2-charts';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EffectsModule } from '@ngrx/effects';

import  { Effects } from './app-state/asset-state/asset-state.effects';
import { metaReducers } from './app-state/app.state';
import { Reducer } from './app-state/asset-state/asset-state.reducer';





@NgModule({
  declarations: [
    AppComponent,
    AssetComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(Reducer),

    StoreModule.forFeature('appState', Reducer),
    EffectsModule.forFeature([Effects]),
   
    StoreDevtoolsModule.instrument({maxAge: 25}),

    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatTreeModule,
    MatIconModule,
    CommonModule
  ],
  providers: [
    DatePipe
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
