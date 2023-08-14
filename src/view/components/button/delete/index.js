/**
 * 
 * index.js
 * @author - Mazeen
 * @date - 14/8/2023
 **/
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