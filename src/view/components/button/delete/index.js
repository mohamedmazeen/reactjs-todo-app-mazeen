import './style.css';

function Delete(props) {

    return(
        <button
        className='delete-btn'
        type='button'
        onClick={() => props.clickHandler()}>
        <i className='fa-solid fa-trash'></i>
        </button>
    )
}

export default Delete;