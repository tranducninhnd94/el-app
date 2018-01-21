import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { TopicComponent } from '../_component/content/topic/topic.component';
import { TopicDetailComponent } from '../_component/content/topic/topic-detail/topic-detail.component';
import { TopComponent } from '../_component/top/top.component';


const routes: Routes = [
    {
        path: 'topic',
        component: TopicComponent,
        children: [
            {
                path: '',
                redirectTo: '',
                pathMatch: 'full'
            },
            {
                path: 'detail/:nameTopic',
                component: TopicDetailComponent
            }
        ]
    }
]

export const Routing = RouterModule.forRoot(routes);