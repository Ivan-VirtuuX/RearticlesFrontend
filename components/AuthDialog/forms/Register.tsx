import React, { FC, useState } from 'react';
import { Button } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { RegisterFormSchema } from '../../../utils/validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormField } from '../../FormField';
import { CreateUserDto } from '../../../utils/api/types';
import { setCookie } from 'nookies';
import { Alert } from '@material-ui/lab';
import { setUserData } from '../../../redux/slices/user';
import { useAppDispatch } from '../../../redux/hooks';
import { Api } from '../../../utils/api';

interface RegisterFormProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ onOpenRegister, onOpenLogin }) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      const data = await Api().user.register(dto);

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
        {errorMessage && (
          <Alert severity="error" style={{ marginBottom: 15 }}>
            {errorMessage}
          </Alert>
        )}
        <FormField name="fullName" label="Имя и фамилия" />
        <FormField name="email" label="Почта" />
        <FormField name="password" label="Пароль" />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              onClick={onOpenRegister}
              type="submit"
              color="primary"
              variant="contained"
            >
              Зарегистрироваться
            </Button>
            <Button onClick={onOpenLogin} color="primary" variant="text">
              Войти
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
