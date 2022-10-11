import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecicationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  create({ name, description }: ICreateSpecicationDTO): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ICreateSpecicationDTO, ISpecificationsRepository };
