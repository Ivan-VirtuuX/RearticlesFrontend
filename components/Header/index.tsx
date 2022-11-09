import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Paper, Button, ListItem, List, useMediaQuery } from '@material-ui/core';
import { SearchOutlined as SearchIcon, AccountCircleOutlined as UserIcon } from '@material-ui/icons';
import styles from './Header.module.scss';
import { AuthDialog } from '../AuthDialog';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { PostItem } from '../../utils/api/types';
import { Api } from '../../utils/api';
import { useRouter } from 'next/router';
import CreateIcon from '@material-ui/icons/Create';

export const Header: FC = () => {
  const userData = useAppSelector(selectUserData);
  const [authVisible, setAuthVisible] = React.useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [isResultVisible, setIsResultVisible] = useState(false);

  const { pathname } = useRouter();

  const openAuthDialog = () => {
    setAuthVisible(true);
  };

  const closeAuthDialog = () => {
    setAuthVisible(false);
  };

  useEffect(() => {
    if (authVisible && userData) {
      setAuthVisible(false);
    }
  }, [authVisible, userData]);

  const handleChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setSearchValue(e.target.value);

      const data: PostItem[] = await Api().post.search(e.target.value);

      setPosts(data);
    } catch (err) {
      console.warn(err);
    }
  };

  const matches425 = useMediaQuery('(max-width:425px)');
  const matches564 = useMediaQuery('(max-width:564px)');

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <Link href="/">
          <a className={`mr-20 ${styles.logo}`}>
            <img height={50} src="/static/img/logo.svg" alt="Logo" />
          </a>
        </Link>
        {pathname !== '/write' && (
          <div className={styles.searchBlock}>
            <SearchIcon />
            <input
              onChange={handleChangeInput}
              value={searchValue}
              placeholder="Поиск..."
              onClick={() => setIsResultVisible(true)}
            />
            {posts?.length > 0 && searchValue && (
              <Paper className={styles.searchBlockPopup}>
                {isResultVisible && (
                  <List>
                    {posts.map((obj) => (
                      <Link key={obj.postId} href={`/news/${obj.postId}`}>
                        <a>
                          <ListItem button onClick={() => setIsResultVisible(false)}>
                            {obj.title}
                          </ListItem>
                        </a>
                      </Link>
                    ))}
                  </List>
                )}
              </Paper>
            )}
          </div>
        )}
        {pathname !== '/write' &&
          (userData?.id || userData?.id) &&
          (!matches564 ? (
            <Link href="/write">
              <a>
                <Button variant="contained" className={styles.penButton}>
                  Новая запись
                </Button>
              </a>
            </Link>
          ) : (
            <Link href="/write">
              <a>
                <Button variant="contained" className={styles.addButton}>
                  <CreateIcon style={{ color: '#707070' }} />
                </Button>
              </a>
            </Link>
          ))}
      </div>
      <div className="d-flex align-center">
        {userData ? (
          <Link href={`/profile/${userData?.userId || userData?.id}`}>
            <a className={`d-flex align-center ${styles.userIcon}`}>
              <UserIcon />
              {!matches425 && userData?.fullName}
            </a>
          </Link>
        ) : (
          <div className={styles.loginButton} onClick={openAuthDialog}>
            <UserIcon />
            Войти
          </div>
        )}
      </div>
      <AuthDialog onClose={closeAuthDialog} visible={authVisible} />
    </Paper>
  );
};
