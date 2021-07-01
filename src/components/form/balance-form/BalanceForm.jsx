import React from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { Form, Formik, Field } from 'formik';
import Balance from '../../../models/BalanceModels';
import BalanceSchema from './BalanceSchema';
import { FormInputDate, FormInput, NumberInput, DecimalNumberInput } from '../FormComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BalanceFormModalComponent = ( props ) => {
  const { onClose, edit, balance } = props;

  const handleSubmit = ( values, actions ) => {
    actions.setSubmitting( true );
    onClose( edit ? 'edit' : 'new',  { values, actions });
  }

  return (
    <>
      <Formik
        initialValues={ !edit ? new Balance() : balance }
        validateOnChange={ true }
        validationSchema={ new BalanceSchema()._schema }
        onSubmit={ handleSubmit }
      >
        {( values ) => {
          return (
              <Form noValidate>
                <Modal.Body>
                  <Row className="p-2">
                    <Col md={6}>
                      <Field
                        name="apiaudiophonebalances_desc"
                        component={ FormInput }
                        type="text"
                        title="Descripción:"
                      />
                    </Col>
                    <Col md={6}>
                      <Field
                        name="apiaudiophonebalances_date"
                        component={ FormInputDate }
                        type="date"
                        title="Fecha:"
                      />
                    </Col>
                    <Field
                      columnSize={6}
                      name="apiaudiophonebalances_horlab"
                      type="number"
                      title="Horas laboradas:"
                      component={ NumberInput }
                    />
                    <Field
                      columnSize={6}
                      name="apiaudiophonebalances_tarif"
                      type="number"
                      title="Tarifa por hora:"
                      component={ DecimalNumberInput }
                    />
                    <Field
                      columnSize={6}
                      name="apiaudiophonebalances_debe"
                      type="number"
                      title="Debe:"
                      component={ DecimalNumberInput }
                    />
                    <Field
                      columnSize={6}
                      name="apiaudiophonebalances_haber"
                      type="number"
                      title="Haber:"
                      component={ DecimalNumberInput }
                    />
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" type="reset">
                    Limpiar
                  </Button>
                  { !values.isSubmitting && (
                    <Button disabled={ !values.isValid } variant="primary" type="submit">
                      Enviar
                    </Button>
                    )
                  }
                  { values.isSubmitting && (
                    <Button disabled variant="primary">
                      <FontAwesomeIcon className="mr-2" icon="spinner" spin />
                      Enviar
                    </Button>
                    )
                  }
                </Modal.Footer>
              </Form>
          )
        }}
      </Formik>
    </>
  )
}
