import { NextPage } from 'next';
import { MainLayout } from '../../layouts/MainLayout';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { Api } from '../../utils/api';
import { useEffect, useState } from 'react';
import { ResponseUser } from '../../utils/api/types';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import styles from './follows.module.scss';
import Link from 'next/link';

const Follows: NextPage = () => {
  const [followers, setFollowers] = useState<ResponseUser[]>([]);

  const userData = useAppSelector(selectUserData);
  const userId = userData?.id || userData?._id;

  useEffect(() => {
    (async () => {
      try {
        const data = await Api().user.getAll();

        setFollowers(data.filter((user) => user.followers.some((follower) => follower.userId === userId)));
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  return (
    <MainLayout hideComments>
      <Paper className="pl-20 p-20 pr-20 mb-20" elevation={0}>
        <Typography variant="h5" style={{ fontWeight: 'bold', fontSize: 30, marginBottom: 6 }}>
          Мои подписки
        </Typography>
      </Paper>
      {followers.length ? (
        <Paper elevation={0}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Имя пользователя</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.user}>
              {followers?.map((obj, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <Link href={`/profile/${obj.userId}`}>
                      <a>{obj.fullName}</a>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Paper className="pl-20 p-20 pr-20 mb-20" elevation={0}>
          <Typography variant="h6" style={{ fontWeight: 400, fontSize: 20, marginBottom: 6 }}>
            Список подписок пуст
          </Typography>
        </Paper>
      )}
    </MainLayout>
  );
};

export default Follows;
