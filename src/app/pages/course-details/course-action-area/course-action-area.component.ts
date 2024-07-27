import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { CourseDto } from 'src/app/core/models/course.model';
import { FileReaderService } from 'src/app/core/services/file-reader.service';

@Component({
  selector: 'app-course-action-area',
  templateUrl: './course-action-area.component.html',
  styleUrls: ['./course-action-area.component.scss']
})
export class CourseActionAreaComponent implements  AfterContentInit  {
  @Input({ required: true }) course!: CourseDto;
  minutesDuration: number = 0;
  hoursDuration: number = 0;

  constructor(private readonly fileReader: FileReaderService) {}

  ngAfterContentInit() {
    this.hoursDuration = Math.floor(this.course.duration / 60);
    this.minutesDuration = this.course.duration % 60;

    this.course.imageContents = this.fileReader.readImage(this.course.imageContents);
  }
}
