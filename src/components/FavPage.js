import React, { Component, useEffect,componentDidMount } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import BeerPrev from './BeerPrev';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import { useStore } from '../App'
import { StoreContext } from '../App'
import { useObserver } from 'mobx-react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css




import '../styles/BrowsePage.css';

function FavPage(props) {

  // const store = useStore();
  const store = React.useContext(StoreContext);
  const [favoriteBeers,setFavoriteBeers]=React.useState([]);
    // let favoriteBeers=[];
    
    useEffect(() => {
      store.updateStore();
      getBeers();
    },[0]);

    const componentDidMount=() => {
    };
    
    
    
    const getBeers = async() => {
      
      let ids=store.getFav;
      console.log(store.getFav);
      console.log(ids);
      let idsString="";
      ids.forEach(id => {
        idsString=idsString+id+"|";
      });
      idsString = idsString.slice(0, -1);
      
      
      let beers = await axios.get(`https://api.punkapi.com/v2/beers`, {
        params: {
          ids: idsString
        }
      });
      
      beers=beers.data.map(v => ({...v,favorite:true}))
      
      console.log(beers);
      // return beers;
      setFavoriteBeers(beers);
      
    }

    const removeAll = () => {

      confirmAlert({
        title: 'Are you sure you want to remove all your favorites?',
        // message: 'Are you sure you want to remove all your favorites?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              store.empty();
              store.updateLS();
              setFavoriteBeers([]);
            }
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      });
      
      
      
    }


    return useObserver(()=>(
        <div>
            <h1 style={{ fontFamily: "Comic Sans MS", color:'white' }}>Your Favorite Beers</h1>
            <br></br>
            <Button onClick={removeAll} style={{ display: 'flex', float:'right' }} variant="primary">Remove all</Button>

            <br></br>

            {favoriteBeers.map(beer =>
                <BeerPrev key={beer.id} id={beer.id} img={beer.image_url} title={beer.name} fav={beer.favorite}/>
            )} 
            <br></br> 

        </div>
    ));
}
export default FavPage;

