import {
    IsNotEmpty,
    IsString,
    IsUrl,
    MaxLength,
    MinLength,
} from 'class-validator';

export class MovieUpdateRequest {
    @IsNotEmpty({
        message: 'Title is required',
    })
    @IsString()
    @MinLength(3, {
        message: 'Title must be at least 3 characters',
    })
    @MaxLength(255, {
        message: 'Title must be at most 255 characters',
    })
    title: string;

    @IsNotEmpty({
        message: 'Overview is required',
    })
    @IsString()
    @MinLength(3, {
        message: 'Overview must be at least 3 characters',
    })
    @MaxLength(300, {
        message: 'Overview must be at most 300 characters',
    })
    overview: string;

    @IsNotEmpty({
        message: 'Poster is required',
    })
    @IsUrl()
    @IsString()
    poster: string;

    @IsNotEmpty({
        message: 'Play until is required',
    })
    @IsString()
    playUntil: string;
}
