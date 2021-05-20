import React, { Component,useEffect } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import '../styles/BeerPrev.css';
import fullStar from '../assets/full_star_icon.png'
import emptyStar from '../assets/empty_star_icon.png'
import hoverStar from '../assets/hover_star_icon.png'
import { useStore } from '../App'
import { useObserver } from 'mobx-react';

// props: id, name, img, favorite
function BeerPrev(props) {
    // state = {

    // }
    const store = useStore();
    const [fav,setFav]=React.useState(props.fav);

    const clickFavorite = () => {
        setFav(!fav);
        store.changeFav(props.id);
        console.log(store.getFav);
    }

    // useEffect(() => {
    //     if (props.fav) {
    //         setFav(props.fav);
    //     }
    //   }, [props.fav])

    return useObserver(()=>(
            // <Card style={{backgroundColor: '#e8e8e8'}} border="secondary" class="card" bg='light'>
            //     {/* <Card.Img variant="top" src={props.img} height="150" /> */}
            //     <Card.Body>
            //         <img src={props.img} width="30%" height="200" />
            //         <Card.Title>{props.title}</Card.Title>
            //     </Card.Body>
            // </Card>
            // <div style={{backgroundColor: '#e8e8e8'}} class="card">
            <div style={{backgroundColor: 'rgba(143, 187, 190, 0.7)'}} class="card">
                <img src={props.img} width="25%" height="200" />

                <img class="star" width="45" height="45" src={fav ? fullStar  : emptyStar}
                    onMouseOver={e => e.currentTarget.src = hoverStar}
                    onMouseOut={e => e.currentTarget.src = fav ? fullStar  : emptyStar}
                    onClick={clickFavorite}
                />
                {/* {props.fav &&
                    <img class="star" src={fullStar} width="45" height="45"/>
                }
                {!props.fav &&
                    <img class="star" src={emptyStar} width="45" height="45"/>
                } */}
                <h4>{props.title}</h4>
            </div>
                
            /* <img src={props.img} width="200" height="400" style={{ borderRadius: '25px' }} /> */
        // </div>
    ));
}

export default BeerPrev;
