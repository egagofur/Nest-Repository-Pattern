import { IConfig } from 'interface-models/config/config.interface';
import { ConfigResponse } from '../responses/config.response';

export class ConfigMapper {
    public static fromEntity = (config: IConfig): ConfigResponse => ({
        id: config.id,
        name: config.name,
        key: config.key,
        value: config.value,
    });
}
