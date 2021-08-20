import style from './menubtn.module.css'
const MenuBtn = ({className, ...props}) =>{
    return(
        <div className={[style.btn, className].join(' ')} {...props}>
        </div>
    )
}

export default MenuBtn