import { Injectable } from '@nestjs/common';
import { ShoppingCart } from './ShoppingCart.model';
import { InjectModel } from '@nestjs/sequelize';
import { BoilerPartsService } from '../boiler-parts/boiler-parts.service';
import { UsersService } from '../users/users.service';
import { AddToCartDto } from './dto/AddToCart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart)
    private shoppingCartModel: typeof ShoppingCart,
    private readonly boilerPartsService: BoilerPartsService,
    private readonly usersService: UsersService,
  ) {}

  findAll = async (userId: number | string): Promise<ShoppingCart[]> => {
    return await this.shoppingCartModel.findAll({ where: { userId } });
  };

  addToCart = async (addToCartDto: AddToCartDto) => {
    const cart = new ShoppingCart();
    const user = await this.usersService.findOne({
      where: { username: addToCartDto.username },
    });

    const part = await this.boilerPartsService.findOne(addToCartDto.partId);

    cart.userId = user.id;
    cart.partId = part.id;
    cart.boiler_manufacturer = part.boiler_manufacturer;
    cart.price = part.price;
    cart.parts_manufacturer = part.parts_manufacturer;
    cart.in_stock = part.in_stock;
    cart.name = part.name;
    cart.image = JSON.parse(part.images)[0];
    cart.total_price = part.price;

    return await cart.save();
  };

  updateCount = async (
    count: number,
    partId: string | number,
  ): Promise<{ count: number }> => {
    await this.shoppingCartModel.update({ count }, { where: { partId } });

    const part = await this.shoppingCartModel.findOne({ where: { partId } });

    return { count: part.count };
  };

  updateTotalPrice = async (
    total_price: number,
    partId: string | number,
  ): Promise<{ total_price: number }> => {
    await this.shoppingCartModel.update({ total_price }, { where: { partId } });

    const part = await this.shoppingCartModel.findOne({ where: { partId } });

    return { total_price: part.total_price };
  };

  remove = async (partId: string | number): Promise<void> => {
    const part = await this.shoppingCartModel.findOne({ where: { partId } });

    await part.destroy();
  };

  removeAll = async (userId: string | number): Promise<void> => {
    await this.shoppingCartModel.destroy({ where: { userId } });
  };
}
