import React from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { Form, Formik, Field } from 'formik';
import Balance from '../../../models/BalanceModels';
import BalanceSchema from './BalanceSchema';
import { FormInputDate, FormInput, NumberInput } from '../FormComponent';

export const BalanceFormModalComponent = ( props ) => {
  const { onClose } = props;

  return (
    <>
      <Formik
        initialValues={ new Balance() }
        validateOnChange={ true }
        validationSchema={ new BalanceSchema()._schema }
        onSubmit={ ( values, actions ) => onClose({ values, actions })  }
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
                      component={ NumberInput }
                    />
                    <Field
                      columnSize={6}
                      name="apiaudiophonebalances_debe"
                      type="number"
                      title="Debe:"
                      component={ NumberInput }
                    />
                    <Field
                      columnSize={6}
                      name="apiaudiophonebalances_haber"
                      type="number"
                      title="Haber:"
                      component={ NumberInput }
                    />
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" type="reset">
                    Limpiar
                  </Button>
                  <Button variant="primary" type="submit"  disabled={ !values.isValid }>
                    Enviar
                  </Button>
                </Modal.Footer>
              </Form>
          )
        }}
      </Formik>
    </>
  )
}
