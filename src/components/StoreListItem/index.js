import './index.css'
const StoreListItem = props => {
    const { store } = props
    const { name, email, address, rating } = store

    return (
        <li className='store-list-item'>
            <p>Store Name: {name}</p>
            <p>Owner Mail: {email}</p>
            <p>Address: {address}</p>
            <p>Store Rating: {rating}</p>
        </li>
    )
}

export default StoreListItem