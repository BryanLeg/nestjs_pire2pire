import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService
        ) {}

    @Post()
    async create(@Body() user: UserDto): Promise<UserDto>{
        return this.userService.create(user)
    }

    @Get()
    async findAll(): Promise<UserDto[]> {
        return this.userService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserDto> {
        return this.userService.findOne(id)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }
    
    @Patch(':id')
    async editUser(@Param('id') id: string, @Body() user: UserDto) {
        return this.userService.editUser(id, user)
    }
}
