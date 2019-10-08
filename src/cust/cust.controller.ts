import {
  Controller,
  Get,
  Response,
  HttpStatus,
  Param,
  Body,
  Post,
  Request,
  Patch,
  Delete
} from "@nestjs/common";
import { ApiUseTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { CreateDto, UpdateDto, ViewDto, ListDto, DeleteDto } from "./dto/cust.dto";
import { CustService } from "./cust.service";
import { Utility } from ".././common/utility";
import { ResMessage } from ".././common/res.message";
import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator";
import  * as jwt from 'jsonwebtoken';
import * as config from "config";
//import { role } from "./schemas/user.schema";




@ApiUseTags("cust")
@Controller("cust")
export class CustController {
    constructor(
    private readonly custService: CustService,
    private readonly Utility: Utility
    
    
      ) {
    
  }
    
  @Post('create')
  public async create(
      @Response() res,
      @Request() req,
      @Body() CreateDto: CreateDto
      ) {
      try {

      const result = await this.custService.create(CreateDto);
      return this.Utility.sendSucc(req,res,result,ResMessage.CREATED_SUCC);
      
      } catch (e){
      return this.Utility.sendErr(req,res,e);
      }
  }
  
  @Post('update')
  public async update(
      @Response() res,
      @Request() req,
      @Body() UpdateDto: UpdateDto
      ) {
      try {

      const custData = await this.custService.findOne({_id:UpdateDto.id});
      custData.mobile = UpdateDto.mobile; 
 custData.name = UpdateDto.name; 
 
      var result = await custData.save(); 
          
      return this.Utility.sendSucc(req,res,result,ResMessage.UPDATE_SUCC);
      
      } catch (e){
      return this.Utility.sendErr(req,res,e);
      }
  }
  
  @Get('view/:id')
  public async view(
      @Response() res,
      @Request() req,
      @Param() ViewDto: ViewDto
      ) {
      try {
console.log(ViewDto);
      const custData = await this.custService.findOne({_id:ViewDto.id});
                
      return this.Utility.sendSucc(req,res,custData,ResMessage.LIST_SUCC);
      
      } catch (e){
      return this.Utility.sendErr(req,res,e);
      }
  }
  
  
  @Get('list/:skip/:limit')
  public async list(
      @Response() res,
      @Request() req,
      @Param() ListDto: ListDto
      ) {
      try {

      const custData = await this.custService.list(ListDto);
                
      return this.Utility.sendSucc(req,res,custData,ResMessage.LIST_SUCC);
      
      } catch (e){
      return this.Utility.sendErr(req,res,e);
      }
  }
  
  @Delete('delete')
  public async deleteData(
      @Response() res,
      @Request() req,
      @Body() DeleteDto: DeleteDto
      ) {
      try {

      const custData = await this.custService.delete(DeleteDto.id);
                
      return this.Utility.sendSucc(req,res,custData,ResMessage.LIST_SUCC);
      
      } catch (e){
      return this.Utility.sendErr(req,res,e);
      }
  }
  
  
    
}
