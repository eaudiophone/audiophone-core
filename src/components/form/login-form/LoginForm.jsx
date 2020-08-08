import React from "react";
import PropTypes from 'prop-types';

import { Form, Button } from "react-bootstrap";
import { Formik } from 'formik';

import LoginSchema from './LoginSchema';
import Login from './../../../models/LoginModels';

const LoginForm = ({ loading = false, getFormData }) => {

	return (
		<Formik
      initialValues={ new Login( localStorage.getItem('email') ) }
      validationSchema={ new LoginSchema().getSchema() }
      onSubmit={ getFormData }
      validateOnChange={ false }
  	>
    	{({ handleSubmit, handleChange, handleReset, values, errors }) => (

       	<Form 
         	className="form-signin" 
         	onSubmit={ handleSubmit }
         	noValidate
        > 

          <h2 className="mb-3">Estudio Audiophone</h2>
          <h3 className="mb-3 text-center">
            Sign In
          </h3>

          <EmailInput 
          	value={ values.audiophoneusers_email }
          	handleChange={ handleChange }
          	error={ errors.audiophoneusers_email }
          />                  

        	 <PasswordInput 
          	value={ values.audiophoneusers_password }
          	handleChange={ handleChange }
          	error={ errors.audiophoneusers_password }
          />

          <CheckboxInput 
          	value={ values.remember }
          	handleChange={ handleChange }
          />

          <Buttons handleReset={ handleReset } loading={ loading } />

          <Register />  
          
          <p className="mt-3 mb-3 text-muted text-center">
            &copy; Audiophone 2018
          </p>
            
         </Form>
    )}
  </Formik>
	);
}

LoginForm.propTypes = {
  loading: PropTypes.bool,
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


const EmailInput = ({ value, handleChange, error }) => (

	<Form.Group>
		<Form.Label>email:</Form.Label>
		<Form.Control
      name="audiophoneusers_email"
      type="email"
      value={ value }  
			onChange={ handleChange }
      isInvalid={ !!error } 
		/>
    <Form.Control.Feedback type="invalid">
      { error }
    </Form.Control.Feedback>
	</Form.Group>
);

EmailInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  error: PropTypes.string
};
    

const PasswordInput = ({ value, handleChange, error }) => (

	<Form.Group>
    <Form.Label>password:</Form.Label>
		<Form.Control
      name="audiophoneusers_password"
			type="password"
      onChange={ handleChange }
      value={ value } 
			isInvalid={ !!error } 
	   />
    <Form.Control.Feedback type="invalid">
      { error }
    </Form.Control.Feedback>
  </Form.Group>
);

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string
};
    

const CheckboxInput = ({ value, handleChange }) => (
    		 
	 <Form.Group>
    <Form.Check
      id="remember"
      name="remember"
      type="checkbox"
      label="remember me"
      onChange={ handleChange }
      value={ value }
    /> 
   </Form.Group>
);

CheckboxInput.propTypes = {
  value: PropTypes.bool,
  handleChange: PropTypes.func.isRequired
};
    
const Buttons = ({ handleReset, loading = false }) => (

  <div>
  	{ !loading && (
  			<Button type="submit" variant="primary" size="lg" block>
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
);

Buttons.propTypes = {
  handleReset: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
   

export default LoginForm;