import './index.css'
const UserListItem = props => {
    const { user } = props
    const { name, email, address, role, average_rating } = user

    return (
        <li className='store-list-item'>
            <p>User Name: {name}</p>
            <p>User Mail: {email}</p>
            <p>Address: {address}</p>
            <p>role: {role}</p>
            {role === 'StoreOwner' && <p>Store Rating: {average_rating}</p>}
        </li>
    )
}

export default UserListItem