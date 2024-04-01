import RestaurantComponent from '../components/Restaurant/Restaurant';
import Navbar from '../components/Navbar/Navbar';

export default function Restaurant() {
    return (
        <div>
            <Navbar/>
            <div>
                <RestaurantComponent/>
            </div>
        </div>
    )
}