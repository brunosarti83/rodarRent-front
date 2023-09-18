import CarList from '../../components/CarList/CarList'
import ReservationSearch from '../../components/ReservationSearch/ReservationSearch'
import { getLocalStorage } from '../../helpers/storage'
import {useEffect} from 'react'
import { rememberLogin } from '../../redux/actions'
import { useDispatch } from 'react-redux'

function Home() {

    const dispatch = useDispatch()
    const isUserOnline = getLocalStorage('isLoggedIn')

    useEffect(() => {
        if(isUserOnline){
            dispatch(rememberLogin())
        }
    }, [isUserOnline]);

    return (
        <div>
            <ReservationSearch /> 
            <CarList />
        </div>
    )
}

export default Home