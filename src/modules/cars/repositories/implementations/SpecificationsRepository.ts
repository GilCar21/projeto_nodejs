import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
  ICreateSpecicationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecicationDTO): Promise<void> {
    const specifications = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specifications);
  }

  async findByName(name: string): Promise<Specification> {
    const specifications = await this.repository.findOne({
      name,
    });

    return specifications;
  }
}

export { SpecificationsRepository };
