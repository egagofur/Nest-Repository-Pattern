import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLogoutDto {
    @IsNotEmpty()
    @IsString()
    @Expose({ name: 'one_signal_player_id' })
    oneSignalPlayerId: string;
}
