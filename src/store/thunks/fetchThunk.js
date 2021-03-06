import { actions } from '../reducers/weatherReducer'
import fetchApi from '../../utils/fetchApi'
import { geolocationUrl, accessKey } from '../../utils/apiDetails';
const {isLoading, errorMsg, initialLoading, createLocation, createWeatherData, createFutureForcast, createUserLocation} = actions;
 
export const fetchLocationThunk = (url, data=null) => async (dispatch) => {
    dispatch(isLoading(true))
    dispatch(errorMsg(null))
    try{
    const result = await fetchApi(url, data);
        dispatch(createLocation(result)) 
    }catch(err){
        dispatch(errorMsg('Data not Available. Try another Location'))
    }
    dispatch(isLoading(false))
}
export const fetchDataThunk = (url, data=null) => async (dispatch) => {
    dispatch(isLoading(true))
    dispatch(errorMsg(null))
    try{
    const result = await fetchApi(url, data);
        dispatch(createWeatherData(result)) 
    }catch(err){
        dispatch(errorMsg('Something went wrong'))
    }
    dispatch(isLoading(false))
}
export const fetchFutureDataThunk = (url, data=null) => async (dispatch) => {
    dispatch(isLoading(true))
    dispatch(errorMsg(null))
    try{
    const result = await fetchApi(url, data);
        dispatch(createFutureForcast(result)) 
    }catch(err){
        dispatch(errorMsg('Something went wrong'))
    }
    dispatch(isLoading(false))
}
export const fetchUserLocationThunk = (url, data=null) => async (dispatch) => {
    dispatch(initialLoading(true))
    let result, name;
    try{
        result = await fetchApi(url, data);  
        const urlll = `${geolocationUrl}apiKey=${accessKey}&ip=${result.ip}&fields=city`
       
        name = await fetchApi(urlll)
        dispatch(createUserLocation(name))
    }catch(err){
        dispatch(errorMsg('Something went wrong'))
    }
    dispatch(initialLoading(false))

}

