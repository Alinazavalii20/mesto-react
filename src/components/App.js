import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithSubmit from './PopupWithSubmit';
import { api } from '../utils/Api';

function App() {

  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCard, setDeleteCard] = useState(false);
  const [selectedCard, setSelectCard] = useState({ open: false, dataCard: {} });

  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api.getAllData()
      .then(([dataInfoUser, dataInfoCard]) => {
        setCurrentUser(dataInfoUser);
        setCards(dataInfoCard);
      })
      .catch((err) => console.log("ошибка получения данных: " + err))
  }, []);

  useEffect(() => {
    function closePopupEsp(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    window.addEventListener('keydown', closePopupEsp)
    return () => {
      window.removeEventListener('keydown', closePopupEsp)
    }
  }, [])

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
    setDeleteCard(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setDeleteCard(false)
    setSelectCard({ open: false, dataCard: {} });
  }

  function handleImagePopup(data) {
    setSelectCard({ open: true, dataCard: data });
  }

  function handleUpdateUser(data) {
    api.editUser(data)
      .then((newData) => {
        setCurrentUser(newData)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then((newData) => {
        setCurrentUser(newData)
        closeAllPopups()
      })
      .catch((err) => console.log("ошибка аватара: " + err))
  }

  function handleAddCard(data) {
    api.postCard(data)
      .then((newData) => {
        setCards([newData, ...cards]);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(data) {
    api.deleteCard(data._id)
      .then(setCards((cards) => cards.filter((c) => c._id !== data._id && c),
      closeAllPopups()))
      .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.setLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          cards={cards}
          handleEditProfileClick={handleProfilePopup}
          handleEditAvatarClick={handleAvatarPopup}
          handleAddPlaceClick={handlePlacePopup}
          handlePopupImage={handleImagePopup}
          onCardLike={handleCardLike}
          handleDeleteClick={handleCardDelete}
          handlePopupWithSubmit={handleDeletePopup}
        >
        </Main>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}></EditProfilePopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          handleAddCard={handleAddCard}></AddPlacePopup>

        <PopupWithSubmit
        isOpen={isDeleteCard}
        onClose={closeAllPopups}
        handleDeleteClick={handleCardDelete}
        data={cards}></PopupWithSubmit>

        <ImagePopup data={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
