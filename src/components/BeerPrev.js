import React from 'react';
import { Modal } from 'react-bootstrap';
import fullStar from '../assets/full_star_icon.png'
import emptyStar from '../assets/empty_star_icon.png'
import hoverStar from '../assets/hover_star_icon.png'
import { useStore } from '../App'
import { useObserver } from 'mobx-react';
import { StoreContext } from '../App'
import BeerFull from './BeerFull';
import Rating from './Rating';

import '../styles/BeerPrev.css';



// props: id, name, img, favorite
function BeerPrev(props) {
    const store = React.useContext(StoreContext);
    const [showModal, setShowModal] = React.useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    const [fav,setFav]=React.useState(props.fav);

    const clickFavorite = () => {
        setFav(!fav);
        store.changeFav(props.id);
    }

    return useObserver(()=>(
            <div style={{backgroundColor: 'rgba(143, 187, 190, 0.7)'}} class="card">
                
                <img onClick={handleShow} src={props.img} width="25%" height="200" />

                <img class="star" width="45" height="45" src={fav ? fullStar  : emptyStar}
                    onMouseOver={e => e.currentTarget.src = hoverStar}
                    onMouseOut={e => e.currentTarget.src = fav ? fullStar  : emptyStar}
                    onClick={clickFavorite}
                />
                <h4>{props.title}</h4>

                <Modal  show={showModal} onHide={handleClose}>
                    <Modal.Body>
                            <BeerFull title={props.title} id={props.id} image={props.img}></BeerFull>
                    </Modal.Body>
                </Modal>
                {props.rating != 'na' &&
                    <div style={{position:'absolute', left:0,top:5,borderRadius: '25px'}}>
                        <Rating id={props.id} rating={props.rating}></Rating>
                    </div>
                }
            </div>

    ));
}

export default BeerPrev;
