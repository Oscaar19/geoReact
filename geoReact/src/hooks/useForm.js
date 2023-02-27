import { useState } from "react";

const useForm = (initialForm={}) => {

    let [formState, setFormState] = useState(initialForm);

    const handleChange = ({ target }) => {
      // amb { target }  desestructurem e
      // enlloc d'escriure e.target , escriurem target
  
  
      // Desestructurem ara target
      const { name, value } = target;
  
  
      setFormState({
        ...formState,
        // [target.name] : target.value
        [name]: value,
      });
      // Si no haguéssim desestrcuturat res...
      // [e.target.name] : e.target.value
    };

    const onResetForm=()=>{
      setFormState(initialForm)
    }

    //	………………………
    // Podem afegir més mètodes
    // I s’hauran de retornar a continuació
    return { ...formState, formState,handleChange,onResetForm };

}

export default useForm
