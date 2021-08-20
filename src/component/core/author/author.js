import style from './author.module.css'
const Author = ({className, ...props}) =>{
    return(
        <>
            <p className={[style.author, className].join(' ')}>Created by <span>{props.name}</span> - devChanllenges.io</p>
        </>
    )
}

export default Author;