import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ScheduleUpdateRequest {
    @IsNotEmpty({
        message: 'Movie is required',
    })
    @IsNumber()
    movieId: number;

    @IsNotEmpty({
        message: 'Start time is required',
    })
    @IsString()
    startTime: string;

    @IsNotEmpty({
        message: 'End time is required',
    })
    @IsString()
    endTime: string;

    @IsNotEmpty({
        message: 'Price is required',
    })
    @IsNumber()
    price: number;

    @IsNotEmpty({
        message: 'Date is required',
    })
    @IsString()
    date: string;
}
