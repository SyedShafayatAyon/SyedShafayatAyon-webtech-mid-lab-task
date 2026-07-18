import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  data = [
    {
      id: 101,
      name: 'NestJS Fundamentals',
      code: 'CS301',
    },
    {
      id: 102,
      name: 'Advanced TypeScript',
      code: 'CS402',
    },
  ];

  getAllCourses() {
    return { message: 'All courses fetched', data: this.data };
  }

  getCourseById(id: number) {
    const course = this.data.find((c) => c.id == id);
    if (!course) {
      return 'course not found';
    }
    return { message: 'Course fetched', data: course?.id };
  }

  createCourse(info: { name: string; code: string }) {
    const newCourse = { id: Math.floor(Math.random() * 200), ...info };
    this.data.push(newCourse);
    return { message: 'Course created', data: newCourse };
  }
}
