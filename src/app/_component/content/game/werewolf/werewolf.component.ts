import { Component, OnInit } from "@angular/core";
import { GamerResponse, VoteInfo } from "../../../../_model/gamer.model";
import { Constants } from "../../../../_common/constant";
import { CookieService } from "../../../../_service/cookie.service";
import {SocketService} from "../../../../_service/socket.service";

@Component({
  selector: "game-werewolf",
  templateUrl: "./werewolf.component.html",
  styleUrls: ["./werewolf.component.css"]
})
export class WerewolfComponent implements OnInit {
  private isActive = true;

  private arrGamer: Array<GamerResponse>;

  private arrInfoVote: Array<VoteInfo>;

  private styletransparent = null;

  private noname = "undefined";

  private timeViewCharacter: any;

  private timeRound: any;

  private ttlOfRound = Constants.TIME_TO_LIE_OF_ROUND;

  private minutesOfRound = "00";

  private secondOfRound = "00";

  private image_cupid = "../../../../assets/img-werewolf/character/card-cupid.png";

  constructor(private cookieService: CookieService, private socketService: SocketService) {}

  viewCharacter(i) {
    console.log("view character. : ", i);
    this.isActive = !this.isActive;
    this.arrGamer[i].is_view = !this.arrGamer[i].is_view;

    this.timeViewCharacter = setTimeout(() => {
      if (this.arrGamer[i].is_view) {
        this.arrGamer[i].is_view = !this.arrGamer[i].is_view;
      }
    }, 3000);
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.arrGamer = new Array<GamerResponse>();
    for (let i = 0; i < 10; i++) {
      let gamerRes = new GamerResponse(i, false);
      this.arrGamer.push(gamerRes);
    }
    console.log(this.arrGamer);
    // this.nextRound();
  }

  nextRound(): void {
    this.ttlOfRound = Constants.TIME_TO_LIE_OF_ROUND;
    this.timeRound = setInterval(() => {
      let minute = Math.floor(this.ttlOfRound / 60);
      let second = this.ttlOfRound % 60;

      this.minutesOfRound = minute >= 10 ? minute + "" : "0" + minute;
      this.secondOfRound = second >= 10 ? second + "" : "0" + second;

      if (this.ttlOfRound == 0) {
        clearInterval(this.timeRound);
      }

      --this.ttlOfRound;
    }, 1000);
  }

  vote(index) {
    console.log(this.arrGamer);
    let _id = this.cookieService.getValue(Constants.COOKIE_ID);
    let gamer = this.arrGamer[index];
    if (gamer._id == _id) {
    }
    // let gamerId = gamer._id;
  }
}
