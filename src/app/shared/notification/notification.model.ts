export class NotificationModel {
    public title: string;
    public message: string;
    public type: NotificationType;
    public createDate: Date;
    public unread: boolean;

    constructor() {
        this.createDate = new Date();
    }
}

export enum NotificationType {
    Info = 1,
    Warning = 2,
    Error = 3
}
