import { Component } from 'react'
import './index.css'

class NormalUserStoreListItem extends Component {
    state = { rating: null }

    onHandlingRating = e => {
        this.setState({ rating: parseInt(e.target.value) })
    }

    onSubmitRating = async () => {
        const { rating } = this.state

        const { store, onSubmittingRating } = this.props
        const { id } = store

        const details = { id, rating }

        onSubmittingRating(details)
        this.setState({ rating: null })

    }

    onUpdateRating = async () => {
        const { rating } = this.state

        const { store, onUpdatingRating } = this.props
        const { id } = store

        const details = { id, rating }

        onUpdatingRating(details)
        this.setState({ rating: null })
    }

    renderRatingView = () => {
        const { store } = this.props
        const { user_rating } = store

        const { rating } = this.state

        return (
            <div className='d-flex align-items-center'>
                <label className='me-2'>Rate: </label>
                <div className='d-flex align-items-center'>
                    <div className='d-flex align-items-center me-3'>
                        <input checked={rating === 1} className='me-1' id="one" type='radio' name='rating' value={1} onChange={this.onHandlingRating} />
                        <label htmlFor='one'>1</label>
                    </div>
                    <div className='d-flex align-items-center me-3'>
                        <input checked={rating === 2} className='me-1' id='two' type='radio' name='rating' value={2} onChange={this.onHandlingRating} />
                        <label htmlFor='two'>2</label>
                    </div>
                    <div className='d-flex align-items-center me-3'>
                        <input checked={rating === 3} className='me-1' id='three' type='radio' name='rating' value={3} onChange={this.onHandlingRating} />
                        <label htmlFor='three'>3</label>
                    </div>
                    <div className='d-flex align-items-center me-3'>
                        <input checked={rating === 4} className='me-1' id='four' type='radio' name='rating' value={4} onChange={this.onHandlingRating} />
                        <label htmlFor='four'>4</label>
                    </div>
                    <div className='d-flex align-items-center me-3'>
                        <input checked={rating === 5} className='me-1' id='five' type='radio' name='rating' value={5} onChange={this.onHandlingRating} />
                        <label htmlFor='five'>5</label>
                    </div>
                </div>
                {user_rating === 0 ? <button className='btn btn-primary' type='button' onClick={this.onSubmitRating}>Submit Rating</button> : <button className='btn btn-primary' type='button' onClick={this.onUpdateRating}>Update Rating</button>}
            </div>
        )
    }

    render() {
        const { store } = this.props
        const { name, email, address, average_rating, user_rating } = store
        return (
            <li className='store-list-item'>
                <p>Store Name: {name}</p>
                <p>Owner Mail: {email}</p>
                <p>Address: {address}</p>
                <p>Store Overall Rating: {average_rating}</p>
                <p>User Rating: {user_rating}</p>
                {this.renderRatingView()}
            </li>
        )
    }
}

export default NormalUserStoreListItem