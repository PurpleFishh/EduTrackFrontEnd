import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import {
  CourseContract,
  CourseDisplayDto,
  CourseDto,
  CoursesFilter,
  CoursesFilterDto,
} from '../models/course.model';
import { StudentDto } from '../models/student.model';
import { query } from '@angular/animations';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  readonly endpoint: string = 'Course';

  constructor(private readonly baseService: RestBaseService) {}

  getCourses(filter: CoursesFilter) {
    let url = this.getUrlForFilter(`${this.endpoint}/GetAllCourses`, filter);
    return this.baseService.get<CourseDisplayDto[]>(url);
    //return from(this.courses2);
  }

  getStudentEnrolled(courseName: string) {
    const url = `${this.endpoint}/GetStudentsEnrolled?courseName=${courseName}`;
    return this.baseService.get<StudentDto[]>(url);
  }

  getFilters(filter: CoursesFilter) {
    let url = this.getUrlForFilter(`${this.endpoint}/GetFilters`, filter);
    return this.baseService.get<CoursesFilterDto>(url);
  }

  getCourse(id: string) {
    return this.baseService.get<CourseDto>(
      `${this.endpoint}/GetCourse?courseName=${id}`
    );
  }

  addCourse(course: FormData) {
    return this.baseService.add<boolean, FormData>(
      `${this.endpoint}/AddCourse`,
      course
    );
  }
  getStudentEnrolledCourses() {
    return this.baseService.get<CourseDisplayDto[]>(`${this.endpoint}/GetStudentEnrolledCourses`);
  }
  updateCourse(courseId: string, course: FormData) {
    return this.baseService.update<boolean, FormData>(
      `${this.endpoint}/EditCourse?courseName=${courseId}`,
      course
    );
  }

  getTeacherCourses(teacherEmail:string)
  {
    return this.baseService.get<string[]>(`${this.endpoint}/GetTeacherCourses?email=${teacherEmail}`);
  }


  private getUrlForFilter(baseUrl: string, filter: CoursesFilter) {
    let querys: string[] = [];
    if (filter.search) querys.push(`Title=${filter.search}`);
    if (filter.sortBy) querys.push(`SortBy=${filter.sortBy}`);
    if (filter.difficulties) querys.push(`Difficulties=${filter.difficulties}`);
    if (filter.categories) querys.push(`Categories=${filter.categories}`);
    if (filter.prerequistes.length > 0) {
      filter.prerequistes.forEach((p) => {
        querys.push(`Prerequistes=${p}`);
      });
    }
    baseUrl += `?${querys.join('&')}`;
    return baseUrl;
  }

  searchCourses(search: string) {
    return this.baseService.get<CourseDisplayDto[]>(
      `${this.endpoint}/GetAllCourses/?title=${search}`
    );
  }

  private getCompleteUrlWithQuery(url: string, queryParams: { [key: string]: string }) {
    const queryString = Object.keys(queryParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join('&');
    return `${url}?${queryString}`;
  }

  courses2: CourseDisplayDto[] = [
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'React',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription: 'A library for building user interfaces.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Vue.js',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription: 'A progressive framework for building user interfaces.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Node.js',
      prerequisites: 'JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        "JavaScript runtime built on Chrome's V8 JavaScript engine.",
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Python for Data Science',
      prerequisites: 'Python Basics',
      difficulty: 'Intermediate',
      shortDescription:
        'Learn data analysis, visualization, and machine learning with Python.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Java Programming',
      prerequisites: 'Basic Programming Knowledge',
      difficulty: 'Intermediate',
      shortDescription: 'Comprehensive guide to Java programming language.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'C++ Programming',
      prerequisites: 'Basic Programming Knowledge',
      difficulty: 'Intermediate',
      shortDescription: 'Master the fundamentals of C++ programming.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Swift for iOS Development',
      prerequisites: 'Basic Programming Knowledge',
      difficulty: 'Intermediate',
      shortDescription: 'Build iOS apps using Swift programming language.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Kotlin for Android Development',
      prerequisites: 'Java or Kotlin Basics',
      difficulty: 'Intermediate',
      shortDescription: 'Develop Android apps with Kotlin.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Ruby on Rails',
      prerequisites: 'HTML, CSS, Ruby Basics',
      difficulty: 'Intermediate',
      shortDescription: 'Web application framework written in Ruby.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Django for Web Development',
      prerequisites: 'Python Basics',
      difficulty: 'Intermediate',
      shortDescription: 'High-level Python Web framework.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Machine Learning with Python',
      prerequisites: 'Python, Statistics',
      difficulty: 'Advanced',
      shortDescription: 'Implement machine learning algorithms using Python.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Data Structures and Algorithms',
      prerequisites: 'Basic Programming Knowledge',
      difficulty: 'Advanced',
      shortDescription: 'Learn essential data structures and algorithms.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'HTML & CSS for Beginners',
      prerequisites: 'None',
      difficulty: 'Beginner',
      shortDescription: 'Introduction to HTML and CSS for web development.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'JavaScript for Beginners',
      prerequisites: 'HTML, CSS',
      difficulty: 'Beginner',
      shortDescription: 'Learn the basics of JavaScript programming.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'SQL for Data Analysis',
      prerequisites: 'None',
      difficulty: 'Beginner',
      shortDescription: 'Learn SQL for querying databases.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Introduction to Cloud Computing',
      prerequisites: 'Basic IT Knowledge',
      difficulty: 'Beginner',
      shortDescription: 'Understand the basics of cloud computing.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'AWS Certified Solutions Architect',
      prerequisites: 'Basic Cloud Knowledge',
      difficulty: 'Advanced',
      shortDescription:
        'Prepare for the AWS Solutions Architect certification.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Microsoft Azure Fundamentals',
      prerequisites: 'Basic Cloud Knowledge',
      difficulty: 'Beginner',
      shortDescription: 'Introduction to Microsoft Azure cloud platform.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Google Cloud Platform Essentials',
      prerequisites: 'Basic Cloud Knowledge',
      difficulty: 'Beginner',
      shortDescription: 'Learn the basics of Google Cloud Platform.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Blockchain Basics',
      prerequisites: 'Basic IT Knowledge',
      difficulty: 'Beginner',
      shortDescription: 'Understand the fundamentals of blockchain technology.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Ethereum and Smart Contracts',
      prerequisites: 'Blockchain Basics',
      difficulty: 'Intermediate',
      shortDescription:
        'Learn to develop smart contracts on the Ethereum platform.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Cybersecurity Essentials',
      prerequisites: 'Basic IT Knowledge',
      difficulty: 'Intermediate',
      shortDescription: 'Understand the principles of cybersecurity.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Ethical Hacking',
      prerequisites: 'Cybersecurity Essentials',
      difficulty: 'Advanced',
      shortDescription:
        'Learn penetration testing and ethical hacking techniques.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'DevOps with Docker and Kubernetes',
      prerequisites: 'Basic IT Knowledge',
      difficulty: 'Intermediate',
      shortDescription:
        'Learn containerization and orchestration with Docker and Kubernetes.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Agile Project Management',
      prerequisites: 'Basic Project Management Knowledge',
      difficulty: 'Intermediate',
      shortDescription: 'Learn the principles of Agile methodology.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Scrum Master Certification',
      prerequisites: 'Agile Project Management',
      difficulty: 'Intermediate',
      shortDescription: 'Prepare for Scrum Master certification.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Introduction to Artificial Intelligence',
      prerequisites: 'Basic IT Knowledge',
      difficulty: 'Intermediate',
      shortDescription: 'Learn the basics of artificial intelligence.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Deep Learning with TensorFlow',
      prerequisites: 'Machine Learning Basics',
      difficulty: 'Advanced',
      shortDescription: 'Implement deep learning models using TensorFlow.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Natural Language Processing with Python',
      prerequisites: 'Python, Machine Learning Basics',
      difficulty: 'Advanced',
      shortDescription:
        'Learn to process and analyze text data using NLP techniques.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'React',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription: 'A library for building user interfaces.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Vue.js',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription: 'A progressive framework for building user interfaces.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Node.js',
      prerequisites: 'JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        "JavaScript runtime built on Chrome's V8 JavaScript engine.",
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Python for Data Science',
      prerequisites: 'Python Basics',
      difficulty: 'Intermediate',
      shortDescription:
        'Learn data analysis, visualization, and machine learning with Python.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Java Programming',
      prerequisites: 'Basic Programming Knowledge',
      difficulty: 'Intermediate',
      shortDescription: 'Comprehensive guide to Java programming language.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'C++ Programming',
      prerequisites: 'Basic Programming Knowledge',
      difficulty: 'Intermediate',
      shortDescription: 'Master the fundamentals of C++ programming.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Swift for iOS Development',
      prerequisites: 'Basic Programming Knowledge',
      difficulty: 'Intermediate',
      shortDescription: 'Build iOS apps using Swift programming language.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Kotlin for Android Development',
      prerequisites: 'Java or Kotlin Basics',
      difficulty: 'Intermediate',
      shortDescription: 'Develop Android apps with Kotlin.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Ruby on Rails',
      prerequisites: 'HTML, CSS, Ruby Basics',
      difficulty: 'Intermediate',
      shortDescription: 'Web application framework written in Ruby.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Django for Web Development',
      prerequisites: 'Python Basics',
      difficulty: 'Intermediate',
      shortDescription: 'High-level Python Web framework.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Machine Learning with Python',
      prerequisites: 'Python, Statistics',
      difficulty: 'Advanced',
      shortDescription: 'Implement machine learning algorithms using Python.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Data Structures and Algorithms',
      prerequisites: 'Basic Programming Knowledge',
      difficulty: 'Advanced',
      shortDescription: 'Learn essential data structures and algorithms.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'HTML & CSS for Beginners',
      prerequisites: 'None',
      difficulty: 'Beginner',
      shortDescription: 'Introduction to HTML and CSS for web development.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'JavaScript for Beginners',
      prerequisites: 'HTML, CSS',
      difficulty: 'Beginner',
      shortDescription: 'Learn the basics of JavaScript programming.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'SQL for Data Analysis',
      prerequisites: 'None',
      difficulty: 'Beginner',
      shortDescription: 'Learn SQL for querying databases.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Introduction to Cloud Computing',
      prerequisites: 'Basic IT Knowledge',
      difficulty: 'Beginner',
      shortDescription: 'Understand the basics of cloud computing.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'AWS Certified Solutions Architect',
      prerequisites: 'Basic Cloud Knowledge',
      difficulty: 'Advanced',
      shortDescription:
        'Prepare for the AWS Solutions Architect certification.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Microsoft Azure Fundamentals',
      prerequisites: 'Basic Cloud Knowledge',
      difficulty: 'Beginner',
      shortDescription: 'Introduction to Microsoft Azure cloud platform.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Google Cloud Platform Essentials',
      prerequisites: 'Basic Cloud Knowledge',
      difficulty: 'Beginner',
      shortDescription: 'Learn the basics of Google Cloud Platform.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Blockchain Basics',
      prerequisites: 'Basic IT Knowledge',
      difficulty: 'Beginner',
      shortDescription: 'Understand the fundamentals of blockchain technology.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Ethereum and Smart Contracts',
      prerequisites: 'Blockchain Basics',
      difficulty: 'Intermediate',
      shortDescription:
        'Learn to develop smart contracts on the Ethereum platform.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Cybersecurity Essentials',
      prerequisites: 'Basic IT Knowledge',
      difficulty: 'Intermediate',
      shortDescription: 'Understand the principles of cybersecurity.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Ethical Hacking',
      prerequisites: 'Cybersecurity Essentials',
      difficulty: 'Advanced',
      shortDescription:
        'Learn penetration testing and ethical hacking techniques.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'DevOps with Docker and Kubernetes',
      prerequisites: 'Basic IT Knowledge',
      difficulty: 'Intermediate',
      shortDescription:
        'Learn containerization and orchestration with Docker and Kubernetes.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Agile Project Management',
      prerequisites: 'Basic Project Management Knowledge',
      difficulty: 'Intermediate',
      shortDescription: 'Learn the principles of Agile methodology.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Scrum Master Certification',
      prerequisites: 'Agile Project Management',
      difficulty: 'Intermediate',
      shortDescription: 'Prepare for Scrum Master certification.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Introduction to Artificial Intelligence',
      prerequisites: 'Basic IT Knowledge',
      difficulty: 'Intermediate',
      shortDescription: 'Learn the basics of artificial intelligence.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Deep Learning with TensorFlow',
      prerequisites: 'Machine Learning Basics',
      difficulty: 'Advanced',
      shortDescription: 'Implement deep learning models using TensorFlow.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Natural Language Processing with Python',
      prerequisites: 'Python, Machine Learning Basics',
      difficulty: 'Advanced',
      shortDescription:
        'Learn to process and analyze text data using NLP techniques.',
      imageContents: '...', // Base64 image contents
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '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',
    },
    {
      name: 'React',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription: 'A JavaScript library for building user interfaces.',
      imageContents:
        'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
      name: 'Vue',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription: 'A progressive framework for building user interfaces.',
      imageContents: 'https://vuejs.org/imageContentss/logo',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        'iVBORw0KGgoAAAANSUhEUgAAAfQAAABkCAYAAABwx8J9AAAAAXNSR0IArs4c6QAABtNJREFUeF7t1UENwgAQRcHtmVsPtUCC0NpoUIIILACpC2rjHWYVbP47zHJb1/+4zALn95f5xSMz99fbDKEFtv0Z+sYrn+NhhNACC9BDNWYG6K0eQG/1AHqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vo8LHthUIj+1NVkAAAAASUVORK5CYII=',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        'iVBORw0KGgoAAAANSUhEUgAAAfQAAABkCAYAAABwx8J9AAAAAXNSR0IArs4c6QAABtNJREFUeF7t1UENwgAQRcHtmVsPtUCC0NpoUIIILACpC2rjHWYVbP47zHJb1/+4zALn95f5xSMz99fbDKEFtv0Z+sYrn+NhhNACC9BDNWYG6K0eQG/1AHqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vo8LHthUIj+1NVkAAAAASUVORK5CYII=',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        'iVBORw0KGgoAAAANSUhEUgAAAfQAAABkCAYAAABwx8J9AAAAAXNSR0IArs4c6QAABtNJREFUeF7t1UENwgAQRcHtmVsPtUCC0NpoUIIILACpC2rjHWYVbP47zHJb1/+4zALn95f5xSMz99fbDKEFtv0Z+sYrn+NhhNACC9BDNWYG6K0eQG/1AHqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vg+gt3oAPdYD6K0gQG/1AHqrB9BbPYAe6wH0VhCgt3oAvdUD6K0eQI/1AHorCNBbPYDe6gH0Vg+gx3oAvRUE6K0eQG/1AHqrB9BjPYDeCgL0Vg+gt3oAvdUD6LEeQG8FAXqrB9BbPYDe6gH0WA+gt4IAvdUD6K0eQG/1AHqsB9BbQYDe6gH0Vo8LHthUIj+1NVkAAAAASUVORK5CYII=',
    },
    {
      name: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription:
        'A powerful framework for building single-page applications.',
      imageContents:
        '' +
        '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',
    },
  ];
}
