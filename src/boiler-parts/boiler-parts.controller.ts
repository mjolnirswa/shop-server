import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BoilerPartsService } from './boiler-parts.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  FindOneResponse,
  GetBestsellersResponse,
  GetByNameRequest,
  GetByNameResponse,
  GetNewResponse,
  PaginateAndFilterResponse,
  SearchRequest,
  SearchResponse,
} from './types';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('boiler-parts')
export class BoilerPartsController {
  constructor(private readonly boilerPartService: BoilerPartsService) {}

  @ApiOkResponse({ type: [PaginateAndFilterResponse] })
  @UseGuards(AuthGuard)
  @Get()
  paginateAndFilter(@Query() query) {
    return this.boilerPartService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: [FindOneResponse] })
  @UseGuards(AuthGuard)
  @Get('find/:id')
  getOne(@Param('id') id: string) {
    return this.boilerPartService.findOne(+id);
  }

  @ApiOkResponse({ type: [GetBestsellersResponse] })
  @UseGuards(AuthGuard)
  @Get('bestsellers')
  getBestsellers() {
    return this.boilerPartService.bestsellers();
  }

  @ApiOkResponse({ type: [GetNewResponse] })
  @UseGuards(AuthGuard)
  @Get('new')
  getNew() {
    return this.boilerPartService.new();
  }

  @ApiOkResponse({ type: [SearchResponse] })
  @ApiBody({ type: [SearchRequest] })
  @UseGuards(AuthGuard)
  @Post('search')
  search(@Body() { search }: { search: string }) {
    return this.boilerPartService.searchByString(search);
  }

  @ApiOkResponse({ type: GetByNameResponse })
  @ApiBody({ type: GetByNameRequest })
  @UseGuards(AuthGuard)
  @Post('name')
  getByName(@Body() { name }: { name: string }) {
    return this.boilerPartService.findOneByName(name);
  }
}
