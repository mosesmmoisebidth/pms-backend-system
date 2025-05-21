import { IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
export class UpdateParkingDto {

  @IsOptional()
  @IsString()
  parking_name?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  spaces?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  charging_fee?: number;
}