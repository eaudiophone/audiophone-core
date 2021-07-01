import React from 'react';
import { Modal } from 'react-bootstrap';
import { BalanceFormModalComponent } from '../../form/balance-form/BalanceForm';

export const ModalBalanceComponent = ( props ) => {

  const { showModal, closeModal, balance } = props;

  return (
    <Modal size="lg" show={ showModal } onHide={ () => closeModal( null, null ) }>
      <Modal.Header closeButton>
        { !balance && ( <Modal.Title>Nuevo registro</Modal.Title> ) }
        { balance && ( <Modal.Title>Editar registro { balance.apiaudiophonebalances_id }</Modal.Title> ) }
      </Modal.Header>
      <BalanceFormModalComponent
        balance={ balance }
        edit={ balance ? true : false }
        onClose={( type, values ) => { closeModal( type, values ) }}
      />
    </Modal>
  )
}
