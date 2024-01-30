import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommonGenerateCodeDto {
    @IsNotEmpty()
    @IsString()
    @Expose({ name: 'prefix_product' })
    prefixProduct: string;
}
