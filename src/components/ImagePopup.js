function ImagePopup(props) {
    const handleClose = props.onClose;
        return(
            <div className={`popup popup_type_image ${props.card.link ? 'popup_opened': ''}`}>
                <div className="popup__content-img">
                    <button aria-label="Close" type="button"
                            className="popup__close-button popup__close-button_type_img" onClick={handleClose}/>
                    <img className="popup__gallery-img" alt={props.card.name} src={props.card.link}/>
                    <h2 className="popup__title-img">{props.card.name}</h2>
                </div>
            </div>
        );
}

export default ImagePopup;