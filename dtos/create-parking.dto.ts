import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class CreateParkingDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  parking_name: string;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  spaces: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  charging_fee: number;
  
}