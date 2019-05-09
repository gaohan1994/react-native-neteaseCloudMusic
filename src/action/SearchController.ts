import SearchService from '../service/SearchService';
// import { DispatchAbstract } from './actions';
import { store } from '../App';
import { RECEIVE_SEARCH_HOT, RECEIVE_SEARCH_DATA } from '../constants';

class SearchController {

  public emptySearch = () => {
    store.dispatch({
      type: RECEIVE_SEARCH_DATA,
      payload: { searchData: {} } 
    });
  }

  public search = async (params: any) => {
    const { code, result } = await SearchService.search(params);

    if (code === 200) {
      store.dispatch({
        type: RECEIVE_SEARCH_DATA,
        payload: { searchData: result }
      })
      return { success: true, result }
    } else {
      return { success: false, result: '搜索失败' };
    }
  }

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