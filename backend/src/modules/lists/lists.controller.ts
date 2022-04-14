import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ListDto } from '../../dto/list.dto';
import { UpdateListDto } from '../../dto/update-list.dto';
import { List } from '../../entities/list.entity';
import { ValidatePayloadExistsPipe } from '../../pipes/payload-exists.pipe';
import { ListsService } from './lists.service';

@Controller('lists')
@UseGuards(AuthGuard('jwt'))
export class ListsController {
  constructor(
    private listsService: ListsService
  ) { }

  @Get()
  async getAll(@Request() req: any): Promise<List[]> {
    return await this.listsService.findAll(req.user.id);
  }

  @Get('/:id')
  async getOne(@Request() req: any, @Param('id') id: string): Promise<List> {
    return await this.listsService.findOne(id, req.user.id);
  }

  @Post()
  async create(@Request() req: any, @Body() listDto: ListDto): Promise<List> {
    return await this.listsService.create(listDto, req.user.id);
  }

  @Delete('/:id')
  async delete(@Request() req: any, @Param('id') id: number) {
    return await this.listsService.remove(id, req.user.id);
  }

  @Put('/:id')
  @UsePipes(ValidatePayloadExistsPipe)
  async update(@Param('id') id: number, @Body() listDto: UpdateListDto) {
    return await this.listsService.update(id, listDto);
  }
}
