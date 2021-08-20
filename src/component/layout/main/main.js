import {useDispatch, useSelector} from 'react-redux'
import {actions} from '../../../store/reducers/weatherReducer'
import RoundBtn from '../../core/menubtn/roundbtn'
import DailyForcastThumb from '../../core/thumbnails/dailyForcastThumb'
import HightlightThumb from '../../core/thumbnails/hightlightThumb'
import HumidityBar from '../../core/highlightDetails/humidityBar'
import WindDirection from '../../core/highlightDetails/windDirection'
import Author from '../../core/author/author'
import {tempConverter, windDirectionDetector, dayName, futureForcastTempConverter} from '../../../utils/helper'
import weatherStatesImages from '../../../assets/images/weatherStates'
import {dayList, monthList} from '../../../utils/helper'
import style from './main.module.css'
import { useEffect } from 'react'

let first = true; // eslint-disable-line  no-unused-vars
const Main = props => {
    const isLoading = useSelector(state=>state.isLoading)
    const errorMsg = useSelector(state=> state.errorMsg)
    const currentDisplayTemp = useSelector(state=> state.currentDisplayTemp)
    const currentTempSign = useSelector(state=> state.currentTempSign)
    const windSpeed = useSelector(state=>  state.windSpeed)
    const windDirection = useSelector(state=>  state.windDirection)
    const airPressure = useSelector(state=> state.airPressure)
    const humidity = useSelector(state=> state.humidity)
    const visibility = useSelector(state=> state.visibility)
    const sixDayForcastData = useSelector(state=> state.locationData)
    const futureForecastTemp = useSelector(state=> state.futureForcast)
    const {convertTemp, createFutureForcast} = actions
    const dispatch = useDispatch() 

    useEffect(()=>{
        if(sixDayForcastData){
        let futureData = futureForcastTempConverter(sixDayForcastData, true, true)
        dispatch(createFutureForcast(futureData))
        }
        first = false
    },[sixDayForcastData])// eslint-disable-line react-hooks/exhaustive-deps

    const tempConverterDispatcher = () =>{
        let result = tempConverter(currentDisplayTemp, currentTempSign) 
        let futureData = futureForcastTempConverter(futureForecastTemp, currentTempSign)
        dispatch(convertTemp(result))
        dispatch(createFutureForcast(futureData))
    }
    const tempConverterHandler = (tempBtn) =>{
        if(tempBtn == 'F'){
            if(currentTempSign == 'C'){
                tempConverterDispatcher()
            }
        }else if(tempBtn == 'C'){
            if(currentTempSign == 'F'){
                tempConverterDispatcher()
            }
        }
    }
      return(
        <div className={style.main}>
            <div className={style.btnContainer}>
                <RoundBtn className={style.celciusbtn} onClick={()=>{tempConverterHandler('C')}}>&deg;C</RoundBtn>
                <RoundBtn className={style.fahrenhietbtn} onClick={()=>{tempConverterHandler('F')}}>&deg;F</RoundBtn>
            </div>
            <div className={style.dailyForcast}>

                {(!isLoading && !errorMsg && sixDayForcastData && futureForecastTemp)? sixDayForcastData.map((day, index) => {
                    if(index > 0){
                        return <DailyForcastThumb key={index + "dailyForcast"}className={style.dailyThumb} date={dayName(day.applicable_date, dayList, monthList)} weather={weatherStatesImages[day.weather_state_name]} name={day.weather_state_name} tempMax={Math.round(futureForecastTemp[index].max.finalValue)} tempMin={Math.round(futureForecastTemp[index].min.finalValue)}  tempSign={currentTempSign}/>
                    }
                    return null;
                }) : isLoading? 'Loading' : errorMsg? 'Unavailable' : ''}
                
            </div>
            <div className={style.highlights}>
                <div><p className={style.title}>Today's Highlights</p></div>
                <div className={style.highlightThumbs}>
                  
                        <HightlightThumb className={style.hightlightThumb} title="Wind status" value={{main: `${(!isLoading && !errorMsg)? windSpeed: ''}`, unit: "mph"}} details={<WindDirection compassDirection={windDirection} direction={windDirectionDetector(windDirection)}/>}/>
                        <HightlightThumb className={style.hightlightThumb} title="Humidity" value={{main: `${(!isLoading && !errorMsg)?humidity: ''}`, unit: "%"}} details={<HumidityBar value={`${!isLoading? humidity: ''}`}/>}/>
                        <HightlightThumb className={style.hightlightThumb} title="Visibilty" value={{main: `${(!isLoading && !errorMsg)?visibility: ''}`, unit: "miles"}} />
                        <HightlightThumb className={style.hightlightThumb} title="Air Pressure" value={{main: `${(!isLoading && !errorMsg)? airPressure: ''}`, unit: "mb"}} />
                   
                </div>
            </div>
            <div className={style.author}>
                <Author name="Okose Chidelu Karl"/>
            </div>
        </div>
    )
}
export default Main;