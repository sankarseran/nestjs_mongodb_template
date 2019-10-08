import { Model, PassportLocalModel } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { debug } from "console";
import { ICustService } from "./interfaces/icust.service";
import { ICust } from "./interfaces/cust.interface";
import { CreateDto, ListDto } from "./dto/cust.dto";


@Injectable()
export class CustService implements ICustService {
  constructor(
    @InjectModel("Cust") private readonly custModel: PassportLocalModel<ICust>
  ) {}
  async findAll(): Promise<ICust[]> {
    return await this.custModel.find().exec();
  }
  
  async list(ListDto: ListDto): Promise<ICust[]> {
      let skip = Number(ListDto.skip);
      let limit = Number(ListDto.limit);
    return await this.custModel.find().skip(skip).limit(limit).exec();
  }

  async findOne(options: object): Promise<ICust> {
    return await this.custModel.findOne(options).exec();
  }

  async findById(ID: number): Promise<ICust> {
    return await this.custModel.findById(ID).exec();
  }
  async create(createDto: CreateDto): Promise<ICust> {
    const createdCust = new this.custModel(createDto);
    return await createdCust.save();
  }

  async update(ID: number, newValue: ICust): Promise<ICust> {
    const cust = await this.custModel.findById(ID).exec();

    if (!cust._id) {
      debug("user not found");
    }

    await this.custModel.findByIdAndUpdate(ID, newValue).exec();
    return await this.custModel.findById(ID).exec();
  }
  async delete(ID: number): Promise<string> {
    try {
      await this.custModel.findByIdAndRemove(ID).exec();
      return "The user has been deleted";
    } catch (err) {
      debug(err);
      return "The user could not be deleted";
    }
  }
}
