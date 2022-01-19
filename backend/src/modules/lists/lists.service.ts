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

  findAll(): Promise<List[]> {
    return this.listsRepository.find();
  }

  async findOne(id: string): Promise<List> {

    const list = await this.listsRepository.findOne({
      where: { id },
      relations: ['todos']
    });
    if (!list) {
      const errorMessage = await this.i18n.translate('list.NOT_FOUND');
      throw new NotFoundException(errorMessage);
    }

    return list;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.listsRepository.delete(id);
  }

  async create(listDto: ListDto) {
    return this.listsRepository.save(listDto);
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