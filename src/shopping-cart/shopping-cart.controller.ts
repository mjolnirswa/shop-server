import { ShoppingCartService } from './shopping-cart.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ApiOkResponse, ApiBody } from '@nestjs/swagger';
import {
  AddToCardResponse,
  GetAllResponse,
  TotalPriceRequest,
  TotalPriceResponse,
  UpdateCountRequest,
  UpdateCountResponse,
} from './types';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiOkResponse({ type: [GetAllResponse] })
  @UseGuards(AuthGuard)
  @Get(':id')
  getAll(@Param('id') userId: string) {
    return this.shoppingCartService.findAll(userId);
  }

  @ApiOkResponse({ type: AddToCardResponse })
  @UseGuards(AuthGuard)
  @Post('/add')
  addToCar(@Body() addToCartDto: AddToCartDto) {
    return this.shoppingCartService.add(addToCartDto);
  }

  @ApiOkResponse({ type: UpdateCountResponse })
  @ApiBody({ type: UpdateCountRequest })
  @UseGuards(AuthGuard)
  @Patch('/count/:id')
  updateCount(
    @Body() { count }: { count: number },
    @Param('id') partid: string,
  ) {
    return this.shoppingCartService.updateCount(count, partid);
  }

  @ApiOkResponse({ type: TotalPriceResponse })
  @ApiBody({ type: TotalPriceRequest })
  @UseGuards(AuthGuard)
  @Patch('/total-price/:id')
  updateTotalPrice(
    @Body() { total_price }: { total_price: number },
    @Param('id') partid: string,
  ) {
    return this.shoppingCartService.updateTotalPrice(total_price, partid);
  }

  @UseGuards(AuthGuard)
  @Delete('/one/:id')
  removeOne(@Param('id') partId: string) {
    return this.shoppingCartService.remove(partId);
  }

  @UseGuards(AuthGuard)
  @Delete('/all/:id')
  removeAll(@Param('id') userId: string) {
    return this.shoppingCartService.removeAll(userId);
  }
}
