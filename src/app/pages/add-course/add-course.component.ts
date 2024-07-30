import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import { CourseContract } from 'src/app/core/models/course.model';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  prereq: string[] = [];
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

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fileName = '';
  file: File | null = null;
  preReqError = false;
  fileError = false;
  announcer = inject(LiveAnnouncer);

  constructor(private readonly courseService: CoursesService, private readonly router: Router) {}

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
      value.image = this.file;
      value.prerequisites = this.prereq.join(',  ');
      value.duration =
        parseInt(value.duration.split(':')[0]) * 60 +
        parseInt(value.duration.split(':')[1]);

      this.courseService.addCourse(this.formDataConstructor(value)).subscribe((data) => {
        this.router.navigateByUrl('courses');
      });
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
