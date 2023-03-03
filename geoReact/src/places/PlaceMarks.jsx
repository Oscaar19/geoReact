import React, { useReducer } from 'react'
import PlaceMark from './PlaceMark';
import placesMarksReducer from './placesMarksReducer';

const initialState = [];

const init = ()=> {

    return JSON.parse(localStorage.getItem("marks")) || []

}

const PlaceMarks = () => {

    const [marks, dispatchPlaces] = useReducer(placesMarksReducer, initialState,init);

    const handleDeleteMark = (id) => {
        console.log("AQui arribo " + id);
        dispatchPlaces({
            type: "Del Mark",
            payload: id
        });
        console.log("mark borrado")
    };

    return (
        <>
            {marks.map((mark) => (
                <tr>
                    <PlaceMark key={mark.id} mark={mark} handleDeleteMark={handleDeleteMark}/>
                </tr>
            ))}
        </>
    )
}

export default PlaceMarks