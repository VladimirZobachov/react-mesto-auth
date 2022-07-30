import PopupWithForm from "./PopupWithForm";
import {useRef} from "react";
import {useEffect} from "react";

function AddPlacePopup(props){

    const nameRef = useRef();
    const linkRef = useRef();

    function handleAddPlaceSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value,
        });
    }

    useEffect(() => {
        nameRef.current.value = '';
        linkRef.current.value = '';
    }, [props.isOpen]);

    return(
        <PopupWithForm title="Новое место" name="new-card" titleButton="Сохранить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleAddPlaceSubmit}
        >
            <input type="text" ref={nameRef} className="popup__input popup__input_type_title" placeholder="Название" name="title"
                   id="title" required minLength="2" maxLength="30"/>
            <span className="popup__error-message popup__error-message_title"/>
            <input type="url" ref={linkRef} className="popup__input popup__input_type_img" placeholder="Ссылка на картинку"
                   name="img" id="img" required/>
            <span className="popup__error-message popup__error-message_img"/>
        </PopupWithForm>
    )
}

export default AddPlacePopup;