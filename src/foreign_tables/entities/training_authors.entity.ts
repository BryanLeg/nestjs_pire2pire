import { TrainingEntity } from "src/training/entity/training.entity/training.entity";
import { UserEntity } from "src/user/entity/user.entity/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("training_authors")
export class TrainingAuthorsEntity {
    @PrimaryColumn({name: "training_id"})
    trainingId: number;

    @PrimaryColumn({name: "user_id"})
    userId: number

    @ManyToOne(() => TrainingEntity, 
    training => training.authors)
    @JoinColumn([{name: "training_id", referencedColumnName: 'id'}])
    trainings: TrainingEntity[]

    @ManyToOne(() => UserEntity,
    user => user.trainingsCreated)
    @JoinColumn([{name: "user_id", referencedColumnName: "id"}])
    user : UserEntity[]
}