import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entity/user.entity/user.entity';
import { RoleModule } from './role/role.module';
import { RoleEntity } from './role/entity/role.entity/role.entity';
import { TrainingModule } from './training/training.module';
import { LessonModule } from './lesson/lesson.module';
import { CourseModule } from './course/course.module';
import { TagCourseModule } from './tag_course/tag_course.module';
import { TagLessonModule } from './tag_lesson/tag_lesson.module';
import { CourseEntity } from './course/entity/course.entity/course.entity';
import { TrainingEntity } from './training/entity/training.entity/training.entity';
import { LessonEntity } from './lesson/entity/lesson.entity/lesson.entity';
import { TagCourseEntity } from './tag_course/entity/tag_course.entity/tag_course.entity';
import { TagLessonEntity } from './tag_lesson/entity/tag_lesson.entity/tag_lesson.entity';
import { TrainingAuthorsEntity } from './foreign_tables/entities/training_authors.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yukionna',
      database: 'p2p_db',
      entities: [UserEntity, RoleEntity, CourseEntity, TrainingEntity, LessonEntity, TagCourseEntity, TagLessonEntity, TrainingAuthorsEntity],
      synchronize: true,
    }),
    UserModule,
    RoleModule,
    TrainingModule,
    LessonModule,
    CourseModule,
    TagCourseModule,
    TagLessonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
