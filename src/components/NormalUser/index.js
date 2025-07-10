import { Component } from 'react'

import { MdSearch } from "react-icons/md";
import Cookies from 'js-cookie'

import Navbar from '../Navbar'
import NormalUserStoreListItem from '../NormalUserStoreListItem'
import UpdatePassword from '../UpdatePassword'
import './index.css'

class NormalUser extends Component {
    state = { storesList: [], showUpdatePasswordForm: false, searchInput: '', searchedInput: '' }

    componentDidMount() {
        this.getStoresList()
    }

    getStoresList = async () => {
        const jwtToken = Cookies.get("jwt_token")
        const apiUrl = 'https://store-ratings-app-backend.onrender.com/user/stores'
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`
            }
        }

        const response = await fetch(apiUrl, options)


        if (response.ok) {
            const data = await response.json()

            this.setState({ storesList: data })
        }
    }

    onUpdatePassword = () => {
        this.setState({ showUpdatePasswordForm: true })
    }

    onClosingUpdateForm = () => {
        this.setState({ showUpdatePasswordForm: false })
    }

    onSearchChange = e => {
        this.setState({ searchInput: e.target.value })
    }

    onSearch = () => {
        const { searchInput } = this.state

        this.setState({ searchedInput: searchInput })
    }

    onSubmitSuccess = message => {
        alert(message)
        this.getStoresList()
    }

    onSubmitFailure = errorMsg => {
        alert(errorMsg)
    }

    onSubmittingRating = async (details) => {
        const jwtToken = Cookies.get("jwt_token")

        const { rating } = details

        if (!rating) {
            return this.onSubmitFailure("Please select a rating");
        }

        const apiUrl = 'https://store-ratings-app-backend.onrender.com/user/submit-rating'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(details)
        }

        const response = await fetch(apiUrl, options)

        const data = await response.json()

        if (response.ok) {
            this.onSubmitSuccess(data.message)
        } else {
            this.onSubmitFailure(data.error)
        }
    }

    onUpdatingRating = async (details) => {
        const jwtToken = Cookies.get("jwt_token")

        const { rating } = details

        if (!rating) {
            return this.onSubmitFailure("Please select a rating");
        }

        const apiUrl = 'https://store-ratings-app-backend.onrender.com/user/update-rating'
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(details)
        }

        const response = await fetch(apiUrl, options)

        const data = await response.json()

        if (response.ok) {
            this.onSubmitSuccess(data.message)
        } else {
            this.onSubmitFailure(data.error)
        }
    }

    render() {
        const { storesList, showUpdatePasswordForm, searchInput, searchedInput } = this.state

        const filteredList = storesList.filter((eachStore) => eachStore.name.toLowerCase().includes(searchedInput.toLowerCase()) || eachStore.address.toLowerCase().includes(searchedInput.toLowerCase()))

        return (
            <>
                <Navbar />
                <div className='bg-container'>
                    <div className='res-container'>
                        {showUpdatePasswordForm ? <UpdatePassword onClosingUpdateForm={this.onClosingUpdateForm} /> : <button className='btn btn-primary align-self-start mb-3' type="button" onClick={this.onUpdatePassword}>Update Password</button>}
                        <div className='heading-with-search-container'>
                            <h1 >Stores</h1>
                            <div>
                                <input className='search' type='search' onChange={this.onSearchChange} value={searchInput} />
                                <button type='button' onClick={this.onSearch}>
                                    <MdSearch />
                                </button>
                            </div>
                        </div>
                        <ul className='admin-list-container'>
                            {filteredList.map(eachStore => (
                                <NormalUserStoreListItem key={eachStore.id} store={eachStore} onSubmittingRating={this.onSubmittingRating} onUpdatingRating={this.onUpdatingRating} />
                            )
                            )}
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default NormalUser