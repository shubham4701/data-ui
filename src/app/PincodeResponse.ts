import { PincodeDetails } from "./PincodeDetails";

export interface PincodeResponse {
  Message: string;
  Status: string;
  PostOffice: PincodeDetails[];
}
