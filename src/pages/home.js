import { PageContainer } from '../component/core/core'
import { Main, SideMenu, SideBar, LoadingContainer } from '../component/layout/layout';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Home = () =>{
    const isLoading = useSelector(state => state.isLoading)
    const errorMsg = useSelector(state => state.errorMsg)
    const [On, setOn] = useState(false)
    useEffect(() => {
        if(isLoading){
            setOn(true)
        }else if(errorMsg){
            setOn(true)
        }else{
            setOn(false)
        }
    }, [isLoading, errorMsg])
    
    const clickHandler = () =>{
        if(On)
        setOn(false)
    }
    return(
        <>
            <PageContainer>
               {(On) && <LoadingContainer onClick={clickHandler}/>}
                <SideMenu/>
                <SideBar/>
                <Main/>
            </PageContainer>
        </>
    )
}
export default Home;