import Cars from '../../components/CarList/CarList'
import ReservationSearch from '../../components/ReservationSearch/ReservationSearch'

function Home() {
    return (
        <div>
            <ReservationSearch /> 
            <Cars />
        </div>
    )
}

export default Home