import React from 'react';
import { Modal } from 'react-bootstrap';
import { BalanceFormModalComponent } from '../../form/balance-form/BalanceForm';

export const ModalBalanceComponent = ( props ) => {

  const { showModal, closeModal } = props;

  return (
    <Modal size="lg" show={ showModal } onHide={ () => closeModal() }>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo registro</Modal.Title>
      </Modal.Header>
      <BalanceFormModalComponent onClose={( values ) => {
          console.log( values );
          closeModal( values )
        }} />
    </Modal>
  )
}
