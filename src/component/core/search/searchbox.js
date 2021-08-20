import InputField from './inputField'
import search from '../../../assets/images/search.png'
import style from './searchbox.module.css'

const SearchBar = props => {
    return(
        <div className={style.searchbox}>
            <img src={search} className={style.searchicon} alt="searchIcon"/>
            <InputField className={style.searchinput} {...props}/>
        </div>
    )
}
export default SearchBar;