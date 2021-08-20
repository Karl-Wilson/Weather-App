import Thumbnail from './thumbnail'
import style from './dailyForcastThumb.module.css';


const DailyForcastThumb = props => {
    return(
        <Thumbnail className={[style.dailyforcasthumb, props.className].join(' ')}>
            <div className={style.date}><p>{props.date}</p></div>
            <div><img src={props.weather} className={style.icon} alt={props.name}/></div>
            <div className={style.temp}>
                <p className={style.tempmax}>{props.tempMax}&deg;{props.tempSign}</p>
                <p className={style.tempmin}>{props.tempMin}&deg;{props.tempSign}</p>
            </div>
        </Thumbnail>
    )
}

export default DailyForcastThumb;