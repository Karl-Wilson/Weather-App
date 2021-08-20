import Thumbnail from './thumbnail'
import style from './highlightThumb.module.css'
const HightlightThumb = props => {
    return(
        <Thumbnail className={[style.highlighthumb, props.className].join(' ')}>
            <div><p className={style.title}>{props.title}</p></div>
            <div><p className={style.value}><span className={style.bigFont}>{props.value.main}</span> {props.value.unit}</p></div>
            <div className={style.details}>{props.details}</div>
        </Thumbnail>
    )
}
export default HightlightThumb;