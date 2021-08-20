import {useEffect} from 'react'
import {compassDirectionDisplay} from '../../../utils/helper'
import compass from '../../../assets/images/compass.png'
import style from './windDirection.module.css'

const WindDirection = ({className, compassDirection, ...props}) =>{
    useEffect(() => {
        document.getElementById('compass').style.transform = `rotate(${compassDirectionDisplay(compassDirection)}deg)`
    }, [compassDirection])
    return(
        <div className={[style.windDirection, className].join(' ')}>
            <div id="compass" className={style.compass}><img src={compass} alt="compass"/></div>
            <div className={style.direction}><p>{props.direction}</p></div>
        </div>
    )
}
export default WindDirection;