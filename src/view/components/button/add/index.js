import './style.css';

function Add(props) {

    return(
        <button className='add-btn' type='button' onClick={() => props.clickHandler()}>&#43;</button>
    )
}

export default Add;