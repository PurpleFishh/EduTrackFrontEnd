import { Component, Input } from '@angular/core';
import { CourseDisplayDto } from 'src/app/core/models/course.model';
import { FileReaderService } from 'src/app/core/services/file-reader.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  @Input({ required: true }) course!: CourseDisplayDto;

  constructor(private readonly fileReader: FileReaderService) {}

  ngOnInit() {
    this.course.imageContents = this.fileReader.readImage(this.course.imageContents);
  }
}
