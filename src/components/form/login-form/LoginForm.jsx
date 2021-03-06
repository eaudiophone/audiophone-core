import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from "react-bootstrap";
import { Formik, Form, Field } from 'formik';
import { EmailInput, PasswordInput, CheckboxInput } from '../FormComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import LoginSchema from './LoginSchema';
import Login from './../../../models/LoginModels';

const LoginForm = ({ loading = false, getFormData }) => {

	return (
		<Formik
      initialValues={ new Login( localStorage.getItem('email') ) }
      validationSchema={ new LoginSchema().getSchema() }
      onSubmit={ getFormData }
      validateOnChange={ true }
  	>
    	{ ({ values, handleReset, isValid, isSubmitting }) => {

        return (
         	<Form className="form-signin" noValidate>
            <h2 className="mb-3">Estudio Audiophone</h2>
            <h3 className="mb-3 text-center">Iniciar sesión</h3>
						<Field type="email" name="audiophoneusers_email" component={ EmailInput } />
            <Field type="password" name="audiophoneusers_password" component={ PasswordInput } />
            <Field type="checkbox" name="remember" component={ CheckboxInput } label="Recordar" />
            <Buttons handleReset={ handleReset } disabled={ !isValid } loading={ isSubmitting } />
            <Register />
            <p className="mt-3 mb-3 text-center">
							&copy; Audiophone { new Date().getFullYear() }
            </p>
           </Form>
          );
        }
      }
    </Formik>
	);
}

const Register = () =>  {

  return (
     <div className="register">
        <p>
            Si no posees cuenta
            <Link to="/register">Registrese</Link>
        </p>
    </div>
  );
}

const Buttons = ({ handleReset, loading = false, disabled = true }) => {

  return (
	  <div>
	  	{ !loading && (
	  			<Button type="submit" variant="primary" disabled={ disabled } size="lg" block>
	  				Acceder
					</Button>
	  		)
	  	}
	  	{
	  		loading && (
	  			<Button variant="primary" size="lg" block disabled>
						<FontAwesomeIcon icon="spinner" spin className="mr-2" />
						Acceder
					</Button>
	  		)
	  	}

	    <Button onClick={ handleReset } variant="secondary" size="lg" block>
	        Cancelar
	    </Button>
	  </div>
	)
};

Buttons.propTypes = {
  handleReset: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
};

LoginForm.propTypes = {
  getFormData: PropTypes.func.isRequired
};

export default LoginForm;
