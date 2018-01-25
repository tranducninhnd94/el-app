import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WordService } from '../../../../_service/word.service';
import { TopicResponse } from '../../../../_model/response/topic.res';
import { ArrayObject } from '../../../../_model/response/arr.res';
import { WordResponse } from '../../../../_model/response/word.res';
import { Constants } from '../../../../_common/constant';

@Component({
    selector: 'topic-detail-partial',
    templateUrl: './topic-detail.component.html',
    styleUrls: ['./topic-detail.component.css']
})

export class TopicDetailComponent implements OnInit {

    private arrWords: ArrayObject<WordResponse>;

    private serverHost = Constants.SERVER_HOST;
    
    constructor(private wordService: WordService, private activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.getWordByTopic();
    }

    getWordByTopic(): void {
        const _idTopic = this.activatedRoute.snapshot.paramMap.get('_idTopic');
        this.wordService.getWordsByTopic(_idTopic).subscribe(res => {
            if (res.result == 200) {
                this.arrWords = res.value;
            }
            console.log(this.arrWords ? this.arrWords : 'Empty');
        }, error => {
            console.log('error :', error);
        })
    }


}