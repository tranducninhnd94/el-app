import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routing } from "./_routes/routes-app";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastModule } from "ng2-toastr/ng2-toastr";

import { AppComponent } from "./app.component";
import { ModalModule } from "ngx-bootstrap/modal";

import { TopicComponent } from "./_component/content/topic/topic.component";
import { TopicDetailComponent } from "./_component/content/topic/topic-detail/topic-detail.component";
import { TopComponent } from "./_component/top/top.component";
import { PageNotFoundComponent } from "./_component/notFound/pageNotFoundComponent";
import { PracticeComponent } from "./_component/practice/practice.component";
import { ModalSelect } from "./_component/modal/modal-select/modal-select.component";

import { ModalService } from "./_service/modal.service";
import { TopicService } from "./_service/topic.service";
import { WordService } from "./_service/word.service";
import { ToastService } from "./_service/toast.service";
import { ModalRegister } from "./_component/modal/modal-register/modal-register.component";

@NgModule({
  declarations: [
    AppComponent,
    TopicComponent,
    TopicDetailComponent,
    TopComponent,
    PageNotFoundComponent,
    PracticeComponent,
    ModalSelect,
    ModalRegister
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
  entryComponents: [ModalSelect, ModalRegister],
  providers: [TopicService, WordService, ToastService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
