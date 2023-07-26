import * as React from 'react';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import styles from '../login.module.css';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { recoveryValidation } from 'Validations/Auth/login';
import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import { firebaseApp } from 'Helper/firebase';
import { toast } from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  border: 'none',
  boxShadow: 24,
  p: 2
};

const showToast = (message, type) => {
  if (type === 'success') {
    toast.success(message, {
      duration: 3000,
      position: 'bottom-center',
      style: {
        background: '#1976d2',
        color: 'white'
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#1976d2'
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

export default function RecoveryModal({ handleClose, open }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(recoveryValidation)
  });

  const resetPassword = async (email) => {
    try {
      await firebaseApp.auth().sendPasswordResetEmail(email);
      showToast('Email to reset your password has been sent', 'success');
      handleClose();
      reset();
    } catch (error) {
      showToast('This email is not register', 'error');
    }
  };

  const handleRecovery = (data) => {
    resetPassword(data.email);
  };

  const onClose = () => {
    handleClose();
    reset();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        id="recovery-password-modal"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ textAlign: 'center', paddingTop: '1.5rem' }}
            id="recovery-modal-title"
            variant="h5"
            component="h2"
          >
            Recovery Password
          </Typography>
          <form onSubmit={handleSubmit(handleRecovery)} className={styles.recoveryForm}>
            <FormControl sx={{ width: '18rem', minHeight: '3rem' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
              <Input
                id="recovery-password-input-email"
                name="email"
                error={errors['email'] ? true : false}
                {...register('email')}
                type={'text'}
              />
              {errors['email'] && <p className={styles.errorText}>{errors['email'].message}</p>}
            </FormControl>
            <FormControl sx={{ width: '18rem', minHeight: '3rem' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Repeat Email</InputLabel>
              <Input
                id="recovery-password-input-repeat-email"
                name="repeatEmail"
                error={errors['email'] ? true : false}
                {...register('repeatEmail')}
                type={'text'}
              />
              {errors['repeatEmail'] && (
                <p className={styles.errorText}>{errors['repeatEmail'].message}</p>
              )}
            </FormControl>
            <Button
              sx={{ width: '18rem' }}
              id="recovery-button-submit"
              type="submit"
              variant="contained"
              size="medium"
            >
              Send Email
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
