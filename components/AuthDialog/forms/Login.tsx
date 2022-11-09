import React, { FC, useState } from 'react';
import { Button } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { LoginFormSchema } from '../../../utils/validations';
import { FormField } from '../../FormField';
import { LoginDto } from '../../../utils/api/types';
import { setCookie } from 'nookies';
import { Alert } from '@material-ui/lab';
import { useAppDispatch } from '../../../redux/hooks';
import { setUserData } from '../../../redux/slices/user';
import { Api } from '../../../utils/api';
import { yupResolver } from '@hookform/resolvers/yup';

interface LoginFormProps {
  onOpenRegister: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onOpenRegister }) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (dto: LoginDto) => {
    try {
      const data = await Api().user.login(dto);

      setCookie(null, 'authToken', data.token, {
        maxAge: 30 * 24 * 60,
        path: '/',
      });
      setErrorMessage('');
      dispatch(setUserData(data));
    } catch (err) {
      console.warn('Auth error', err);

      if (err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {errorMessage && (
            <Alert severity="error" style={{ marginBottom: 15 }}>
              {errorMessage}
            </Alert>
          )}
          <FormField name="email" label="Почта" />
          <FormField name="password" label="Пароль" />
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              type="submit"
              color="primary"
              variant="contained"
            >
              Войти
            </Button>
            <Button onClick={onOpenRegister} color="primary" variant="text">
              Регистрация
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
