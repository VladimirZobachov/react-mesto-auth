function PopupWithForm(props){

    const handleClose = props.onClose;

        return(
            <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened': ''}`}>
                <div className={`popup__content-${props.name}`}>
                    <button aria-label="Close" type="button"
                            className="popup__close-button" onClick={handleClose}/>
                    <h2 className="popup__header">{props.title}</h2>
                    <form className={`popup__form popup__form-${props.name}`} name={props.name} onSubmit={props.onSubmit}>
                        {props.children}
                        <button aria-label="saveForm" type="submit" className="popup__button">{props.titleButton}</button>
                    </form>
                </div>
            </div>
        );

}

export default PopupWithForm;