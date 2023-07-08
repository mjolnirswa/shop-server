import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from './shopping-cart.model';
import { UsersService } from 'src/users/users.service';
import { BoilerPartsService } from 'src/boiler-parts/boiler-parts.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart) private shoppingCart: typeof ShoppingCart,
    private readonly userService: UsersService,
    private readonly boilerPartService: BoilerPartsService,
  ) {}

  async findAll(userId: number | string): Promise<ShoppingCart[]> {
    return this.shoppingCart.findAll({ where: { userId } });
  }

  async add(addToCartDto: AddToCartDto) {
    const cart = new ShoppingCart();
    const user = await this.userService.findOne({
      where: { username: addToCartDto.username },
    });
    const part = await this.boilerPartService.findOne(addToCartDto.partId);

    cart.userId = user.id;
    cart.partId = part.id;
    cart.boiler_manufacturer = part.boiler_manufacturer;
    cart.parts_manufacturer = part.parts_manufacturer;
    cart.price = part.price;
    cart.in_stock = part.in_stock;
    cart.image = JSON.parse(part.images)[0];
    cart.name = part.name;
    cart.total_price = part.price;

    return cart.save();
  }

  async updateCount(
    count: number,
    partId: number | string,
  ): Promise<{ count: number }> {
    await this.shoppingCart.update({ count }, { where: { partId } });

    const part = await this.shoppingCart.findOne({ where: { partId } });

    return { count: part.count };
  }

  async updateTotalPrice(
    total_price: number,
    partId: number | string,
  ): Promise<{ total_price: number }> {
    await this.shoppingCart.update({ total_price }, { where: { partId } });

    const part = await this.shoppingCart.findOne({ where: { partId } });

    return { total_price: part.total_price };
  }

  async remove(partId: number | string): Promise<void> {
    const part = await this.shoppingCart.findOne({ where: { partId } });

    await part.destroy();
  }

  async removeAll(userId: number | string): Promise<void> {
    await this.shoppingCart.destroy({ where: { userId } });
  }
}
