import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
  email: yup.string().email('Неверный адрес электронной почты').required('Введите адрес электронной почты'),
  password: yup.string().required('Введите пароль').min(6, 'Длина пароля менее 6 символов'),
});

export const RegisterFormSchema = yup
  .object()
  .shape({
    fullName: yup.string().required('Введите имя и фамилию'),
  })
  .concat(LoginFormSchema);
