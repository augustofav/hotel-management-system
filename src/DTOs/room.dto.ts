import { IsNotEmpty, IsNumber, IsString, IsPositive, Min, IsOptional, IsDateString } from 'class-validator';

export class CreateRoomDto {
    @IsNotEmpty()
    @IsNumber()
    hotelId!: number;

    @IsNotEmpty()
    @IsString()
    roomNumber!: string;

    @IsNotEmpty()
    @IsString()
    type!: string;

    @IsNotEmpty()
    @IsPositive()
    price!: number;
}

export class RentRoomDto {
    
    @IsString()
    roomId!: string;

    @IsNotEmpty()
    @IsDateString()
    startDate!: string;

    @IsNotEmpty()
    @IsDateString()
    endDate!: string;

    @IsNotEmpty()
    @IsString()
    userid!: string;
}

export class UpdateRoomDto {
    @IsNotEmpty()
    @IsString()
    roomId!: string;

    @IsNotEmpty()
    @IsNumber()
    hotelId!: number;

    @IsNotEmpty()
    @IsString()
    roomNumber!: string;

    @IsNotEmpty()
    @IsString()
    type!: string;

    @IsNotEmpty()
    @IsPositive()
    price!: number;
}

export class FilterRoomDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    lowPrice!: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    highPrice!: number;

    @IsNotEmpty()
    @IsString()
    type!: string;
}
