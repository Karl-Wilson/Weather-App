import style from './thumbnail.module.css'
const Thumbnail = ({className, ...props}) => {
    return(
        <div className={[className, style.thumbnail].join(' ')} {...props}></div>
    )
}

export default Thumbnail;