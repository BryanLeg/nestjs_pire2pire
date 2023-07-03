import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/create-user.dto';
import { RoleEntity } from 'src/role/entity/role.entity/role.entity';
import { RoleDto } from 'src/role/dto/role.dto/role.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,

        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>
    ){}

    async create(user: UserDto): Promise<UserDto> {
        const newUser = this.userRepository.create(user)
        await this.userRepository.save(newUser)
        const role: RoleDto = {"isAdmin": user.isAdmin, "isStudent": user.isStudent, "isFormer": user.isFormer, "userId": newUser.id}
        this.roleRepository.save(role)
        return user
    }

    findAll(): Promise<UserDto[]> {
        return this.userRepository.find({
            relations: ["role", "trainingsCreated"]
        })
    }

    findOne(id: string): Promise<UserDto> {
        return this.userRepository.findOne({where: {id: +id}})
    }

    async editUser(id: string, user: UserDto) {
        const userToEdit = await this.userRepository.findOne({where: {id: +id}})
        if(!userToEdit) {
            return new NotFoundException('no user at this id')
        }
        if(user.name) {
            userToEdit.name = user.name
        }
        if(user.firstName) {
            userToEdit.firstName = user.firstName
        }
        if(user.birthDate) {
            userToEdit.birthDate = user.birthDate
        }
        if(user.adress) {
            userToEdit.adress = user.adress
        }
        this.userRepository.save(userToEdit)
        return userToEdit
    }

    deleteUser(id: string) {
        this.userRepository.delete(id)
    }
}
