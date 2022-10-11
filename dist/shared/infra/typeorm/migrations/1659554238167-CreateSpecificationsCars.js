"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationsCars1659554238167 = void 0;
var _typeorm = require("typeorm");
class CreateSpecificationsCars1659554238167 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "specification_cars",
      columns: [{
        name: "car_id",
        type: "uuid"
      }, {
        name: "specification_id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
    await queryRunner.createForeignKey("specification_cars", new _typeorm.TableForeignKey({
      name: "FKSpecificationCar",
      referencedTableName: "specifications",
      referencedColumnNames: ["id"],
      columnNames: ["specification_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
    await queryRunner.createForeignKey("specification_cars", new _typeorm.TableForeignKey({
      name: "FKCarSpecification",
      referencedTableName: "cars",
      referencedColumnNames: ["id"],
      columnNames: ["car_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropForeignKey("specification_cars", "FKCarSpecification");
    await queryRunner.dropForeignKey("specification_cars", "FKSpecificationCar");
    await queryRunner.dropTable("specification_cars");
  }
}
exports.CreateSpecificationsCars1659554238167 = CreateSpecificationsCars1659554238167;