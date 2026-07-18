import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourse } from './dto/create-course.dto';
import { UpdateCourse } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly CourseService: CourseService) {}

  @Get()
  getAllCourse() {
    return this.CourseService.getAllCourse();
  }

  @Get(':code')
  getCourseByCode(@Param('code') code: string) {
    return this.CourseService.getCourseByCode(code);
  }

  @Post()
  createCourse(@Body() data: CreateCourse) {
    return this.CourseService.createCourse(data);
  }

  @Put(':code')
  updateCourse(@Param('code') code: string, @Body() body: CreateCourse) {
    return this.CourseService.updateCourse(code, body);
  }

  @Patch(':code')
  updateCoursePartially(
    @Param('code') code: string,
    @Body() body: UpdateCourse,
  ) {
    return this.CourseService.updateCoursePartially(code, body);
  }

  @Delete(':code')
  deleteUser(@Param('code') code: string) {
    return this.CourseService.deleteUser(code);
  }
}
