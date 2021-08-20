import style from './inputField.module.css'
const InputField = ({className, ...props}) =>{
    return(
        <>
            <input type="text" className={[className, style.input].join(' ')} {...props}/>
        </>
    )
}

export default InputField;