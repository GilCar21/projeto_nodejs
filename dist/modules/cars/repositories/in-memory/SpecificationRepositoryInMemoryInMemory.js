"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationRepositoryInMemory = void 0;
var _Specification = require("../../infra/typeorm/entities/Specification");
class SpecificationRepositoryInMemory {
  constructor() {
    this.specifications = [];
  }
  async findByName(name) {
    return this.specifications.find(specification => specification.name === name);
  }
  async create({
    name,
    description
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      description,
      name
    });
    this.specifications.push(specification);
    return specification;
  }
  async findByIds(ids) {
    const allSpecification = this.specifications.filter(specification => ids.includes(specification.id));
    return allSpecification;
  }
}
exports.SpecificationRepositoryInMemory = SpecificationRepositoryInMemory;