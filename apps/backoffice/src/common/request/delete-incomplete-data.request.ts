import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteIncompleteDataRequest {
    @IsNotEmpty({ message: 'Field wajib diisi' })
    @IsString()
    signature: string;
}
