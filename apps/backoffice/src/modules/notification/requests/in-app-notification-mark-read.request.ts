import { IsArray, IsNotEmpty } from 'class-validator';

export class InAppNotificationMarkReadRequest {
    @IsNotEmpty()
    @IsArray()
    notificationIds: number[];
}
