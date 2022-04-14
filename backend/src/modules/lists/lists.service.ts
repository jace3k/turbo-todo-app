import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nRequestScopeService, I18nService } from "nestjs-i18n";
import { DeleteResult, Repository } from "typeorm";
import { ListDto } from "../../dto/list.dto";
import { UpdateListDto } from "../../dto/update-list.dto";
import { List } from "../../entities/list.entity";

@Injectable()
export class ListsService {
  constructor(

    @InjectRepository(List)
    private listsRepository: Repository<List>,
    private readonly i18n: I18nRequestScopeService
  ) { }

  findAll(user: number): Promise<List[]> {
    return this.listsRepository.find({
      where: { user }
    });
  }

  async findOne(id: string, user: number): Promise<List> {

    const list = await this.listsRepository.findOne({
      where: { id, user },
      relations: ['todos']
    });
    if (!list) {
      const errorMessage = await this.i18n.translate('list.NOT_FOUND');
      throw new NotFoundException(errorMessage);
    }

    return list;
  }

  async remove(id: number, user: number): Promise<DeleteResult> {
    return await this.listsRepository.delete({ id, user });
  }

  async create(listDto: ListDto, user: number) {
    return this.listsRepository.save({ ...listDto, user });
  }

  async update(id: number, listDto: UpdateListDto) {
    const existingList = await this.listsRepository.findOne(id);
    if (!existingList) {
      const errorMessage = await this.i18n.translate('list.NOT_FOUND');
      throw new NotFoundException(errorMessage);
    }

    return this.listsRepository.update(id, listDto);
  }
}