import React from 'react';
import { Modal, Button } from 'react-bootstrap';
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

export const ModalBalanceConfirmComponent = ( props ) => {
  const { showModal, closeModal, balance } = props;

  let payload = balance ? {
    id_apiaudiophoneclients: balance.id_apiaudiophoneclients,
    apiaudiophonebalances_id: balance.apiaudiophonebalances_id
  } : null;

  return (
    <Modal show={ showModal } onHide={ () => closeModal( 'delete', null ) } centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar registro de balance { balance ? balance.apiaudiophonebalances_id : '' }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Esta seguro de confirmar la acción?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ () => closeModal( 'delete', null ) }>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={ () => closeModal( 'delete', payload )}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
