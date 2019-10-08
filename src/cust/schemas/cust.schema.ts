import * as mongoose from "mongoose";
import * as passportLocalMongoose from "passport-local-mongoose";


export const CustSchema = new mongoose.Schema({
  mobile: { type : Number, required : true }, 
 name: { type : String, required : true }, 

}); 




