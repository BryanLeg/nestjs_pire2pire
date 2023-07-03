import { CourseEntity } from "src/course/entity/course.entity/course.entity";
import { TrainingEntity } from "src/training/entity/training.entity/training.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("training_courses")
export class TrainingCoursesEntity {
    @PrimaryColumn({name: "training_id"})
    trainingId: number

    @PrimaryColumn({ name: "course_id"})
    courseId: number

    @ManyToOne(() => TrainingEntity, training => training.id)
    @JoinColumn([{name: "traing_id", referencedColumnName: "id"}])
    trainings: TrainingEntity[]

    @ManyToOne(() => CourseEntity, course => course.id)
    @JoinColumn([{name: "course_id", referencedColumnName: "id"}])
    courses: CourseEntity[]
}