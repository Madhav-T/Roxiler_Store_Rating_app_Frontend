import { Component } from "react";
import Cookies from 'js-cookie'
import { withRouter  } from "react-router-dom";
import './index.css'


class UpdatePassword extends Component {
    state = { newPassword: '', confirmPassword: '', showErrMsg: false, errorMsg: '' }

    onPasswordChange = e => {
        this.setState({ newPassword: e.target.value })
    }

    onConfirmPasswordChange = e => {
        this.setState({ confirmPassword: e.target.value })
    }

    onCancel = () => {
        const { onClosingUpdateForm } = this.props
        onClosingUpdateForm()
    }

    onSubmitSuccess = message => {
        alert(message)
        Cookies.remove("jwt_token")
        const { history } = this.props
        history.replace("/login")

    }

    onSubmitFailure = errorMsg => {
        this.setState({ showErrMsg: true, errorMsg })
    }

    onUpdatingPassword = async (e) => {
        e.preventDefault()

        const jwtToken = Cookies.get("jwt_token")
        const { newPassword, confirmPassword } = this.state

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/
        if (!passwordRegex.test(newPassword)) {
            this.onSubmitFailure('Password must be 8-16 characters, include one uppercase letter and one special character.')
            return
        }
        if (newPassword !== confirmPassword) {
            this.onSubmitFailure('Password and Confirm Password must be same.')
            return
        }

        const apiUrl = 'https://store-ratings-app-backend.onrender.com/user/update-password'
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify({ newPassword })

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
        const { newPassword, confirmPassword, showErrMsg, errorMsg } = this.state
        return (
            <form className='login-form' onSubmit={this.onUpdatingPassword}>
                <label htmlFor="password" className='login-label'>New Password</label>
                <input id="password" type="password" onChange={this.onPasswordChange} value={newPassword} className='login-input' />
                <label htmlFor="confirmPassword" className='login-label'>Confirm Password</label>
                <input id="confirmPassword" type="text" onChange={this.onConfirmPasswordChange} value={confirmPassword} className='login-input' />
                <button type="submit" className="btn btn-outline-primary mb-3 mt-3">Update Password</button>
                <button type="button" className="btn btn-outline-danger" onClick={this.onCancel}>Cancel</button>
                {showErrMsg && <p className="text-danger">*{errorMsg}</p>}
            </form>
        )
    }
}

export default withRouter (UpdatePassword)