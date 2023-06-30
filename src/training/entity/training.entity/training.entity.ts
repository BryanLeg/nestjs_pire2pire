import { CourseEntity } from "src/course/entity/course.entity/course.entity";
import { UserEntity } from "src/user/entity/user.entity/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("trainings")
export class TrainingEntity {
    @PrimaryGeneratedColumn({name: "training_id"})
    id: number

    @Column({name: "training_title", type: "varchar"})
    title: string
    
    @ManyToMany(() => UserEntity, (author) => author.id, {cascade: true})
    @JoinTable({name: "training_authors",
    joinColumn: {
        name: "training_id",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "user_id",
        referencedColumnName: "id"
    }
    })
    authors?: UserEntity[]

    @ManyToMany(() => CourseEntity, (course) => course.id, {cascade: true})
    @JoinTable({name: "training_courses",
    joinColumn: {
        name: "training_id",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "course_id",
        referencedColumnName: "id"
    }})
    courses: CourseEntity[]
}
