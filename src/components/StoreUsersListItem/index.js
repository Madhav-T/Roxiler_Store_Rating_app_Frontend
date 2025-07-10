import './index.css'
const StoreUsersListItem = props => {
    const { userDetails } = props
    const { name, email, address, rating} = userDetails

    return (
        <li className='store-list-item'>
            <p>User Name: {name}</p>
            <p>User Mail: {email}</p>
            <p>Address: {address}</p>
            <p>rating: {rating}</p>
        </li>
    )
}

export default StoreUsersListItem