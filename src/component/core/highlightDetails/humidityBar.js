import {useEffect} from 'react'
import style from './humidityBar.module.css'
const HumidityBar = ({className, value, ...props}) =>{
    useEffect(() => {
        document.getElementById("humidityProgress").style.width = value + '%'
    }, [value])
    return(
        <div className={[style.humidityIndicator, className].join(' ')}>
            <div className={style.humidityRange}>
                <p>0</p>
                <p>50</p>
                <p>100</p>
            </div>
            <div className={style.humidityBar}><div id="humidityProgress" className={style.progress}></div></div>
            <div className={style.humidityUnit}><p>%</p></div>
        </div>
    )
}

export default HumidityBar;