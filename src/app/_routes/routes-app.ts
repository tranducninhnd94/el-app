import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { TopicComponent } from '../_component/content/topic/topic.component';
import { TopicDetailComponent } from '../_component/content/topic/topic-detail/topic-detail.component';
import { TopComponent } from '../_component/top/top.component';
import { PracticeComponent } from '../_component/content/practice/practice.conponent';
import { PageNotFoundComponent } from '../_component/notFound/pageNotFoundComponent';

const routes: Routes = [
    {
        path: 'topic',
        component: TopicComponent,
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
        path: 'topic/:_idTopic',
        component: TopicDetailComponent,
    },
    {
        path: 'practice',
        component: PracticeComponent
    },
    {
        path: '**', component: PageNotFoundComponent
    }
]

export const Routing = RouterModule.forRoot(routes);