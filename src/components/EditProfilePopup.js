import {useState, useContext, useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    return(
    <PopupWithForm title="Редактировать профиль" name="edit" titleButton="Сохранить"
                   isOpen={props.isOpen}
                   onClose={props.onClose}
                   onSubmit={handleSubmit}>
        <input type="text" className="popup__input popup__input_type_name" placeholder="Имя" name="name" id="name"
               required minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName}/>
        <span className="popup__error-message popup__error-message_name"/>
        <input type="text" className="popup__input popup__input_type_major" placeholder="Призвание" name="major"
               id="major" required minLength="2" maxLength="200" value={description || ''} onChange={handleChangeDescription}/>
        <span className="popup__error-message popup__error-message_major"/>
    </PopupWithForm>
    )
}

export default EditProfilePopup;