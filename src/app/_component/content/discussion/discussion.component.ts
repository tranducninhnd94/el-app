import { Component } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { BsModalService } from "ngx-bootstrap/modal/bs-modal.service";
import { ModalPosts } from "../../modal/modal-posts/modal-posts.component";
@Component({
    selector: "discussion-partial", templateUrl: "./discussion.component.html", styleUrls: ["./discussion.component.css"]
})
export class DiscussitonComponent {
    private modalRef: BsModalRef;

    constructor(private bsModalService: BsModalService) { }

    openNewPostsModal() {
        this.modalRef = this.bsModalService.show(ModalPosts, { backdrop: "static", class: "modal-lg" });
    }
}