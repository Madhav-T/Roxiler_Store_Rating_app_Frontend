import { Component } from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

import Navbar from '../Navbar'
import StoreListItem from '../StoreListItem'
import UserListItem from '../UserListItem'


import './index.css'

class Admin extends Component {
    state = { stats: {}, storesList: [], usersList: [] }

    componentDidMount() {
        this.getStatsOfUsers()
        this.getStoresList()
        this.getUsersList()
    }

    getStatsOfUsers = async () => {
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = "https://store-ratings-app-backend.onrender.com/admin/stats"
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }

        const response = await fetch(apiUrl, options)
        if (response.ok) {
            const data = await response.json()
            this.setState({ stats: data })
        } else {
            alert('Something Went Wrong!')
        }
    }

    getStoresList = async () => {
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = "https://store-ratings-app-backend.onrender.com/admin/stores"
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }

        const response = await fetch(apiUrl, options)
        if (response.ok) {
            const data = await response.json()
            this.setState({ storesList: data })
        } else {
            alert('Something Went Wrong!')
        }
    }

    getUsersList = async () => {
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = "https://store-ratings-app-backend.onrender.com/admin/users"
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }

        const response = await fetch(apiUrl, options)
        const data = await response.json()
        if (response.ok) {
            this.setState({ usersList: data })
        } else {
            alert(data.error)
        }
    }

    render() {
        const { stats, storesList, usersList } = this.state
        const { total_users, total_stores, total_ratings } = stats
        return (
            <>
                <Navbar />
                <div className='admin-bg-container'>
                    <div className='admin-res-container'>
                        <div className='admin-buttons-container'>
                            <Link to="/admin/add-store">
                                <button type="button" className='btn btn-outline-success admin-button'>Add New Store</button>
                            </Link>
                            <Link to="admin/add-user">
                                <button type="button" className='btn btn-outline-primary admin-button'>Add New User</button>
                            </Link>

                        </div>
                        <div>
                            <p>Total Number Of Users: {total_users}</p>
                            <p>Total Number Of Stores: {total_stores}</p>
                            <p>Total Number Of Ratings: {total_ratings}</p>
                        </div>
                        <h1 className='align-self-start mb-3'>Stores</h1>
                        <ul className='admin-list-container'>{storesList.map(eachStore => (
                            <StoreListItem key={eachStore.id} store={eachStore} />
                        ))}</ul>
                        <h1 className='align-self-start mb-3'>Users</h1>
                        <ul className='admin-list-container'>{usersList.map(eachUser => (
                            <UserListItem key={eachUser.id} user={eachUser} />
                        ))}</ul>
                    </div>
                </div>
            </>
        )
    }
}

export default Admin