import { Component } from 'react'
import Cookies from 'js-cookie'

import NavBar from '../Navbar'
import UpdatePassword from '../UpdatePassword'
import StoreUsersListItem from '../StoreUsersListItem'

import './index.css'

class StoreOwner extends Component {
    state = { showUpdatePasswordForm: false, ratedUsersList: [] }

    componentDidMount() {
        this.getUsersList()
    }

    getUsersList = async () => {
        const jwtToken = Cookies.get("jwt_token")

        const apiUrl = "https://store-ratings-app-backend.onrender.com/store-owner/ratings"
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`
            }
        }

        const response = await fetch(apiUrl, options)
        const data = await response.json()

        if (response.ok) {
            this.setState({ ratedUsersList: data })
        } else {
            alert(data.error)
        }
    }

    onShowUpdateForm = () => {
        this.setState({ showUpdatePasswordForm: true })
    }

    onClosingUpdateForm = () => {
        this.setState({ showUpdatePasswordForm: false })
    }

    render() {
        const { showUpdatePasswordForm, ratedUsersList } = this.state
        let totalRating = 0
        ratedUsersList.forEach(eachUser => totalRating += eachUser.rating)

        const averageStoreRating = totalRating / ratedUsersList.length


        return (
            <>
                <NavBar />
                <div className='store-owner-bg-container'>
                    <div className='store-owner-responsive-container'>
                        {showUpdatePasswordForm ? <UpdatePassword onClosingUpdateForm={this.onClosingUpdateForm} /> : <button className='btn btn-primary align-self-start mb-3' type="button" onClick={this.onShowUpdateForm}>Update Password</button>}
                        <p className='store-rating'>Store Rating: <span className='text-success'>{isNaN(averageStoreRating) ? "N/A" : averageStoreRating}</span></p>
                        <br />
                        <p className='align-self-start mb-3 fw-semibold'>List Of Users Who Rated Your Store</p>
                        <ul className='admin-list-container'>
                            {ratedUsersList.map(eachUser => (
                                <StoreUsersListItem key={eachUser.id} userDetails={eachUser} />
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default StoreOwner