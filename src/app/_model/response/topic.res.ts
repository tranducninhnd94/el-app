export class TopicResponse {
    _id: string;

    name: string;
    
    image_url: string;

    constructor(obj) {
        this._id = obj._id;
        this.name = obj.name;
        this.image_url = obj.image_url;
    }
}