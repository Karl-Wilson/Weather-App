import MenuBtn from './menubtn'
import style from './roundbtn.module.css'

const RoundBtn = ({className, ...props}) =>{
    return(
        <MenuBtn className={[className, style.roundbtn].join(' ')} {...props}></MenuBtn>
    )
}

export default RoundBtn;