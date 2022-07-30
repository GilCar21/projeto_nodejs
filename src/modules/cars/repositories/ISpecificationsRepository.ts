import { Specification } from "../entities/Specification";

interface ICreateSpecicationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  create({ name, description }: ICreateSpecicationDTO): Promise<void>;
}

export { ICreateSpecicationDTO, ISpecificationsRepository };
