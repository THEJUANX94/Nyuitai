import { Column, Entity, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'


@Entity('People')
export class People extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    personName: String

    @Column()
    personBirthDate: Date

    @Column()
    gender: String
}