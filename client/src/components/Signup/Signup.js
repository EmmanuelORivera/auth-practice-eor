import React, { useState } from 'react';
import M from 'materialize-css';
import Joi from 'joi';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/spinner.gif';

const Signup = (props) => {
  const SIGNUP_URL = 'http://localhost:5000/auth/signup';

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const schema = Joi.object({
    username: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9_]{2,30}$'))
      .message('Invalid username')
      .required(),

    password: Joi.string().trim().min(6).required(),
    confirmPassword: Joi.string().trim().min(6).required(),
  });

  const hanldeInputChange = (e) => {
    const target = e.target;

    switch (target.name) {
      case 'username':
        setUsername(target.value);
        break;
      case 'password':
        setPassword(target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(target.value);
        break;
      default:
        alert('An error has been occurred, make sure to contact with support');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await schema.validateAsync({
        username,
        password,
        confirmPassword,
      });

      if (password !== confirmPassword) {
        throw new Error('Passwords must be the same');
      }

      const body = {
        username,
        password,
      };

      setLoading(true);
      const response = await fetch(SIGNUP_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);

      console.log(response);
      if (!response.ok) {
        let error = await response.json();
        throw new Error(error.message);
      }
      let data = await response.json();

      console.log(data);

      setTimeout(() => {
        props.history.push('/');
      }, 1000);
    } catch (err) {
      if (err.message.includes('fetch')) {
        err.message = 'Error with the server';
      }

      setLoading(false);

      M.toast({
        html: `<p><span>Warning!!</span>${err.message}</p>`,
        classes: 'error',
      });
    }
  };

  return (
    <>
      {loading && <img src={Spinner} alt='spinner loader' />}
      {!loading && (
        <div className='row'>
          <form method='POST' onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <div className='input-field col s12'>
              <input
                onChange={hanldeInputChange}
                name='username'
                id='username'
                type='text'
                className='validate'
                required
              />
              <label htmlFor='username'>Username</label>
            </div>
            <div className='row'>
              <div className='input-field col s6'>
                <input
                  onChange={hanldeInputChange}
                  id='password'
                  name='password'
                  type='password'
                  className='validate'
                  required
                />
                <label htmlFor='password'>Password</label>
              </div>
              <div className='input-field col s6'>
                <input
                  onChange={hanldeInputChange}
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  className='validate'
                  required
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
              </div>
            </div>
            <button
              className='btn waves-effect waves-light submit'
              type='submit'
              name='action'
            >
              Submit
              <i className='material-icons right'>send</i>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default withRouter(Signup);
