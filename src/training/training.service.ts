import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingEntity } from './entity/training.entity/training.entity';
import { TrainingDto } from './dto/training.dto/training.dto';
import { Repository } from 'typeorm';
import { CourseDto } from 'src/course/dto/course.dto/course.dto';
import { CourseEntity } from 'src/course/entity/course.entity/course.entity';
import { LessonEntity } from 'src/lesson/entity/lesson.entity/lesson.entity';
import { LessonDto } from 'src/lesson/dto/lesson.dto/lesson.dto';
import { TrainingAuthorsEntity } from 'src/foreign_tables/entities/training_authors.entity';

@Injectable()
export class TrainingService {
    constructor(
        @InjectRepository(TrainingEntity)
        private trainingRepository: Repository<TrainingEntity>,

        @InjectRepository(CourseEntity)
        private courseRepository: Repository<CourseEntity>,

        @InjectRepository(LessonEntity)
        private lessonRepository: Repository<LessonEntity>,
        
        @InjectRepository(TrainingAuthorsEntity)
        private trainingAuthorsRepository: Repository<TrainingAuthorsEntity>
        ) {}
    async create(training: TrainingDto): Promise<TrainingDto> {
        const newTraining = this.trainingRepository.create(training)
        await this.trainingRepository.save(newTraining)

        const course: CourseDto = {"courseObjective": training.courseObjective, "courseTitle": training.courseTitle, "courseDuration": training.courseDuration, "courseNumber": training.courseNumber}
        const newCourse = this.courseRepository.create(course)
        await this.courseRepository.save(newCourse)

        const lesson: LessonDto = { "lessonContent": training.lessonContent, "lessonTitle": training.lessonTitle}
        const newLesson = this.lessonRepository.create(lesson)
        await this.lessonRepository.save(newLesson)
        
        const trainingAuthors = this.trainingAuthorsRepository.create({"trainingId": newTraining.id, "userId": training.userId})
        await this.trainingAuthorsRepository.save(trainingAuthors)

        return training
    }
}
