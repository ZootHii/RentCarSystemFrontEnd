import {ResponseModel} from "./responseModel";

export interface ResponseModelT<T> extends ResponseModel{
  data: T;
}
