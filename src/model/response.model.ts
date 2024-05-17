export default class Response {
    public Status: boolean;
    public Data: any;
    public Messages: string;

    constructor(status: boolean, data: any, mess: string) {
        this.Status = status;
        this.Data = data;
        this.Messages = mess;
    }

}
