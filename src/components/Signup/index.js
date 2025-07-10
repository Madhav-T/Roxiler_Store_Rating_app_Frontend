import { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

class Signup extends Component {
    state = { showErrMsg: false, errorMsg: '', name: '', email: '', password: '', address: '' }

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
        const { history } = this.props
        history.replace('/login')
    }

    onSubmitFailure = errorMsg => {
        this.setState({ showErrMsg: true, errorMsg })
    }

    onSubmittingForm = async event => {
        event.preventDefault()

        const { name, email, password, address } = this.state
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


        const userDetails = { name, email, password, address }

        const apiUrl = "https://store-ratings-app-backend.onrender.com/signup"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
        const { showErrMsg, errorMsg, name, email, password, address } = this.state
        return (
            <div className='login-bg-container'>
                <form className='login-form' onSubmit={this.onSubmittingForm}>
                    <label htmlFor='name' className='login-label'>Name</label>
                    <input type="text" placeholder='Name' value={name} id='name' className='login-input' onChange={this.onNameChange} />
                    <label htmlFor="email" className='login-label' >Email</label>
                    <input type="text" placeholder='Email' value={email} id='email' className='login-input' onChange={this.onEmailChange} />
                    <label htmlFor="password" className='login-label' >Password</label>
                    <input id='password' type='password' placeholder='Password' value={password} className='login-input' onChange={this.onPasswordChange} />
                    <label htmlFor='address' className='login-label'>Address</label>
                    <textarea maxLength={400} className='login-input' value={address} placeholder='Address' id='address' onChange={this.onAddressChange}></textarea>
                    <button type="submit" className='btn btn-primary mt-3'>Signup</button>
                    {showErrMsg && <p className='text-danger'>*{errorMsg}</p>}
                    <p className='mt-5 text-center'>Already Have An Account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        )
    }
}

export default Signup