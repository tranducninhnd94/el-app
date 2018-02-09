import { Component, OnInit } from "@angular/core";

import { TopicService } from "../../../_service/topic.service";
import { TopicResponse } from "../../../_model/response/topic.res";
import { ArrayObject } from "../../../_model/response/arr.res";
@Component({
  selector: "topic-partial",
  templateUrl: "./topic.component.html",
  styleUrls: ["./topic.component.css"]
})
export class TopicComponent implements OnInit {
  public arrTopic: ArrayObject<Array<TopicResponse>>;

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.getAllTopic();
  }

  getAllTopic(): void {
    this.topicService.getAllTopic().subscribe(
      res => {
        if (res.result == 200) {
          this.arrTopic = res.value;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
