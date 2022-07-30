import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useContext} from "react";

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `gallery__del-button ${isOwn ? 'gallery__del-button-active' : ''}`
    );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `gallery__like_type_is-active`;

    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick(){
        props.onCardLike(props.card);
    }
    function handleDeleteClick(){
        props.onCardDelete(props.card);
    }

    return(
        <li className="gallery__item">
            <button arria-lable="Del" type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}/>
            <img className="gallery__img" alt={props.card.link} src={props.card.link} onClick={handleClick}/>
            <div className="gallery__item-info">
                <h2 className="gallery__item-title">{props.card.name}</h2>
                <div className="gallery__likes">
                    <button aria-label="Like" type="button" className = {`gallery__like ${isLiked ? cardLikeButtonClassName : ''}`} onClick={handleLikeClick}/>
                    <span className="gallery__like-count">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;