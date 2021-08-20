import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {locationUrl, locationSearch } from '../../../utils/helper'
import {currentIpUrl} from '../../../utils/apiDetails'
import closebtn from '../../../assets/images/close.png'
import SearchBox from '../../core/search/searchbox'
import MenuBtn from '../../core/menubtn/menubtn'
import SearchResult from '../../core/searchResult/searchResult'
import {fetchLocationThunk, fetchDataThunk, fetchCurrentLocationThunk} from '../../../store/thunks/fetchThunk'
import {actions} from '../../../store/reducers/weatherReducer'
import style from './sidemenu.module.css'

let firstTime = true;
let secondTime = true
const SideMenu = () => {
    const [inputValue, setInput] = useState('')
    const locationId = useSelector(state => state.locationId)
    const searchHistory = useSelector(state => state.searchHistory)
    const searchHistoryLength = searchHistory.length
    const isLoading  = useSelector(state=> state.isLoading)
    const currentLocation = useSelector(state=> state.currentLocation)
    const initialLoading = useSelector(state => state.initialLoading)
    const {createSearchHistory} = actions
    const dispatch = useDispatch()

    useEffect(()=>{
        if(firstTime){
            firstTime = false;  
                dispatch(fetchCurrentLocationThunk(currentIpUrl))       
        }
        if(!initialLoading  && currentLocation && secondTime){
            secondTime = false
            let url = `${locationUrl}${locationSearch}${currentLocation}`;
            dispatch(fetchLocationThunk(url))        
        }
    if(locationId){
        let url2 = `${locationUrl}${locationId}/`;
        dispatch(fetchDataThunk(url2))
        }
    }, [locationId, initialLoading])// eslint-disable-line react-hooks/exhaustive-deps

    const inputHandler = (e) =>{
        setInput(e.target.value)
    }

    const searchHandler = (e) =>{
        let url = `${locationUrl}${locationSearch}${inputValue}`;
        if(!searchHistory.includes(inputValue)){
            dispatch(createSearchHistory(inputValue))
        }
        dispatch(fetchLocationThunk(url))
        setInput('')
        menuToggleHandler()
    }
    const searchHistoryHandler = (data) =>{
        let url = `${locationUrl}${locationSearch}${data}`;
        dispatch(fetchLocationThunk(url))
        setInput('')
        menuToggleHandler()
    }
    const menuToggleHandler = ()=>{
        document.getElementById('sideMenu').classList.remove(style.show);
    }
    return(
        <div id="sideMenu" className={style.sidemenu}>
            <img  src={closebtn} className={style.closebtn} onClick={menuToggleHandler} alt="close button" />
            <div className={style.search}>
                <SearchBox onChange={inputHandler} value={inputValue} placeholder="search location"/>
                <MenuBtn className={style.searchbtn} onClick={searchHandler}>Search</MenuBtn>
            </div>
            <div className={style.result}>
                {!isLoading? searchHistory.map((result, index) => {
                     if(searchHistoryLength <= 3){
                        return <SearchResult key={index+'searchHistory'} className={style.resultlist} click={()=>{searchHistoryHandler(result)}} >{result}</SearchResult>
                    }else{
                        if(index >= searchHistoryLength-3)
                        return <SearchResult key={index+'searchHistory'} className={style.resultlist} click={()=>{searchHistoryHandler(result)}}>{result}</SearchResult>
                    }
                    return null;
                }): ''}

            </div>
        </div>
    )
}

export default SideMenu;