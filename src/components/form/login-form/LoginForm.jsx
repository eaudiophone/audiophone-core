import React from "react";
import PropTypes from 'prop-types';

import { Button } from "react-bootstrap";
import { Formik, Form, Field } from 'formik';

import { EmailInput, PasswordInput, CheckboxInput } from '../FormComponent';

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

         	<Form 
           	className="form-signin"
            noValidate 
          > 

            <h2 className="mb-3">Estudio Audiophone</h2>
            <h3 className="mb-3 text-center">
              Sign In
            </h3>

            <Field 
              type="email" 
              name="audiophoneusers_email" 
              component={ EmailInput }
            />

            <Field 
              type="password"
              name="audiophoneusers_password"
              component={ PasswordInput }
            />

            <Field 
              type="checkbox"
              name="remember"
              component={ CheckboxInput }
              label="remember me"
            />

            <Buttons handleReset={ handleReset } disabled={ !isValid } loading={ isSubmitting } />

            <Register />  
            
            <p className="mt-3 mb-3 text-muted text-center">
              &copy; Audiophone 2018
            </p>
              
           </Form>
          );
        }
      }
    </Formik>
	);
}

LoginForm.propTypes = {
  getFormData: PropTypes.func.isRequired
};

const Register = () =>  {
  
  return (
     <div className="register"> 
        <p>
            Si no posees cuenta
            <a href="/register">Registrese</a>
        </p>
    </div>
  );
}
    
const Buttons = ({ handleReset, loading = false, disabled = true }) => {

  return (

  <div>
  	{ !loading && (
  			<Button type="submit" variant="primary" disabled={ disabled } size="lg" block>
  				Iniciar sesión
				</Button>
  		) 
  	}
  	{
  		loading && (
  			<Button variant="primary" size="lg" block disabled>
					<i className="fas fa-spinner fa-spin mr-2"></i>
					Iniciar sesión
				</Button>
  		)
  	}
    
    <Button
      onClick={ handleReset }
      variant="secondary"
      size="lg"
      block
    >
        Cancelar
    </Button>
  </div>
)};

Buttons.propTypes = {
  handleReset: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
};
   

export default LoginForm;