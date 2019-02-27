import SearchService from '../service/SearchService';
// import { DispatchAbstract } from './actions';
import { store } from '../App';
import { RECEIVE_SEARCH_HOT } from '../constants';

class SearchController {

  public searchHot = async (): Promise<any> => {
    const { code, result } = await SearchService.searchHot();

    if (code === 200) {
      store.dispatch({
        type: RECEIVE_SEARCH_HOT,
        payload: { hots: result.hots }
      });
      
      return { success: true, result };
    } else {
      return { success: false, result };
    }
  }
}

export default new SearchController();