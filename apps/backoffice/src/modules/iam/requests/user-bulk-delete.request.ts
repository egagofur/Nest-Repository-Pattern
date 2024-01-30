import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class UserBulkDeleteRequest {
    @IsArray()
    @ArrayNotEmpty()
    // check if every array item is number
    @IsNumber({}, { each: true })
    ids: number[];
}
