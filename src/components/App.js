import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const[isEditProfilePopupOpen, switchIsEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, switchIsAddPlacePopupOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, switchIsEditAvatarPopupOpen] = React.useState(false);
  const[isdeleteCard, switchDeieteCard] =  React.useState(false);
  const[selectedCard, switchSelectCard] = React.useState({open: false, dataCard: {}});

  React.useEffect(() => {
    function closePopupEsp(e) {
      if(e.keyCode === 27) {
        closePopup()
      }
    }
      window.addEventListener('keydown', closePopupEsp)
    return() => {
      window.removeEventListener('keydown', closePopupEsp)
    }
  })

  function switchProfilePopup () {
    switchIsEditProfilePopupOpen(true)
  }

  function switchPlacePopup () {
    switchIsAddPlacePopupOpen(true)
  }

  function switchAvatarPopup () {
    switchIsEditAvatarPopupOpen(true)
  }

  function switchDeletePopup(){
    switchDeieteCard(true);
   }

  const closePopup = () => {
    switchIsEditProfilePopupOpen(false)
    switchIsAddPlacePopupOpen(false)
    switchIsEditAvatarPopupOpen(false)
    switchDeieteCard(false)
    switchSelectCard({open: false, dataCard: {}});
  }

  function switchImagePopup(data){
    switchSelectCard({open: true, dataCard: data});
   }

  
  return (
    <>
    <div className="page">
      <Header />

      <Main
          handleEditProfileClick={switchProfilePopup}
          handleEditAvatarClick={switchAvatarPopup}
          handleAddPlaceClick={switchPlacePopup}
          handlePopupImage={switchImagePopup}
          handleCardDelete={switchDeletePopup}
      >
      </Main>

      <Footer />

      <PopupWithForm name='avatar' title='Обновить аватар' nameForm='form-avatar' buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closePopup}>
          <input name="avatar" id="avatar-input" className="popup__input popup__input_type_avatar" type="url" placeholder="Ссылка на аватар" required />
          <span id="url-avatar-error" className="popup__input-error avatar-input-error" />
        </PopupWithForm>

      <PopupWithForm name='profile' title='Редактировать профиль' nameForm='form-profile' buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closePopup}>
        <input id="username-input" className="popup__input popup__input_type_username" type="text" name="name" minLength={2} maxLength={40} placeholder="Ваше имя" required />
        <span id="name-error" className="popup__input-error username-input-error" />
        <input id="userjob-input" className="popup__input popup__input_type_userjob" type="text" name="about" minLength={2} maxLength={200} placeholder="Ваша пофессия" required />
        <span id="about-error" className="popup__input-error userjob-input-error" />
      </PopupWithForm>

      <PopupWithForm name='card' title='Новое место' nameForm='form-card' buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closePopup}>
        <input id="name-card" name="name" className="popup__input popup__input_type_place"  type="text" placeholder="Название" minLength={2} maxLength={30} required />
        <span id="name-card-error" className="popup__input-error place-input-error" />
        <input name="link" id="url-card" className="popup__input popup__input_type_link" type="url" placeholder="Ссылка на картинку" required />
        <span id="url-card-error" className="popup__input-error link-input-error" />
      </PopupWithForm>

      <PopupWithForm name='delete' title='Вы уверены?' nameForm='form-delete' isOpen={isdeleteCard} onClose={closePopup} buttonText="Да"/>
      
      <ImagePopup data={selectedCard} onClose={closePopup}/>
    </div>
    </>
  );
}

export default App;
