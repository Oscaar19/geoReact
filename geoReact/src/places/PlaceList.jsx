import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlace } from '../slices/places/thunks';
import '../App.css'
import { setFilter } from '../slices/places/placeSlice';


const PlaceList = ({place}) => {
  let {authToken,setAuthToken,usuari, setUsuari} = useContext(UserContext)
  const {filter} = useSelector((state) => state.places)
  const dispatch = useDispatch();

  function isOwner(place) {
    return place.author.email == usuari
  }

  return (
    <>
        <td>{place.name}</td> 
        <td>{place.description}</td>
        <td>{place.latitude}</td>
        <td>{place.longitude}</td>
        <td>{place.visibility.name}</td>
        <td>{place.author.name}</td>
        <td>{place.favorites_count} <svg width="25px" height="25px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#DD2E44" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242z"></path></svg></td>
        {(isOwner(place)) ?
          <>
            <td><Link to={"/places/"+place.id}><svg width="25px" height="25px" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 832C246.656 832 74.026667 535.210667 66.816 522.581333a21.354667 21.354667 0 0 1-0.042667-21.12C73.941333 488.874667 245.312 192 512 192c265.322667 0 437.973333 296.789333 445.184 309.418667a21.290667 21.290667 0 0 1-0.042667 21.226666C949.888 535.274667 775.957333 832 512 832z" fill="#E6E6E6" /><path d="M512 512m-234.666667 0a234.666667 234.666667 0 1 0 469.333334 0 234.666667 234.666667 0 1 0-469.333334 0Z" fill="#43A6DD" /><path d="M512 512m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" fill="#444444" /><path d="M416 437.333333m-53.333333 0a53.333333 53.333333 0 1 0 106.666666 0 53.333333 53.333333 0 1 0-106.666666 0Z" fill="#FFFFFF" /></svg></Link></td>
            <td><Link to={"/places/edit/"+place.id}><svg fill="#000000" version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
              width="25px" height="25px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve">
              <g>
                  <path d="M3.161,63.357c0.471,0,0.968-0.115,1.479-0.342l14.346-6.376c1.234-0.549,2.887-1.684,3.843-2.64L62,14.829
                      c0.754-0.754,1.17-1.759,1.17-2.829S62.754,9.925,62,9.172l-7.172-7.173C54.074,1.246,53.07,0.831,52,0.831S49.926,1.246,49.172,2
                      L9,42.171c-0.968,0.967-2.09,2.651-2.612,3.917L0.912,59.389c-0.594,1.444-0.174,2.42,0.129,2.873
                      C1.507,62.958,2.28,63.357,3.161,63.357z M20,51.171C20,51.171,20,51.172,20,51.171L12.828,44L46,10.828L53.172,18L20,51.171z
                      M52,4.828L59.172,12L56,15.172L48.828,8L52,4.828z M10.088,47.611c0.059-0.142,0.138-0.303,0.226-0.469l6.213,6.213L5.751,58.143
                      L10.088,47.611z"/>
              </g>
              </svg></Link>
            </td>
            <td><button onClick={((e) => {
              dispatch(deletePlace(place.id,authToken))
            })}><svg fill="#000000" width="25px" height="25px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-trash"><path d="M10 7V16H8V7H10M12 7H14V16H12V7M8 2H14V3H19V5H18V19H17V20H5V19H4V5H3V3H8V2M6 5V18H16V5H6Z" /></svg></button></td>
          </>
          :
          <>
            <td><Link to={"/places/"+place.id}><svg width="25px" height="25px" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 832C246.656 832 74.026667 535.210667 66.816 522.581333a21.354667 21.354667 0 0 1-0.042667-21.12C73.941333 488.874667 245.312 192 512 192c265.322667 0 437.973333 296.789333 445.184 309.418667a21.290667 21.290667 0 0 1-0.042667 21.226666C949.888 535.274667 775.957333 832 512 832z" fill="#E6E6E6" /><path d="M512 512m-234.666667 0a234.666667 234.666667 0 1 0 469.333334 0 234.666667 234.666667 0 1 0-469.333334 0Z" fill="#43A6DD" /><path d="M512 512m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z" fill="#444444" /><path d="M416 437.333333m-53.333333 0a53.333333 53.333333 0 1 0 106.666666 0 53.333333 53.333333 0 1 0-106.666666 0Z" fill="#FFFFFF" /></svg></Link></td>
            <td><button className='buttons' onClick={((e) => {
              dispatch(setFilter({...filter,author:place.author.id}))
            })}><i className="bi bi-filter"></i></button></td>
          </>
        }

        
    </>
  )
}

export default PlaceList


