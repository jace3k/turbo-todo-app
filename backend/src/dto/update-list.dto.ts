import { ListDto } from "./list.dto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateListDto extends PartialType(ListDto) {}