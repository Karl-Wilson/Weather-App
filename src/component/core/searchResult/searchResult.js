import rightArrow from '../../../assets/images/right-arrow-angle.png'
import style from './searchResult.module.css';

const SearchResult = ({className, ...props}) =>{
    return(
        <div className={[style.searchResult, className].join(' ')} onClick={props.click}>
            <p>{props.children}</p>
            <img src={rightArrow} className={style.arrow} alt=""/>
        </div>
    )
}
export default SearchResult;