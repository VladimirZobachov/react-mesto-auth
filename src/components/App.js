import {useEffect, useState} from "react";
import Header from './Header';
import Main from './Main';
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import * as apiAuth from "../utils/apiAuth";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Route, Router, useHistory, withRouter} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import {Switch} from "react-router-dom";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDelPlacePopupOpen, setIsDelPlacePopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
    const [currentUser, setCurrentUser] = useState('');
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [statusInfoToolTip, setStatusInfoToolTip] = useState(false);
    const [userInfo, setUserInfo] = useState({
        email: ''
    })
    const history = useHistory();

    useEffect(() => {
        if (loggedIn) {
            api.getUser()
                .then((user) => {
                    setCurrentUser(user);
                })
                .catch((err) => {
                    console.log(err);
                })
            api.getInitialCards()
                .then((cards) => {
                    setCards(cards);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loggedIn])

    const handleEditAvatarClick = () => {
        setEditAvatar(true);
    }
    const handleEditProfileClick = () => {
        setEditProfile(true);

    }
    const handleAddPlaceClick = () => {
        setAddPlace(true);

    }
    const handleDelPlaceClick = () => {
        setDelPlace(true);

    }
    const handleCardClick = (card) => {
        setSelectedCard(card);
    }
    const closeAllPopups = () => {
        setEditAvatar(false);
        setEditProfile(false);
        setAddPlace(false);
        setSelectedCard({name: '', link: ''});
        setInfoTooltip(false);

    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.delCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function setEditProfile(value) {
        setIsEditProfilePopupOpen(value);
    }

    function setAddPlace(value) {
        setIsAddPlacePopupOpen(value);
    }

    function setDelPlace(value) {
        setIsDelPlacePopupOpen(value);
    }

    function setEditAvatar(value) {
        setIsEditAvatarPopupOpen(value);
    }

    function setInfoTooltip(value) {
        setIsInfoTooltipOpen(value);
    }

    function handleUpdateUser(user) {
        api.setUser(user.name, user.about)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(user) {
        api.setAvatar(user.avatar)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlace(newCard) {
        api.addCard(newCard.name, newCard.link)
            .then((card) => {
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            return;
        }
        apiAuth.getContent(jwt)
            .then((res) => {
                setLoggedIn(true);
                setUserInfo({"email": res.data.email});
            })
            .catch((err)=>{
                console.log(err);
            });
    };

    const onLogin = (email, password) => {
        return apiAuth
            .authorize(email, password)
            .then(({token}) => {
                localStorage.setItem('jwt', token);
                setLoggedIn(true);
                setUserInfo({"email": email});
            })
            .catch(() => {
                setStatusInfoToolTip(false);
                setInfoTooltip(true);
            });
    }

    const onRegister = (email, password) => {
        return apiAuth
            .register(email, password)
            .then(() => {
                history.push("/signin");
                setStatusInfoToolTip(true);
                setInfoTooltip(true);
            })
            .catch(() => {
                setStatusInfoToolTip(false);
                setInfoTooltip(true);
            })
    }

    const onLogout = () => {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
    }

    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            history.push("/")
        }
    }, [loggedIn, history]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header onLogout={onLogout} userInfo={userInfo}/>
            <Switch>
                <Route path="/signin">
                    <Login onLogin={onLogin}/>
                </Route>
                <Route path="/signup">
                    <Register onRegister={onRegister}/>
                </Route>
                <ProtectedRoute exact path="/"
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onDelPlace={handleDelPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                loggedIn={loggedIn}
                                component={Main}
                />
            </Switch>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                             onUpdateAvatar={handleUpdateAvatar}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                           onAddPlace={handleAddPlace}></AddPlacePopup>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
            <PopupWithForm title="Вы уверены?" name="del-card" titleButton="Да" isOpen={isDelPlacePopupOpen}
                           onClose={closeAllPopups}/>
            <InfoTooltip statusOk={statusInfoToolTip} name="del-card" isOpen={isInfoTooltipOpen}
                         onClose={closeAllPopups} loggedIn={loggedIn} textStatusOk="Вы успешно зарегистрировались!"
                         textStatusErr="Что-то пошло не так! Попробуйте ещё раз."
                         />
            <Footer/>
        </CurrentUserContext.Provider>
    );
}

export default withRouter(App);
