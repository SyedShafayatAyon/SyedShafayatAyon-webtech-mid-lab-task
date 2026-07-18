import { PartialType } from '@nestjs/mapped-types';
import { CreateCourse } from './create-course.dto';

export class UpdateCourse extends PartialType(CreateCourse) {}
