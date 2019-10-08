import { ICust } from "./cust.interface";

export interface ICustService {
  findAll(): Promise<ICust[]>;
  findById(ID: number): Promise<ICust | null>;
  findOne(options: object): Promise<ICust | null>;
  create(cust: ICust): Promise<ICust>;
  update(ID: number, newValue: ICust): Promise<ICust | null>;
  delete(ID: number): Promise<string>;
}
