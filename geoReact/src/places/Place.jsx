import React from 'react'

const Place = () => {
    const { id } = useParams();
    return (
        <div>Place {id}.</div>
    )
}

export default Place
