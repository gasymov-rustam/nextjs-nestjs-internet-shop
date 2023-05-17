import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { BoilerParts } from './BoilerParts.model';
import { IBoilerPartsFilter, IBoilerPartsQuery } from './types';

type IBoilerParts = {
  count: number;
  rows: BoilerParts[];
};

@Injectable()
export class BoilerPartsService {
  constructor(
    @InjectModel(BoilerParts)
    private boilerPartsModel: typeof BoilerParts,
  ) {}

  paginateAndFilter = async (
    query: IBoilerPartsQuery,
  ): Promise<IBoilerParts> => {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    const filter = {} as Partial<IBoilerPartsFilter>;

    if (query.priceFrom && query.priceTo) {
      filter.price = {
        [Op.between]: [+query.priceFrom, +query.priceTo],
      };
    }

    if (query.boiler) {
      filter.boiler_manufacturer = JSON.parse(decodeURIComponent(query.boiler));
    }

    if (query.parts) {
      filter.parts_manufacturer = JSON.parse(decodeURIComponent(query.parts));
    }

    return this.boilerPartsModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });
  };

  bestsellers = async (): Promise<IBoilerParts> => {
    return this.boilerPartsModel.findAndCountAll({
      where: { bestseller: true },
    });
  };

  new = async (): Promise<IBoilerParts> => {
    return this.boilerPartsModel.findAndCountAll({
      where: { new: true },
    });
  };

  findOne = async (id: number | string): Promise<BoilerParts> => {
    return this.boilerPartsModel.findOne({
      where: { id },
    });
  };

  findOneByName = async (name: string): Promise<BoilerParts> => {
    return this.boilerPartsModel.findOne({
      where: { name },
    });
  };

  searchByString = async (str: string): Promise<IBoilerParts> => {
    return this.boilerPartsModel.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  };
}
