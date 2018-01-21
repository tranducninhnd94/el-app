import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routing } from './_routes/routes-app';


import { AppComponent } from './app.component';

import { TopicComponent } from './_component/content/topic/topic.component';
import { TopicDetailComponent } from './_component/content/topic/topic-detail/topic-detail.component';
import { TopComponent } from './_component/top/top.component';

@NgModule({
  declarations: [
    AppComponent,
    TopicComponent,
    TopicDetailComponent,
    TopComponent
  ],
  imports: [
    BrowserModule,
    Routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
