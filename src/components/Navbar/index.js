import './index.css'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
const Navbar = props => {
    const onLogout = () => {
        const {history} = props
        Cookies.remove("jwt_token")
        history.replace("/login")
    }
    return (
        <nav className="nav-bg-container">
            <div className="nav-responsive-container">
                <h1>Store</h1>
                <button type="button" className='btn btn-primary' onClick={onLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)