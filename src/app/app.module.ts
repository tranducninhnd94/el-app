import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routing } from './_routes/routes-app';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { TopicComponent } from './_component/content/topic/topic.component';
import { TopicDetailComponent } from './_component/content/topic/topic-detail/topic-detail.component';
import { TopComponent } from './_component/top/top.component';
import { PracticeComponent } from './_component/content/practice/practice.conponent';

import { PageNotFoundComponent } from './_component/notFound/pageNotFoundComponent';
import { TopicService } from './_service/topic.service';
import { WordService } from './_service/word.service';

@NgModule({
  declarations: [
    AppComponent,
    TopicComponent,
    TopicDetailComponent,
    TopComponent,
    PracticeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Routing
  ],
  providers: [TopicService, WordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
