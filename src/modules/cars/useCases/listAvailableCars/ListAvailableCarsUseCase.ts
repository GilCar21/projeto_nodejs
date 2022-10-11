import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

interface IResquest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarRepository
  ) {}

  async execute({ category_id, brand, name }: IResquest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      category_id,
      brand,
      name
    );
    return cars;
  }
}
export { ListAvailableCarsUseCase };
