import {user} from '../../src/models/User'

declare global {
   namespace Express {
     interface Request {
      //  customBasicProperty: string,
      //  customClassProperty: import("../path/to/CustomClass").default;
      user:number
     }
   }
 }