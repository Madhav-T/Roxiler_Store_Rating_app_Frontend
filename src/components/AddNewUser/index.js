import { Component } from 'react'
import Cookies from 'js-cookie'
import './index.css'

class AddNewUser extends Component {
    state = { showErrMsg: false, errorMsg: '', name: '', email: '', password: '', address: '', role: 'Normal' }

    onRoleChange = e => {
        this.setState({ role: e.target.value })
    }

    onEmailChange = e => {
        this.setState({ email: e.target.value })
    }

    onPasswordChange = e => {
        this.setState({ password: e.target.value })
    }

    onNameChange = e => {
        this.setState({ name: e.target.value })
    }

    onAddressChange = e => {
        this.setState({ address: e.target.value })
    }

    onSubmitSuccess = message => {
        alert(message)
        
    }

    onSubmitFailure = errorMsg => {
        this.setState({ showErrMsg: true, errorMsg })
    }

    onSubmittingForm = async event => {
        event.preventDefault()

        const jwtToken = Cookies.get("jwt_token")

        const { name, email, password, address, role } = this.state
        if (name.length < 20 || name.length > 60) {
            this.onSubmitFailure('Name must be between 20 and 60 characters.')
            return
        }

        if (address.length > 400) {
            this.onSubmitFailure('Address must not exceed 400 characters.')
            return
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/
        if (!passwordRegex.test(password)) {
            this.onSubmitFailure('Password must be 8-16 characters, include one uppercase letter and one special character.')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            this.onSubmitFailure('Please enter a valid email address.')
            return
        }


        const userDetails = { name, email, password, address, role }

        const apiUrl = "https://store-ratings-app-backend.onrender.com/admin/add-user"
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
        const { showErrMsg, errorMsg, name, email, password, address, role } = this.state
        
        return (
            <div className='login-bg-container'>
                <form className='login-form' onSubmit={this.onSubmittingForm}>
                    <label htmlFor='name' className='login-label'>Name</label>
                    <input type="text" placeholder='Name' value={name} id='name' className='login-input' onChange={this.onNameChange} />
                    <label htmlFor="email" className='login-label' >Email</label>
                    <input type="text" placeholder='Email' value={email} id='email' className='login-input' onChange={this.onEmailChange} />
                    <label htmlFor="password" className='login-label' >Password</label>
                    <input id="password" type='password' placeholder='Password' value={password} className='login-input' onChange={this.onPasswordChange} />
                    <label htmlFor='address' className='login-label'>Address</label>
                    <textarea maxLength={400} className='login-input' value={address} placeholder='Address' id='address' onChange={this.onAddressChange}></textarea>
                    <label htmlFor='role'>Role of User</label>
                    <select id="role" className='login-label' onChange={this.onRoleChange} value={role}>
                        <option value='Normal'>Normal User</option>
                        <option value='StoreOwner'>Store User</option>
                        <option value='Admin'>Admin User</option>
                    </select>
                    <button type="submit" className='btn btn-primary mt-3'>Add New User</button>
                    {showErrMsg && <p className='text-danger'>*{errorMsg}</p>}
                </form>
            </div>
        )
    }
}

export default AddNewUser