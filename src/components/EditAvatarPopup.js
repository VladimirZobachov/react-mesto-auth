import PopupWithForm from "./PopupWithForm";
import {useRef} from "react";
import {useEffect} from "react";

function EditAvatarPopup(props){

    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    return(
        <PopupWithForm title="Обновить аватар" name="edit-avatar" titleButton="Сохранить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
        >
            <input type="url" ref={avatarRef} className="popup__input popup__input_type_avatar" placeholder="ссылка на аватар"
                   name="avatar" id="avatar" required minLength="2" maxLength="200" />
            <span className="popup__error-message popup__error-message_avatar"/>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;

