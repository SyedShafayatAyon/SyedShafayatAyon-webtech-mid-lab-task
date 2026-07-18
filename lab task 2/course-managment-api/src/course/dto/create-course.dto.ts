import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  minLength,
} from 'class-validator';

export class CreateCourse {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  instructor: string;

  @Min(1)
  @Max(6)
  @IsNumber()
  @Type(() => Number)
  credits: number;

  @IsOptional()
  @IsString()
  description: string;
}
