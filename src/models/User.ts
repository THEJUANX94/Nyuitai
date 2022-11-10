import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, Unique } from 'typeorm'
import bcrypt from "bcryptjs";

@Entity('users')
export class users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    mailUser: string

    @Column()
    passwordUser: string

    @Column()
    UserNick: string

    @Column()
    idPeople: number

   public encryptPassword = async(password: string): Promise<string> => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
   };

   public validatePassword = async (password: string): Promise<boolean> => {
        return await bcrypt.compare(password, this.passwordUser);
   }
}