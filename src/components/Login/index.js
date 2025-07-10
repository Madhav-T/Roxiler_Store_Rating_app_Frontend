import { Component } from 'react'
import Cookies from 'js-cookie'
import { Link, Redirect } from 'react-router-dom'

import './index.css'

class Login extends Component {
    state = { showErrMsg: false, errorMsg: '', email: '', password: '' }

    onEmailChange = e => {
        this.setState({ email: e.target.value })
    }

    onPasswordChange = e => {
        this.setState({ password: e.target.value })
    }

    onSubmitSuccess = data => {
        const { history } = this.props
        const { jwt_token, role } = data
        Cookies.set('jwt_token', jwt_token, { expires: 30 })
        Cookies.set('role', role, { expires: 30 })
        switch (role) {
            case 'Admin':
                history.replace('/admin')
                break
            case 'StoreOwner':
                history.replace('/store-owner')
                break
            case 'Normal':
                history.replace('/user')
                break
            default:


        }
    }

    onSubmitFailure = errorMsg => {
        this.setState({ showErrMsg: true, errorMsg })
    }

    onSubmittingForm = async event => {
        event.preventDefault()

        const { email, password } = this.state
        const userDetails = { email, password }

        const apiUrl = "https://store-ratings-app-backend.onrender.com/login"
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
            this.onSubmitSuccess(data)

        } else {
            this.onSubmitFailure(data.error)
        }
    }

    render() {
        const { showErrMsg, errorMsg } = this.state
        const jwtToken = Cookies.get('jwt_token')
        const role = Cookies.get('role')
        if (jwtToken !== undefined) {
            switch (role) {
                case 'Admin':
                    return <Redirect to="/admin" />
                case 'Normal':
                    return <Redirect to="/user" />
                case 'StoreOwner':
                    return <Redirect to="/store-owner" />
                default:
            }
        }
        return (
            <div className='login-bg-container'>
                <form className='login-form' onSubmit={this.onSubmittingForm}>
                    <label htmlFor="email" className='login-label' >Email</label>
                    <input type="text" placeholder='Email' id='email' className='login-input' onChange={this.onEmailChange} />
                    <label htmlFor="password" className='login-label' >Password</label>
                    <input id='password' type='password' placeholder='Password' className='login-input' onChange={this.onPasswordChange} />
                    <button type="submit" className='btn btn-primary mt-3'>Login</button>
                    {showErrMsg && <p className='text-danger'>*{errorMsg}</p>}
                    <p className='mt-5 text-center'>Not Have An Account? <Link to="/signup">Sign Up</Link></p>
                </form>
            </div>
        )
    }
}

export default Login