import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class EnrollmentService {
  constructor(
    private courseService: CourseService,
    @Inject(forwardRef(() => NotificationService))
    private notificationService: NotificationService,
  ) {}
  // constructor(private notificationService: NotificationService) {}
  studentInfo = [
    {
      studentName: 'siam',
      courseId: 101,
    },
    {
      studentName: 'ayon',
      courseId: 102,
    },
  ];

  getEnrollments() {
    return { message: 'All enrollments fetched', data: this.studentInfo };
  }

  enrollStudent(info: { studentName: string; courseId: number }) {
    const course = this.courseService.getCourseById(info.courseId);
    if (course === 'course not found') {
      return 'no course found';
    }
    const newEnrollment = { ...info };
    this.studentInfo.push(newEnrollment);
    const notification = this.notificationService.sendNotification(
      info.studentName,
      'You have been enrolled successfully',
    );
    return {
      message: 'Student enrolled successfully',
      student: info.studentName,
      course,
      notification,
    };
  }
}
