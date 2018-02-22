export class FileResponse {
    path: string;

    mimetype: string;

    size: Number;

    originalname: string;

    encoding: string;

    filename: string;

    constructor(obj) {
        this.path = obj.path;
        this.mimetype = obj.mimetype;
        this.size = obj.size;
        this.originalname = obj.originalname;
        this.encoding = obj.encoding;
        this.filename = obj.filename;
    }
}