import React from "react";
import PropTypes from 'prop-types';

import { Formik, Form as FormFormik, Field } from 'formik';
import { EmailInput, PasswordInput, FormInput, FormButtonsLg, FormButtons } from './../FormComponent';
import { Row, Col } from 'react-bootstrap';

import Profile from './../../../models/ProfileModels';
import ProfileSchema from './ProfileSchema';

const FormProfileComponent = ({ register = true, loading, getFormData, profile = null }) => {

  return (
    <Formik
      validationSchema={
        register === true ? new ProfileSchema().getRegisterSchema() : new ProfileSchema().getProfileSchema()
      }
      initialValues={ profile === null ? new Profile() : profile }
      onSubmit={ getFormData }
      validateOnChange={ false }
    >
      { ({ handleReset, isValid, isSubmitting }) => (
          <FormFormik className={ register ? 'form' : 'form-profile' } noValidate>
            <Row>
              <Col md={12} className>
                <Field type="text" name="apiaudiophoneusers_fullname" component={ FormInput } title="Nombre:" />
              </Col>
              <Col md={12}>
                <Field type="email" name="apiaudiophoneusers_email" component={ EmailInput } title="Correo electrónico:" />
              </Col>
              <Col md={12}>
                <Field type="password" name="apiaudiophoneusers_password" component={ PasswordInput } />
              </Col>
            </Row>
            { register && <FormButtonsLg reset={ handleReset } disabled={ !isValid } loading={ isSubmitting } widthAll={ true } /> }
            { !register && <FormButtons reset={ handleReset } disabled={ !isValid } loading={ isSubmitting } /> }
          </FormFormik>
        )
      }
    </Formik>
  );
};

FormProfileComponent.propTypes = {
  register: PropTypes.bool.isRequired,
  getFormData: PropTypes.func.isRequired,
  profile: PropTypes.instanceOf( Profile ).isRequired
};

export default FormProfileComponent;
