import React, { FC, useState } from 'react';
import { Dialog, DialogContent, DialogContentText, Typography } from '@material-ui/core';
import styles from './AuthDialog.module.scss';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { LoginForm } from './forms/Login';
import { RegisterForm } from './forms/Register';

interface AuthDialogProps {
  onClose: () => void;
  visible: boolean;
}

export const AuthDialog: FC<AuthDialogProps> = ({ onClose, visible }) => {
  const [formType, setFormType] = useState<'login' | 'register'>('login');

  return (
    <Dialog open={visible} onClose={onClose} fullWidth maxWidth="sm" style={{ zIndex: 10000 }}>
      <DialogContent className={styles.dialogContainer}>
        <DialogContentText className="d-flex">
          <img
            src="https://i.pinimg.com/originals/4b/04/99/4b0499705797743744beb70d77c588ec.jpg"
            className={styles.sketchGirl}
            alt="authImageSketchGirl"
          />
          <div className={styles.content}>
            <Typography className={styles.title}>
              {formType === 'login' ? (
                'Вход в Rearticles'
              ) : (
                <div className={styles.backTitle}>
                  <p onClick={() => setFormType('login')}>
                    <ArrowBackIcon />
                  </p>
                  <p>К авторизации</p>
                </div>
              )}
            </Typography>
            {formType === 'login' && <LoginForm onOpenRegister={() => setFormType('register')} />}
            {formType === 'register' && (
              <RegisterForm onOpenRegister={() => setFormType('register')} onOpenLogin={() => setFormType('login')} />
            )}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
