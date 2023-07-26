import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './login.module.css';
import { loginValidation } from 'Validations/Auth/login';
import { joiResolver } from '@hookform/resolvers/joi';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';
import { getAuth, login } from 'Redux/auth/thunks';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { LOGIN_SUCCESS } from 'Redux/auth/constants';
import toast, { Toaster } from 'react-hot-toast';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import RecoveryModal from './Modal/Modal';
import { Box, Container, Typography } from '@mui/material';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(loginValidation)
  });

  useEffect(() => {
    toast.remove();
    reset();
    const toastMessage = localStorage.getItem('toastMessage');
    if (toastMessage) {
      showToast(toastMessage, 'success');
      localStorage.removeItem('toastMessage');
    }
  }, []);

  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message, {
        duration: 2500,
        position: 'bottom-center',
        style: {
          background: '#fddba1'
        },
        icon: '💪',
        iconTheme: {
          primary: '#0f232e',
          secondary: '#fff'
        }
      });
    } else if (type === 'error') {
      toast.error(message, {
        duration: 3000,
        position: 'bottom-center',
        style: {
          background: '#d32f2f',
          color: 'white'
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#d32f2f'
        }
      });
    }
  };

  const handleLogin = async (data) => {
    try {
      const response = await dispatch(login(data));
      if (response.type === LOGIN_SUCCESS) {
        dispatch(getAuth(response?.payload.token));
        switch (response.payload.role) {
          case 'SUPER_ADMIN':
            history.push('/super-admins/admins');
            break;
          case 'ADMIN':
            history.push('/admins/home');
            localStorage.setItem('toastMessage', 'Welcome to MegaRocketGYM');
            break;
          case 'TRAINER':
            history.push('/trainers/home');
            localStorage.setItem('toastMessage', 'Welcome to MegaRocketGYM');
            break;
          case 'MEMBER':
            history.push('/members/home');
            localStorage.setItem('toastMessage', 'Welcome to MegaRocketGYM');
            break;
          default:
            history.push('/auth/login');
        }
      } else {
        showToast('Wrong email or password!', 'error');
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleRegister = () => {
    history.push('/auth/register');
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <Toaster />
      <Box className={styles.loginContainer}>
        <img
          onClick={() => history.push('/landing')}
          className={styles.logo}
          src="/assets/images/logos/logo-black.png"
          alt="MegaRocket Logo"
        />
        <Typography textAlign="center" variant="h4" component="h2">
          Sign In
        </Typography>
        <RecoveryModal
          open={showModal}
          handleClose={() => {
            setShowModal(false);
          }}
        />
        <form onSubmit={handleSubmit(handleLogin)} className={styles.formLogin}>
          <FormControl sx={{ width: '21rem', minHeight: '5.5rem' }} variant="standard">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="login-input-email"
              name="email"
              error={errors['email'] ? true : false}
              {...register('email')}
              type={'text'}
            />
            {errors['email'] && (
              <p id="login-input-email-error" className={styles.errorText}>
                {errors['email'].message}
              </p>
            )}
          </FormControl>
          <FormControl sx={{ width: '21rem', minHeight: '5.5rem' }} variant="standard">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="login-input-password"
              name="password"
              error={errors['password'] ? true : false}
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    id="login-eye-button"
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <FaEyeSlash size={15} /> : <FaRegEye size={15} />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors['password'] && (
              <p id="login-input-password-error" className={styles.errorText}>
                {errors['password'].message}
              </p>
            )}
          </FormControl>
          <p className={styles.forgot}>
            <a
              id="login-button-forgot-password"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Forgot Password
            </a>{' '}
            or{' '}
            <a id="login-button-create-account" onClick={handleRegister}>
              Create Account
            </a>
          </p>
          <Box className={styles.buttonContainer}>
            <Button
              sx={{ width: '21rem', fontSize: '16px' }}
              id="login-button-submit"
              type="submit"
              variant="contained"
              size="large"
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
