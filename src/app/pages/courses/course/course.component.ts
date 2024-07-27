import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CourseDisplayDto } from 'src/app/core/models/course.model';
import { FileReaderService } from 'src/app/core/services/file-reader.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  @Input({ required: true }) course!: CourseDisplayDto;

  constructor(private readonly fileReader: FileReaderService, private readonly router: Router) {}

  ngOnInit() {
    this.course.imageContents = this.fileReader.readImage(this.course.imageContents);
  }

  goToCourse()
  {
    this.router.navigateByUrl(`course/${this.course.name}`);
  }
}
