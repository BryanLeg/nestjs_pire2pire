import { CourseEntity } from "src/course/entity/course.entity/course.entity";
import { RoleEntity } from "src/role/entity/role.entity/role.entity";
import { TrainingEntity } from "src/training/entity/training.entity/training.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({ name: "user_id"})
    id: number

    @Column({name: "user_name", type: "varchar", nullable: false})
    name: string

    @Column({name: "user_first_name", type: "varchar", nullable: false})
    firstName: string

    @Column({name: "user_birth_date", type: "date", nullable: true})
    birthDate: string
    
    @Column({name: "user_adress", type: "varchar", nullable: true})
    adress: string

    @OneToOne(() => RoleEntity, role => role.user)
    role: RoleEntity

    @ManyToMany(() => TrainingEntity, (training) => training.authors)
    trainingsCreated?: TrainingEntity[]
    
    @ManyToMany(() => CourseEntity, (course) => course.authors)
    coursesFollowed: CourseEntity[]
}
