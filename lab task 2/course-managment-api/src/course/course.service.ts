import { Injectable } from '@nestjs/common';
import { get } from 'http';
import { CreateCourse } from './dto/create-course.dto';
import { UpdateCourse } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  courses = [
    { code: 'CS101', name: 'webtech', instructor: 'siam', credits: 3 },
  ];

  getAllCourse() {
    return { message: 'all courses', data: this.courses };
  }

  getCourseByCode(code: string) {
    const course = this.courses.find((course) => course.code == code);
    return { message: `corse code is ${code}`, data: course };
  }

  createCourse(info: CreateCourse) {
    const newCourse = { ...info };
    this.courses.push(newCourse);
    return { message: 'new course created', data: newCourse };
  }

  updateCourse(code: string, data: CreateCourse) {
    const index = this.courses.findIndex((i) => i.code === code);
    this.courses[index] = { ...this.courses[index], ...data };
    return { message: `course ${code} updated`, data: this.courses[index] };
  }

  updateCoursePartially(code: string, data: Partial<UpdateCourse>) {
    const course = this.courses.find(
      (course) => course.code == code,
    ) as UpdateCourse;
    Object.assign(course, data);
    return {
      message: `course ${code} updated`,
      data: course,
    };
  }

  deleteUser(code: string) {
    const index = this.courses.findIndex((i) => i.code === code);
    this.courses.splice(index, 1);
    return `course ${code} is deleted`;
  }
}
