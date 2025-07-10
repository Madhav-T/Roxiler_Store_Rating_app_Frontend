import { Component } from 'react'
import Cookies from 'js-cookie'

import Navbar from '../Navbar'

import './index.css'

class AddNewStore extends Component {
    state = { name: '', email: '', address: '', showErrMsg: false, errorMsg: '' }

    onEmailChange = e => {
        this.setState({ email: e.target.value })
    }

    onNameChange = e => {
        this.setState({ name: e.target.value })
    }

    onAddressChange = e => {
        this.setState({ address: e.target.value })
    }

    onSubmitSuccess = message => {
        alert("Added Successfully")
    }

    onSubmitFailure = errorMsg => {
        this.setState({ showErrMsg: true, errorMsg })
    }

    onSubmittingForm = async event => {
        event.preventDefault()

        const jwtToken = Cookies.get("jwt_token")

        const { name, email, address } = this.state
        if (name.length < 20 || name.length > 60) {
            this.onSubmitFailure('Name must be between 20 and 60 characters.')
            return
        }

        if (address.length > 400) {
            this.onSubmitFailure('Address must not exceed 400 characters.')
            return
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            this.onSubmitFailure('Please enter a valid email address.')
            return
        }


        const userDetails = { name, email, address }

        const apiUrl = "https://store-ratings-app-backend.onrender.com/admin/add-store"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(userDetails),
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
        const { name, email, address, showErrMsg, errorMsg } = this.state
        return (
            <>
                <Navbar />
                <div className='add-new-store-bg-container'>
                    <form className='add-new-store-form' onSubmit={this.onSubmittingForm}>
                        <label htmlFor='storeName' className='login-label'>Name of the store</label>
                        <input placeholder='Store Name' value={name} type="text" id="storeName" className='login-input' onChange={this.onNameChange} />
                        <label htmlFor='ownerMail' className='login-label'>Email of the owner</label>
                        <input placeholder='Owner Email' value={email} type="text" id='ownerMail' className='login-input' onChange={this.onEmailChange} />
                        <label htmlFor='storeAddress' className='login-label'>Address Of Store</label>
                        <textarea placeholder='Store Address' value={address} id='storeAddress' maxLength={400} className='login-input' onChange={this.onAddressChange}></textarea>
                        <button className='btn btn-primary'>Add Store</button>
                        {showErrMsg && <p className='text-danger'>*{errorMsg}</p>}
                    </form>
                </div>
            </>
        )
    }
}

export default AddNewStore