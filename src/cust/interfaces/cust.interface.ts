import { Document, PassportLocalDocument } from "mongoose";

export interface ICust extends PassportLocalDocument {
  mobile: number; 
 name: string; 
 
}
