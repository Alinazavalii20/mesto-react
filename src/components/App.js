import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isdeleteCard, setDeieteCard] = React.useState(false);
  const [selectedCard, setSelectCard] = React.useState({ open: false, dataCard: {} });

  React.useEffect(() => {
    function closePopupEsp(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    window.addEventListener('keydown', closePopupEsp)
    return () => {
      window.removeEventListener('keydown', closePopupEsp)
    }
  })

  function handleProfilePopup() {
    setIsEditProfilePopupOpen(true)
  }

  function handlePlacePopup() {
    setIsAddPlacePopupOpen(true)
  }

  function handleAvatarPopup() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleDeletePopup() {
    setDeieteCard(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setDeieteCard(false)
    setSelectCard({ open: false, dataCard: {} });
  }

  function handleImagePopup(data) {
    setSelectCard({ open: true, dataCard: data });
  }


  return (
    <div className="page">
      <Header />

      <Main
        handleEditProfileClick={handleProfilePopup}
        handleEditAvatarClick={handlePlacePopup}
        handleAddPlaceClick={handleAvatarPopup}
        handlePopupImage={handleImagePopup}
        handleCardDelete={handleDeletePopup}
      >
      </Main>

      <Footer />

      <PopupWithForm name='avatar' title='Обновить аватар' nameForm='form-avatar' buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input name="avatar" id="avatar-input" className="popup__input popup__input_type_avatar" type="url" placeholder="Ссылка на аватар" required />
        <span id="url-avatar-error" className="popup__input-error avatar-input-error" />
      </PopupWithForm>

      <PopupWithForm name='profile' title='Редактировать профиль' nameForm='form-profile' buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input id="username-input" className="popup__input popup__input_type_username" type="text" name="name" minLength={2} maxLength={40} placeholder="Ваше имя" required />
        <span id="name-error" className="popup__input-error username-input-error" />
        <input id="userjob-input" className="popup__input popup__input_type_userjob" type="text" name="about" minLength={2} maxLength={200} placeholder="Ваша пофессия" required />
        <span id="about-error" className="popup__input-error userjob-input-error" />
      </PopupWithForm>

      <PopupWithForm name='card' title='Новое место' nameForm='form-card' buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input id="name-card" name="name" className="popup__input popup__input_type_place" type="text" placeholder="Название" minLength={2} maxLength={30} required />
        <span id="name-card-error" className="popup__input-error place-input-error" />
        <input name="link" id="url-card" className="popup__input popup__input_type_link" type="url" placeholder="Ссылка на картинку" required />
        <span id="url-card-error" className="popup__input-error link-input-error" />
      </PopupWithForm>

      <PopupWithForm name='delete' title='Вы уверены?' nameForm='form-delete' isOpen={isdeleteCard} onClose={closeAllPopups} buttonText="Да" />

      <ImagePopup data={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
