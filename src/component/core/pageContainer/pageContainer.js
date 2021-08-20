import style from './pageContainer.module.css'

const PageContainer = ({className, ...props}) => {
    return(
        <div className={[className, style.container].join(' ')} {...props}>
        </div>
    )
}

export default PageContainer;