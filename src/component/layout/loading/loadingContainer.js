import Loading from "../../core/loading/loading"
import style from './loadingContainer.module.css'
import {useSelector} from 'react-redux'

const LoadingContainer = props => {
    const errorMsg =  useSelector(state => state.errorMsg)

    return(
        <div className={style.container} {...props}>
            <Loading>
                {errorMsg? errorMsg: 'Loading...'}
            </Loading>
        </div>
    )
}
export default LoadingContainer;