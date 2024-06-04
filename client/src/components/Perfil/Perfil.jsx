import   React , {useEffect} from 'react';
import { dataPersonal } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./Perfil.module.css";
import { Button} from '@mui/material';
import {  Result } from 'antd';
import { Link } from 'react-router-dom';
export default function Perfil() {
  const dispatch = useDispatch();
  const datapersonal = useSelector(state => state.datapersonal);
  const token = useSelector(state => state.token);
 console.log(datapersonal)
 useEffect(() => {
  dispatch(dataPersonal(token));
 }, [token]);
  return (
    <div className={styles.perfil_container}>
    {!token ? (
<div>
<Result
    status="403"
    title="403"
    subTitle="Lo siento, necesitas iniciar sesión para ver esta página."
    extra={
      <Link to="/iniciar-sesión">
        <Button sx={{background: "#500075", ":hover": {background: "#500075"}}} variant='contained'>
          Iniciar sesión
        </Button>
      </Link>
    }
  />
</div>
    ):(
<>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Información personal</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Datos personales.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nombre completo</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{datapersonal.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Correo electrónico</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{datapersonal.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Telefóno</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{datapersonal.phone}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Tipo de cuenta</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{datapersonal.role}</dd>
          </div>
          {datapersonal.role === "restaurante" ? (
            
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Administrar mi restaurante</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><Button variant= "contained" sx={{background: "#500075", ":hover": {background: "#500075"}}} href='/administrar' target='_blanck'>Administrar</Button></dd>
          </div>
          ): null}
        
     
        </dl>
      </div>
    </>
    )}
    </div>
  )
}
