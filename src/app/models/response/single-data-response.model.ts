import {ResponseModel} from "./response.model";

export interface SingleDataResponseModel<T> extends ResponseModel{
  data: T;
}
