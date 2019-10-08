import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustController } from "./cust.controller";
import { CustService } from "./cust.service";
import { CustSchema } from "./schemas/cust.schema";
import { Utility } from ".././common/utility";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Cust", schema: CustSchema }])],
  controllers: [CustController],
  
  exports: [
    CustService,
    MongooseModule.forFeature([{ name: "Cust", schema: CustSchema }])
  ],
  providers: [CustService, Utility],
})
export class CustModule {}
