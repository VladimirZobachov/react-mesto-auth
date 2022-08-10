import status_ok from '../images/union_ok.svg';
import status_err from '../images/union_err.svg';

function InfoTooltip(props) {

    const handleClose = props.onClose;

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className={`popup__content-${props.name}`}>
                <button aria-label="Close" type="button"
                        className="popup__close-button" onClick={handleClose}/>
                <img src={props.statusOk ? status_ok : status_err} alt="статус"/>
                <h2 className="popup__infotooltip-title">{props.statusOk ? props.textStatusOk : props.textStatusErr}</h2>
            </div>
        </div>
    );

}

export default InfoTooltip;