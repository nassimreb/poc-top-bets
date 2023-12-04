import { IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryPaginationDto {
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 2,
    description: 'Page number for pagination, starting from 1.',
  })
  page: number;
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: 10,
    description: 'Maximum number of items to display per page.',
  })
  limit: number;
}
