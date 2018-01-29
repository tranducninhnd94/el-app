import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routing } from './_routes/routes-app';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TopicComponent } from './_component/content/topic/topic.component';
import { TopicDetailComponent } from './_component/content/topic/topic-detail/topic-detail.component';
import { TopComponent } from './_component/top/top.component';
import { PageNotFoundComponent } from './_component/notFound/pageNotFoundComponent';
import { PracticeComponent } from './_component/content/practice/practice.conponent';

import { TopicService } from './_service/topic.service';
import { WordService } from './_service/word.service';
import { ToastService } from './_service/toast.service';


@NgModule({
  declarations: [
    AppComponent,
    TopicComponent,
    TopicDetailComponent,
    TopComponent,
    PageNotFoundComponent,
    PracticeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Routing,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [TopicService, WordService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }