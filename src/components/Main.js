import React from 'react';
import {api} from '../utils/Api';
import Card from './Card';

function Main(props) {

    const[profileName, SetProfileName] = React.useState('');
    const[profileAbout, SetprofileAbout] = React.useState('');
    const[profileAvatar, SetprofileAvatar] = React.useState('')
    const[cards, setCards] = React.useState([])

    React.useEffect(() => {
        api.getUserInfo()
        .then(res => {
          SetProfileName(res.name)
          SetprofileAbout(res.about)
          SetprofileAvatar(res.avatar)
        })
        .catch((err) => {
          console.log(`Ошибка получения данных: ${err}`)
        })
      },[])
    
      React.useEffect(() => {
        api.getAllCards()
        .then(res => {
          setCards(res)
        })
        .catch((err) => {
          console.log(`Ошибка получения данных: ${err}`)
        })
      },[])

  return (
    <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img src={profileAvatar} alt="Аватар" className="profile__avatar" style={{backgroundImage: `url(${profileAvatar})`}}/>
            <div className="profile__avatar-overlay" onClick={props.handleEditAvatarClick}></div>
          </div>
          <div className="profile__intro">
            <h1 className="profile__name">{profileName}</h1>
            <p className="profile__subtitle">{profileAbout}</p>
            <button type="button" className="button profile__button-edit" onClick={props.handleEditProfileClick}></button>
          </div>
          <button className="button profile__button-plus" onClick={props.handleAddPlaceClick} type="button"></button>
        </section>

        <section className="elements">
        {cards.map((res,_id) =>(
        <Card key={_id} data={res} handlePopupImage={props.handlePopupImage} handleCardDelete={props.handleCardDelete}></Card>
      ))}
        </section>
      </main>
  );
}

export default Main;