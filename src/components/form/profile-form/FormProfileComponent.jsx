import React from "react";
import PropTypes from 'prop-types';

import { Formik, Form as FormFormik, Field } from 'formik';
import { EmailInput, PasswordInput, FormInput, FormButtons } from './../FormComponent';

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

          <FormFormik className="form" noValidate>

            <Field
              type="text"
              name="apiaudiophoneusers_fullname"
              component={ FormInput }
              title="Nombre:"
            />

            <Field
              type="email"
              name="apiaudiophoneusers_email"
              component={ EmailInput }
            />

            <Field
              type="password"
              name="apiaudiophoneusers_password"
              component={ PasswordInput }
            />

            <FormButtons reset={ handleReset } disabled={ !isValid } loading={ isSubmitting } />

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
