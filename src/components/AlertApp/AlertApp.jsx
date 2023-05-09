import React from 'react'
import s from './AlertApp.module.scss'

const AlertApp = ({mess="Сообщение", setAlert}) => {
   const close = () => {
      setAlert(null)
   }

   return (
      <div className={s.background} onClick={close}>
         <div className={s.box} onClick={(e)=>e.stopPropagation()}>
            <div className={s.btns}>
               <i className="bi bi-x-lg" onClick={close}></i>
            </div>
            <h2>{mess}</h2>
            <button className={s.btn} onClick={close}>oк</button>
         </div>
      </div>
   );
};
export default AlertApp