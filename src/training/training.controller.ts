import { Body, Controller, Get, Post } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingDto } from './dto/training.dto/training.dto';

@Controller('training')
export class TrainingController {
    constructor(private trainingService: TrainingService
    ) {}

    @Post()
    async create(@Body() training: TrainingDto): Promise<TrainingDto> {
        return this.trainingService.create(training)
    }

    @Get()
    async findAll() {
        return this.trainingService.findAll()
    }
}
