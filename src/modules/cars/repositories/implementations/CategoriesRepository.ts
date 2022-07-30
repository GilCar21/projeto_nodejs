import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private reposirory: Repository<Category>;

  constructor() {
    this.reposirory = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.reposirory.create({
      description,
      name,
    });
    await this.reposirory.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.reposirory.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.reposirory.findOne({ name });
    return category;
  }
}

export { CategoriesRepository };
