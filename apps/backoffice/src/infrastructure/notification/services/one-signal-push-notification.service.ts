import * as OneSignal from 'onesignal-node';
import { config } from '../../../config';

export enum AppTypeNotification {
    Api = 'api',
    Backoffice = 'backoffice',
}

export class OneSignalPushNotificationService {
    constructor(private client: OneSignal.Client) {
        this.client = new OneSignal.Client(
            config.pushNotif.oneSignal.appId,
            config.pushNotif.oneSignal.restApiKey,
        );
    }

    async removePlayerId(playerId: string): Promise<void> {
        await this.client.deleteDevice(playerId).catch((e) => {
            console.log('[One Signal] - Error  ' + e.message);
        });
    }

    async setStatus(playerId: string, isActive: boolean): Promise<void> {
        await this.client
            .editDevice(playerId, {
                tags: {
                    status: isActive ? 'active' : 'inactive',
                    app: AppTypeNotification.Backoffice.toString(),
                },
            })
            .catch((e) => {
                console.log('[One Signal] - Error  ' + e.message);
            });
    }

    async sendToActiveUser(title: string, content: string): Promise<void> {
        await this.client.createNotification({
            included_segments: ['Subscribed Users'],
            filters: [
                { field: 'tag', key: 'status', relation: '=', value: 'active' },
            ],
            contents: {
                en: content,
                id: content,
            },
            subtitle: {
                en: title,
                id: title,
            },
        });
    }

    async sendToActiveAndSpecificApp(
        app: AppTypeNotification,
        title: string,
        content: string,
        data: any = null,
    ): Promise<void> {
        await this.client.createNotification({
            included_segments: ['Subscribed Users'],
            filters: [
                {
                    field: 'tag',
                    key: 'status',
                    relation: '=',
                    value: 'active',
                },
                {
                    field: 'tag',
                    key: 'app',
                    relation: '=',
                    value: app.toString(),
                },
            ],
            data,
            contents: {
                en: content,
                id: content,
            },
            subtitle: {
                en: title,
                id: title,
            },
        });
    }

    async sendToActiveSpecificePlayers(
        playerIds: string[],
        title: string,
        content: string,
        data: any,
    ): Promise<void> {
        if (playerIds.length < 1) {
            return;
        }

        await this.client.createNotification({
            include_player_ids: playerIds,
            filters: [
                {
                    field: 'tag',
                    key: 'status',
                    relation: '=',
                    value: 'active',
                },
            ],
            data,
            contents: {
                en: content,
                id: content,
            },
            subtitle: {
                en: title,
                id: title,
            },
        });
    }
}
