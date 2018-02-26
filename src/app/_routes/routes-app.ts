import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "../app.component";
import { TopicComponent } from "../_component/content/topic/topic.component";
import { TopicDetailComponent } from "../_component/content/topic/topic-detail/topic-detail.component";
import { TopComponent } from "../_component/top/top.component";
import { PageNotFoundComponent } from "../_component/notFound/pageNotFoundComponent";
import { PracticeComponent } from "../_component/practice/practice.component";
import { DiscussitonComponent } from "../_component/content/discussion/discussion.component";
import { PostDetail } from "../_component/content/post-detail/post-detail.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/topic",
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
    path: "topic",
    component: TopicComponent
    // children: [
    //     {
    //         path: '',
    //         redirectTo: '',
    //         pathMatch: 'full'
    //     },
    //     {
    //         path: 'detail/:nameTopic',
    //         component: TopicDetailComponent
    //     }
    // ]
  },
  {
    path: "topic/:_idTopic",
    component: TopicDetailComponent
  },
  {
    path: "practice",
    component: PracticeComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

export const Routing = RouterModule.forRoot(routes);
