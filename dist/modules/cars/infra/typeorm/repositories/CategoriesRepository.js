"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;
var _typeorm = require("typeorm");
var _Category = require("../entities/Category");
class CategoriesRepository {
  constructor() {
    this.reposirory = void 0;
    this.reposirory = (0, _typeorm.getRepository)(_Category.Category);
  }
  async create({
    name,
    description
  }) {
    const category = this.reposirory.create({
      description,
      name
    });
    await this.reposirory.save(category);
  }
  async list() {
    const categories = await this.reposirory.find();
    return categories;
  }
  async findByName(name) {
    const category = await this.reposirory.findOne({
      name
    });
    return category;
  }
}
exports.CategoriesRepository = CategoriesRepository;