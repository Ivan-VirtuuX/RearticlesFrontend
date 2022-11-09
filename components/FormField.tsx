import React, { FC } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  label: string;
}

export const FormField: FC<FormFieldProps> = ({ name, label }) => {
  const { register, formState } = useFormContext();

  return (
    <TextField
      {...register(name)}
      helperText={formState.errors[name]?.message}
      error={!!formState.errors[name]?.message}
      name={name}
      className="mb-15"
      size="small"
      label={label}
      variant="outlined"
      fullWidth
    />
  );
};
