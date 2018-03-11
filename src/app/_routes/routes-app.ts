import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "../app.component";
import { TopicComponent } from "../_component/content/topic/topic.component";
import { TopicDetailComponent } from "../_component/content/topic/topic-detail/topic-detail.component";
import { TopComponent } from "../_component/top/top.component";
import { PageNotFoundComponent } from "../_component/notFound/pageNotFoundComponent";
import { PracticeComponent } from "../_component/practice/practice.component";
import { DiscussitonComponent } from "../_component/content/discussion/discussion.component";
import { PostDetail } from "../_component/content/post-detail/post-detail.component";
import { UnreadComponent } from "../_component/content/unread/unread.component";
import { WerewolfComponent } from "../_component/content/game/werewolf/Werewolf.component";
import { LobbyComponent } from "../_component/content/game/lobby/lobby.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/english/topic",
    pathMatch: "full"
  },
  {
    path: "discussion",
    component: DiscussitonComponent
  },
  {
    path: "post/detail/:_id",
    component: PostDetail
  },
  {
    path: "english/topic",
    component: TopicComponent
  },
  {
    path: "topic/:_idTopic",
    component: TopicDetailComponent
  },
  {
    path: "english/practice",
    component: PracticeComponent
  },
  {
    path: "unread",
    component: UnreadComponent
  },
  {
    path: "game/lobby",
    component: LobbyComponent
  },
  {
    path: "game/werewolf",
    component: WerewolfComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

// export const Routing = RouterModule.forRoot(routes, { useHash: true });
export const Routing = RouterModule.forRoot(routes);
