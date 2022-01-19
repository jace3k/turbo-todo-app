import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ListDto } from '../../dto/list.dto';
import { UpdateListDto } from '../../dto/update-list.dto';
import { List } from '../../entities/list.entity';
import { ValidatePayloadExistsPipe } from '../../pipes/payload-exists.pipe';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(
    private listsService: ListsService
  ) {}

  @Get()
  async getAll(): Promise<List[]> {
    return await this.listsService.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<List> {
    return await this.listsService.findOne(id);
  }

  @Post()
  async create(@Body() listDto: ListDto): Promise<List> {
    return await this.listsService.create(listDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.listsService.remove(id);
  }

  @Put('/:id')
  @UsePipes(ValidatePayloadExistsPipe)
  async update(@Param('id') id: number, @Body() listDto: UpdateListDto) {
    return await this.listsService.update(id, listDto);
  }
}
