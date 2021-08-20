import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import cloud_Bg  from '../../../assets/images/Cloud-background.png'
import defaultWeahter  from '../../../assets/images/HeavyCloud.png'
import location_pin from '../../../assets/images/pin.svg'
import MenuBtn from '../../core/menubtn/menubtn'
import RoundBtn from '../../core/menubtn/roundbtn'
import weatherStatesImages from '../../../assets/images/weatherStates'
import {ReactComponent as Target} from '../../../assets/images/target.svg'
import {fetchLocationThunk} from '../../../store/thunks/fetchThunk'
import {dayName, dayList, monthList, locationUrl, locationSearch} from '../../../utils/helper'
import style from './sidebar.module.css'

const SideBar = props => {
    const errorMsg = useSelector(state=> state.errorMsg)
    const isLoading = useSelector(state => state.isLoading)
    const currentTemp = useSelector(state => state.currentDisplayTemp)
    const weatherStateName = useSelector(state => state.weatherState);
    const forcastDate = useSelector(state => state.forcastDate)
    const currentTempSign = useSelector(state=>state.currentTempSign)
    const locationName = useSelector(state=>state.locationName)
    const initialLoading = useSelector(state=>state.initialLoading)
    const newDate = new Date(forcastDate)
    const currentLocation = useSelector(state=> state.currentLocation)
    let [locatorCounter, setLocatorCounter] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if(locatorCounter){    
            if(!initialLoading  && currentLocation){
                    let url = `${locationUrl}${locationSearch}${currentLocation}`;
                    dispatch(fetchLocationThunk(url))        
            }
        }
    }, [locatorCounter])// eslint-disable-line react-hooks/exhaustive-deps
    
    const locatorHandler = () =>{
        setLocatorCounter(true)
    }
    const menuToggleHandler = ()=>{
        document.getElementById('sideMenu').classList.toggle('sidemenu_show__3iRoN');
    }
    return(
        <div className={style.sidebar}>
            <div className={style.btnContainer}>
                <MenuBtn onClick={menuToggleHandler}>Search for places</MenuBtn>
                <RoundBtn className={style.targetbtn} onClick={locatorHandler}><Target className={style.target}/></RoundBtn>
            </div>
            <div className={style.sky}>
            {(isLoading || errorMsg) && <img src={defaultWeahter} alt='heavyCloud weather state' className={style.weather}/>}
                    {(!isLoading && !errorMsg) && <img src={weatherStatesImages[weatherStateName]} alt={weatherStateName} className={style.weather}/>}
                    <img src={cloud_Bg} className={style.cloud_img} alt=""/> 
            </div>
            <div className={style.temperature}>
                {(!isLoading && !errorMsg) && <p>{currentTemp}<span className={style.degreeSign}>&deg;{currentTempSign}</span></p>}
            </div>
            <div className={style.skyDefinition}>
            {(isLoading || errorMsg) && <p>Unavailable</p>}
                {(!isLoading && !errorMsg) && <p>{weatherStateName}</p>}
            </div>
            <div className={style.dateLocation}>
                {(!isLoading && !errorMsg && forcastDate) && <p className={style.date}>{`${dayName(forcastDate)} . ${dayList[(newDate.getDay())]}, ${newDate.getDate()} ${monthList[newDate.getMonth()]}`}</p>}
                <div className={style.locationWrapper}>
                {(!isLoading && !errorMsg) && <img src={location_pin} className={style.locationPin} alt="location pin"/>}
                    {(!isLoading && !errorMsg) && <p className={style.location}>{locationName}</p>}
                </div> 
           </div>
        </div>
    )
}
export default SideBar;