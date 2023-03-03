import React from 'react'

const PlaceMark = ({mark,handleDeleteMark}) => {
    console.log(mark)
    return (
        <>
            <td>{mark.description}</td>
            <td>{mark.name}</td>
            <td><button onClick={(e) => {handleDeleteMark(mark.id)}}>ESBORRAR</button></td>
        </>
    )
}

export default PlaceMark