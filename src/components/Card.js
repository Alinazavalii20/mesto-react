import React from 'react';

function Card(props) {

    function handleClick() {
        props.handlePopupImage(props.data);
    }

    return (
        <div className="element">
            <img className="element__image" src={props.data.link} alt={props.data.name} onClick={props.one} onClick={handleClick} />
            <button type="button" className="button element__button-delet" onClick={props.handleCardDelete}></button>
            <h2 className="element__title">{props.data.name}</h2>
            <div>
                <button type="button" className="button element__button-like"></button>
                <div className="element__like-number">{props.data.likes.length}</div>
            </div>
        </div>
    )
}
export default Card