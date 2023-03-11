import { useSelector } from 'react-redux';
import PlaceMark from './PlaceMark';
import { db } from "../firebase";
import {doc,getDocs,deleteDoc,addDoc, collection,} from "firebase/firestore";


const PlaceMarks = () => {

    const {marks} = useSelector(state => state.marks)

    const marksCollectionRef =collection(db,"placesMarks")

    const synchronizeMarks = async () => {

        // Obtenim tots els todos per adesprés esobrrar-los
        const dades = await getDocs(marksCollectionRef);
        // Esborrem tots els todos
        // aquest sistema no es recomana en entorn web,
        // però no hi ha un altra opció
        dades.docs.map((v) => {
            deleteDoc(doc(db, "placesMarks", v.id));
        });
        // Afegim tots els todos de nou
        marks.map((p) => {
            addDoc(marksCollectionRef, {
                name: p.name,
                description: p.description,
            });
        });
    };
    

   

    return (
        <>
            <button className="btn btn-primary" onClick={() => {synchronizeMarks();}}>SYNC</button>
            {marks.map((mark) => (
                <tr>
                    <PlaceMark key={mark.id} mark={mark}/>
                </tr>
            ))}
        </>
    )
}

export default PlaceMarks