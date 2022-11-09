import React from 'react';
import Link from 'next/link';
import { Button, useMediaQuery } from '@material-ui/core';
import {
  WhatshotOutlined as FireIcon,
  TrendingUpOutlined as TrendingIcon,
  FormatListBulletedOutlined as ListIcon,
} from '@material-ui/icons';
import styles from './LeftMenu.module.scss';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';

const menu = [
  { text: 'Лента', icon: <FireIcon />, path: '/' },
  { text: 'Рейтинг', icon: <TrendingIcon />, path: '/rating' },
  { text: 'Подписки', icon: <ListIcon />, path: '/follows' },
];

export const LeftMenu: React.FC = () => {
  const router = useRouter();

  const userData = useAppSelector(selectUserData);

  const matches1300 = useMediaQuery('(max-width:1300px)');

  const matches750 = useMediaQuery('(max-width:750px)');

  const matches425 = useMediaQuery('(max-width:425px)');

  return (
    <div className={styles.menu}>
      <ul>
        {userData?.id || userData?._id
          ? menu.map((obj) => (
              <li key={obj.path}>
                <Link href={obj.path}>
                  <a className={styles.leftMenuButtons}>
                    <Button variant={router.asPath === obj.path ? 'contained' : 'text'}>
                      {obj.icon}
                      {(!matches1300 || matches750) && !matches425 && obj.text}
                    </Button>
                  </a>
                </Link>
              </li>
            ))
          : menu.map(
              (obj) =>
                obj.text !== 'Подписки' && (
                  <li key={obj.path}>
                    <Link href={obj.path}>
                      <a>
                        <Button variant={router.asPath === obj.path ? 'contained' : 'text'}>
                          {obj.icon}
                          {obj.text}
                        </Button>
                      </a>
                    </Link>
                  </li>
                ),
            )}
      </ul>
    </div>
  );
};
