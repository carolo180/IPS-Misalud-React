import FormularioNuevo from './Formu_nuevo'
import {db} from '../firebase'
import Swal from 'sweetalert2'
import React, {useEffect, useState}from "react";



function AddData() {
    const [pacientesdata, setData] = useState([])
    const [currentId, setCurrentId] = useState('');
    const  identificador = localStorage.getItem("identificador")

    const addOrEditData = async (dataObject) => {
      if (currentId === "") { 
      await db.collection('pacientesdata').doc().set(dataObject);
      Swal.fire({
        title: 'Desea enviar el registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#c55110',
        cancelButtonColor: '#072f5e',
        confirmButtonText: 'Si, gracias!'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear()

          Swal.fire(
            'Registro agregado!',
         )
          window.location.href=("/pacientes")
        }
      })
    }
    else{
      await db.collection('pacientesdata').doc(currentId).update(dataObject);
      Swal.fire({
        title: 'Desea actualizar el registro?',
        imageUrl: 'https://forjaempresas.com/wp-content/uploads/2020/08/Logos-01-1.png',
        imageWidth: 300,
        imageHeight: 70,
        showCancelButton: true,
        confirmButtonColor: '#c55110',
        cancelButtonColor: '#072f5e',
        confirmButtonText: 'Si, gracias!'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear()

          Swal.fire(
            'Registro actualizado!',
         )
          window.location.href=("/pacientes")
        }
      });
      setCurrentId('');
    }
   
};

console.log(identificador)

useEffect(() => {
  setCurrentId(identificador)
  

},[])

  return (
    <div className="container">
         <FormularioNuevo {...{addOrEditData, currentId:identificador, pacientesdata }} />
    </div>
  );
}

export default AddData;