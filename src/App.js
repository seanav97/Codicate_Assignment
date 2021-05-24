import React, { Component,useEffect } from 'react';
import './App.css';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import BrowsePage from './components/BrowsePage.js';
import FavPage from './components/FavPage.js';
import Navigation from './components/Navigation.js';
import beer from './assets/beer.png'
import {useLocalStore, useObserver} from "mobx-react";

import { inject, observer } from 'mobx-react';

if (localStorage.getItem("favorites") === null) {
  localStorage.setItem('favorites',JSON.stringify([]));
  localStorage.setItem('ratings',JSON.stringify([]));
}


export const StoreContext=React.createContext();

export const StoreProvider=({children})=>{
  const store = useLocalStore(()=> ({
    favorites:[],
    ratings:[],
    changeFav:(id)=>{
      let index = store.favorites.indexOf(id);
      if(index==-1){
        store.favorites.push(id);
        store.ratings.push('');
      }
      else{
        store.favorites.splice(index, 1);
        store.ratings.splice(index, 1);
      }
      store.updateLS();
    },
    updateLS:()=>{
      localStorage.setItem('favorites',JSON.stringify(store.favorites));
      localStorage.setItem('ratings',JSON.stringify(store.ratings));
    },
    updateStore:()=>{
      store.favorites= JSON.parse(localStorage.getItem('favorites'));
      store.ratings= JSON.parse(localStorage.getItem('ratings'));
    },
    isFav:(id)=>{
      return store.favorites.includes(id);
    },
    get getFav(){
      return this.favorites;
    },
    empty:()=>{
      store.favorites=[];
      store.ratings=[];
      store.updateLS();
    },
    setRanking:(id,rank)=>{
      let index = store.favorites.indexOf(id);
      store.ratings[index]=rank;
      store.updateLS();
    },
    getRating(id){
      let index = store.favorites.indexOf(id);
      return store.ratings[index];
    },
  }));

  return(
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(StoreContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}


function App() {
  return (
    <StoreProvider>
      <div className="App" style={{backgroundSize: 'cover',backgroundImage: `url(${beer})`,height: '100%'}}>
          <Router>
            <Navigation></Navigation>
          </Router>
          <Router>
            <Route path='/' exact component={BrowsePage}></Route>
            <Route path='/favorites' exact component={FavPage}></Route>
          </Router>
      </div>
      <script src="https://unpkg.com/mobx-react-devtools"></script>


    </StoreProvider>
  );
}

export default App;
