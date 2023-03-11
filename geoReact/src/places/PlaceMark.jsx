import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { delmark } from '../slices/placeMarkSlice';

const PlaceMark = ({mark}) => {

    const dispatch = useDispatch(); 

    const handleDeleteMark = (id) => {
        console.log("AQui arribo " + id);
        dispatch(delmark(id))
    };
    return (
        <>
            <td>{mark.description}</td>
            <td>{mark.name}</td>
            <td><button onClick={(e) => {handleDeleteMark(mark.id)}}>ESBORRAR</button></td>
            <td><Link className="link-secondary text-decoration-none text-uppercase" to={mark.ruta}>VEURE PLACE</Link></td>
        </>
    )
}

export default PlaceMark