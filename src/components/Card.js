import React from 'react';

function Card(props) {

    function handleClick() {
      props.handlePopupImage(props.data);
     }
  
    return (
      <>
        <div className="element">
          <div className="element__image" style={{backgroundImage: `url(${props.data.link})`}} onClick={props.one} onClick={handleClick}></div>
          <button type="button" className="button element__button-delet" onClick={props.handleCardDelete}></button>
          <h2 className="element__title">{props.data.name}</h2>
            <div>
              <button type="button" className="button element__button-like"></button>
              <div className="element__like-number">{props.data.likes.length}</div>
            </div>
        </div>
       </>
       )
  }
  export default Card