import { Injectable } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class EnrollmentService {
  constructor(private courseService: CourseService) {}
  studentInfo = [
    {},
    // {
    //   studentName: 'siam',
    //   courseId: 101,
    // },
    // {
    //   studentName: 'ayon',
    //   courseId: 102,
    // },
  ];

  getEnrollments() {
    return { message: 'All enrollments fetched', data: this.studentInfo };
  }

  enrollStudent(info: { studentName: string; courseId: number }) {
    const checkIfIdExist = this.courseService.getCourseById(info.courseId);
    console.log(checkIfIdExist);
    if (!checkIfIdExist) {
      return 'no course fond';
    }
    const newEnrollment = { ...info };
    this.studentInfo.push(newEnrollment);
    return { message: 'Student enrolled successfully', data: newEnrollment };
  }
}
