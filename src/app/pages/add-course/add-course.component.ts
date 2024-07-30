import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import { CourseContract } from 'src/app/core/models/course.model';
import { CoursesService } from 'src/app/core/services/courses.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  @Input() courseId: string | null = null;

  formCourse: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    difficulty: new FormControl('', [Validators.required]),
    learningTopics: new FormControl('', [Validators.required]),
    prerequisites: new FormControl(''),
    shortDescription: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl(''),
  });

  fileName = '';
  file: File | null = null;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  prereq: string[] = [];
  preReqError = false;
  fileError = false;
  announcer = inject(LiveAnnouncer);

  constructor(
    private readonly courseService: CoursesService,
    private readonly auth: AuthenticationService,
    private readonly router: Router,
    private readonly activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.router.url === '/add/course')
      return;
    this.activeRouter.params.subscribe((params) => {
      this.courseId = params['id'];
      if (this.courseId || this.courseId === '') {
        this.courseService.getCourse(this.courseId).subscribe({
          next: (course) => {
            if (this.auth.getEmail() !== course.teacherEmail)
              this.router.navigateByUrl('unauthorized');

            this.formCourse.controls['name'].setValue(course.name);
            let hours = Math.floor(course.duration / 60)
              .toString()
              .padStart(2, '0');
            let minutes = (course.duration % 60).toString().padStart(2, '0');
            this.formCourse.controls['duration'].setValue(
              `${hours}:${minutes}`
            );
            this.formCourse.controls['category'].setValue(course.category);
            this.formCourse.controls['difficulty'].setValue(course.difficulty);
            this.formCourse.controls['learningTopics'].setValue(
              course.learningTopics
            );
            this.prereq = course.prerequisites.split(',  ');
            this.formCourse.controls['shortDescription'].setValue(
              course.shortDescription
            );
            this.formCourse.controls['description'].setValue(
              course.description
            );
            this.fileName = course.image;
            this.file = new File(
              [new Uint8Array(new TextEncoder().encode(course.imageContents))],
              course.image,
              { type: 'mimeType' }
            );
          },
          error: (err) => {
            this.router.navigateByUrl('unauthorized');
          },
        });
      } else this.router.navigateByUrl('unauthorized');
    });
  }

  onSubmit(): void {
    if (this.prereq.length === 0) this.preReqError = true;
    else this.preReqError = false;
    if (this.fileName === '') this.fileError = true;
    else this.fileError = false;

    if (
      this.formCourse.valid &&
      !this.preReqError &&
      !this.fileError &&
      this.file !== null
    ) {
      let value = this.formCourse.value;
      value.prerequisites = this.prereq.join(',  ');
      value.duration =
        parseInt(value.duration.split(':')[0]) * 60 +
        parseInt(value.duration.split(':')[1]);

      value.image = this.file;
      if (this.courseId === null) {
        this.courseService
          .addCourse(this.formDataConstructor(value))
          .subscribe((data) => {
            this.router.navigateByUrl('courses');
          });
      } else {
        this.courseService
          .updateCourse(this.courseId, this.formDataConstructor(value))
          .subscribe((data) => {
            this.router.navigateByUrl('courses');
          });
      }
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      this.fileName = file.name;
      this.fileError = false;
    }
  }

  addPrereq(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) this.prereq.push(value);

    event.chipInput!.clear();
    this.formCourse.controls['prerequisites'].setValue('');
  }

  removePrereq(req: string): void {
    const index = this.prereq.indexOf(req);
    if (index >= 0) {
      this.prereq.splice(index, 1);

      this.announcer.announce(`Removed ${req}`);
    }
  }

  private formDataConstructor(value: any): FormData {
    const formData = new FormData();
    formData.append('Name', value.name);
    formData.append('Prerequisites', value.prerequisites);
    formData.append('Difficulty', value.difficulty);
    formData.append('Image', value.image);
    formData.append('Description', value.description);
    formData.append('ShortDescription', value.shortDescription);
    formData.append('Category', value.category);
    formData.append('LearningTopics', value.learningTopics);
    formData.append('Duration', value.duration);

    return formData;
  }
}
