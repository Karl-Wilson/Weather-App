import style from './loading.module.css'
const Loading = ({className, ...props}) =>{
    return(
        <div className={[style.loading, className].join(' ')}>
            <p>{props.children}</p>
        </div>
    )
}

export default Loading;