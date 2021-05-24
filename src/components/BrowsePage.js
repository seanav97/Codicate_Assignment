import React, { useEffect } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import BeerPrev from './BeerPrev';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import { useObserver } from 'mobx-react';
import { StoreContext } from '../App'

import '../styles/BrowsePage.css';

function BrowsePage(props) {

    const store = React.useContext(StoreContext);

    const [searchValue,setSearchValue]=React.useState('');
    const [allBeers,setAllBeers]=React.useState([]);
    const [displayedBeers,setDisplayedBeers]=React.useState([]);
    const [page,setPage]=React.useState(1);
    const [pageCount,setPageCount]=React.useState(0);

    useEffect(() => {
        store.updateStore();
      },[0]);

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    }
    const handlePageChange = (event, value) => {
        setPage(value);

        allBeers.forEach(beer => {
            if(store.isFav(beer.id))
                beer.favorite=true;
        });

        setDisplayedBeers(allBeers.slice((value-1)*6,(value-1)*6+6));
    }

    const findBeers = async() => {
        const beers_1 = await axios.get(`https://api.punkapi.com/v2/beers`, {
            params: {
                food: searchValue,
                per_page:80,
                page:1
            }
        });
        const beers_2 = await axios.get(`https://api.punkapi.com/v2/beers`, {
            params: {
                food: searchValue,
                per_page:80,
                page:2
            }
        });
        const beers=beers_1.data.concat(beers_2.data).map(v => ({...v,favorite:false}))

        beers.forEach(beer => {
            if(store.isFav(beer.id))
                beer.favorite=true;
        });

        console.log(beers);
        setAllBeers(beers);
        setPageCount(Math.floor(Math.min(beers.length,100)/6));
        setDisplayedBeers(beers.slice(0,6));

    }

    return useObserver(()=>(
        <div>
            <h1 style={{ fontFamily: "Comic Sans MS", color:'white' }}>Search beers</h1>
            <br />
            <div class="center" >
                <FormControl value={searchValue} onChange={handleChange} type="text" />
            <Button onClick={findBeers} style={{ display: 'flex' }} variant="primary">Search</Button>
            </div>
            <br></br>
            <br></br>
                {displayedBeers.map(beer =>
                    <BeerPrev key={beer.id} id={beer.id} img={beer.image_url} title={beer.name} fav={beer.favorite} rating={'na'}/>
                )} 
            <br></br> 

            <div style={{clear:"left",backgroundColor: 'rgba(83, 53, 33, 0.82)',display: 'inline-block',borderRadius: '25px'}}>
                <Pagination color="primary" class="center" size="large" count={pageCount} showFirstButton showLastButton page={page} onChange={handlePageChange}/>
            </div> 
        </div>
    ));
}
export default BrowsePage;

