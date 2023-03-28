import React from 'react'

import { useDispatch } from 'react-redux'

import { setPage } from '../slices/places/placeSlice';

export const PaginateLink = ({ n }) => {

    const dispatch = useDispatch();

    return (
        <li className='page-item'>
            {n.active ? (
                <>
                    <a className='page-link' href="#!">
                        {/* Per eliminar els &quote */}
                        <div dangerouslySetInnerHTML={{ __html: n.label }} />
                    </a>                       
                </>

            ) : (
                <>
                    {/* Artifici per a obtenir el número de pàgina de la url */}
                    <a onClick={(e) => { if (n.url != null) dispatch(setPage(n.url.split("=")[1])) }} className='page-link' href="#!">
                        <div dangerouslySetInnerHTML={{ __html: n.label }} />
                    </a>
                </>
            )
            }
        </li>
            

    )

}