import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EnrollmentService } from 'src/enrollment/enrollment.service';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(forwardRef(() => EnrollmentService))
    private enrollmentService: EnrollmentService,
  ) {}

  sendNotification(studentName: string, message: string) {
    return { student: studentName, message: message };
  }

  checkEnrollmentAndNotify(studentName: string, courseId: number) {
    const enrollments = this.enrollmentService.getEnrollments();
    const allEnrollments = enrollments.data;
    const isEnrolled = allEnrollments.find(
      (enrollment) =>
        enrollment.studentName === studentName &&
        enrollment.courseId === courseId,
    );
    if (isEnrolled) {
      return {
        message: `Checked enrollments for ${studentName}`,
        courseId: courseId,
      };
    } else {
      return {
        message:
          'Error: Student is NOT enrolled in this course. Notification failed.',
        student: studentName,
        courseId: courseId,
      };
    }
  }
}
