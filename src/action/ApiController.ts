
import { store } from '../App';
import { 

} from '../constants';
import ApiService from "../service/ApiService";

class ApiController {

  public commentAdd = async (params: any) => {
    const { } = await ApiService.commentAdd(params);
  }

  public commentList = async (params: any) => {
    const { } = await ApiService.commentList(params);
  }

  public collectionAdd = async (params: any) => {
    const { } = await ApiService.collectionAdd(params);
  }

  public collectionRemove = async (params: any) => {
    const { } = await ApiService.collectionRemove(params);
  }

  public collectionList = async (params: any) => {
    const { } = await ApiService.collectionList(params);
  }
}

export default new ApiController();