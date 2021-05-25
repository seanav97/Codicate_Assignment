import React, { useEffect } from 'react';
import { ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import { useObserver } from 'mobx-react';

import '../styles/BeerFull.css';

function BeerFull(props) {

    const [abv, setAbv] = React.useState(0);
    const [foodPairing, setFoodPairing] = React.useState([]);
    const [tagLine, setTagLine] = React.useState("");
    const [beerColor, setBeerColor] = React.useState("aaa");
    const [colors, setColors] = React.useState([{ id: 1, color: '#F3F993' }, { id: 2, color: '#F5F75C' }, { id: 3, color: '#F6F513' }, { id: 4, color: '#EAE615' }, { id: 5, color: '#E0D01B' }, { id: 6, color: '#D5BC26' }, { id: 7, color: '#CDAA37' }, { id: 8, color: '#C1963C' }, { id: 9, color: '#BE8C3A' }, { id: 10, color: '#BE823A' }, { id: 11, color: '#C17A37' }, { id: 12, color: '#BF7138' }, { id: 13, color: '#BC6733' }, { id: 14, color: '#B26033' }, { id: 15, color: '#A85839' }, { id: 16, color: '#985336' }, { id: 17, color: '#8D4C32' }, { id: 18, color: '#7C452D' }, { id: 19, color: '#6B3A1E' }, { id: 20, color: '#5D341A' }, { id: 21, color: '#4E2A0C' }, { id: 22, color: '#4A2727' }, { id: 23, color: '#361F1B' }, { id: 24, color: '#261716' }, { id: 25, color: '#231716' }, { id: 26, color: '#19100F' }, { id: 27, color: '#16100F' }, { id: 28, color: '#120D0C' }, { id: 29, color: '#100B0A' }, { id: 30, color: '#050B0A' }]);

    useEffect(() => {
        getBeerDetails();

    }, [0]);

    const getBeerDetails = async () => {
        const beer = await axios.get(`https://api.punkapi.com/v2/beers/` + props.id, {
            params: {
            }
        });
        setAbv(beer.data[0].abv);
        setFoodPairing(beer.data[0].food_pairing);
        setTagLine(beer.data[0].tagline);
        getBeerColor(Math.floor(beer.data[0].srm));
    }

    const getBeerColor = (srm) => {
        let object = colors.find(obj => obj.id === srm);
        if (object != undefined) {
            setBeerColor(object.color);
        }
        else {
            if (srm > 30)
                setBeerColor('black');
            else if (srm < 1)
                setBeerColor('white');
        }
    }

    return useObserver(() => (
        <div>
            <img style={{ float: 'left' }} src={props.image} width="30%" height="400" />
            <div style={{ marginLeft: '160px' }}>
                <h1 style={{ fontSize: '30px' }}>{props.title}</h1>
                <i>{tagLine}</i>
            </div>
            <div style={{ borderStyle: 'solid', left: '190px', position: 'absolute', bottom: '20px', right: '30px' }}>
                <div>
                    <OverlayTrigger placement='top' overlay={<Tooltip>Beer color</Tooltip>}>
                        <div style={{ backgroundColor: `${beerColor}`, width: "50px", height: "50px", position: 'absolute', left: '20%', top: '10px' }}></div>
                    </OverlayTrigger>
                    <OverlayTrigger placement='top' overlay={<Tooltip>Beer strength</Tooltip>}>
                        <div style={{ position: 'absolute', right: '20%', top: '10px' }}>
                            {abv < 6 && <h2 style={{ color: 'green' }}>{abv}%</h2>}
                            {abv >= 6 && abv < 10 && <h2 style={{ color: 'orange' }}>{abv}%</h2>}
                            {abv > 10 && <h2 style={{ color: 'red' }}>{abv}%</h2>}
                        </div>
                    </OverlayTrigger>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div>
                    <ListGroup.Item style={{ textAlign: 'center' }} variant="dark"><u>Pairs excelently with:</u></ListGroup.Item>
                    <ListGroup style={{ width: "100%", textAlign: 'center', fontSize: '13px' }}>
                        {foodPairing.map((pairing, index) =>
                            <ListGroup.Item className="listitem" key={index}>{pairing}</ListGroup.Item>
                        )}
                    </ListGroup>
                </div>
            </div>
        </div>
    ));
}
export default BeerFull;

