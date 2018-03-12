import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routing } from "./_routes/routes-app";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ToastModule } from "ng2-toastr/ng2-toastr";

import { AppComponent } from "./app.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";

import { TopicComponent } from "./_component/content/topic/topic.component";
import { TopicDetailComponent } from "./_component/content/topic/topic-detail/topic-detail.component";
import { TopComponent } from "./_component/top/top.component";
import { PageNotFoundComponent } from "./_component/notFound/pageNotFoundComponent";
import { PracticeComponent } from "./_component/practice/practice.component";

import { ModalSelect } from "./_component/modal/modal-select/modal-select.component";
import { ModalRegister } from "./_component/modal/modal-register/modal-register.component";

import { ModalService } from "./_service/modal.service";
import { TopicService } from "./_service/topic.service";
import { WordService } from "./_service/word.service";
import { ToastService } from "./_service/toast.service";
import { UserService } from "./_service/user.service";
import { ModalLogin } from "./_component/modal/modal-login/modal-login.component";
import { CookieService } from "./_service/cookie.service";
import { DiscussitonComponent } from "./_component/content/discussion/discussion.component";
import { ModalPosts } from "./_component/modal/modal-posts/modal-posts.component";
import { FileService } from "./_service/file.service";
import { PostService } from "./_service/post.service";
import { PostDetail } from "./_component/content/post-detail/post-detail.component";
import { CommentComponent } from "./_component/content/comment/comment.component";
import { CommentService } from "./_service/comment.service";
import { TooltipModule } from "ngx-bootstrap/tooltip";

// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Angular2FontawesomeModule } from "angular2-fontawesome/angular2-fontawesome";
import { UnreadComponent } from "./_component/content/unread/unread.component";

// deploy
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { WerewolfComponent } from "./_component/content/game/werewolf/Werewolf.component";
// import { SocketService } from "./_service/socket.service";
import { LobbyComponent } from "./_component/content/game/lobby/lobby.component";
import { ModalRoom } from "./_component/modal/modal-room/modal-room.component";
import { ModalCharacter } from "./_component/modal/modal-character/modal-character.component";
import { NspLobbyService } from "./_service/socket.nsp.lobby.service";
import { NspRoomService } from "./_service/socket.nsp.room.service";

@NgModule({
  declarations: [
    AppComponent,
    TopicComponent,
    TopicDetailComponent,
    TopComponent,
    PageNotFoundComponent,
    PracticeComponent,
    DiscussitonComponent,
    PostDetail,
    CommentComponent,
    UnreadComponent,
    LobbyComponent,
    WerewolfComponent,
    ModalSelect,
    ModalRegister,
    ModalLogin,
    ModalPosts,
    ModalRoom,
    ModalCharacter
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    Routing,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    Angular2FontawesomeModule
  ],
  entryComponents: [ModalSelect, ModalRegister, ModalLogin, ModalPosts, ModalRoom, ModalCharacter],
  providers: [
    TopicService,
    WordService,
    ToastService,
    ModalService,
    UserService,
    CookieService,
    FileService,
    PostService,
    CommentService,
    // SocketService,
    NspLobbyService,
    NspRoomService
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
