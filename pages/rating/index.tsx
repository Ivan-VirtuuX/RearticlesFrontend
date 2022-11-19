import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { MainLayout } from '../../layouts/MainLayout';
import { Api } from '../../utils/api';
import { NextPage } from 'next';
import { ResponseUser } from '../../utils/api/types';
import styles from './rating.module.scss';
import Link from 'next/link';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { FollowState } from '../../components/FollowState';

interface RatingPageProps {
  users: ResponseUser[];
}

const Rating: NextPage<RatingPageProps> = ({ users }) => {
  const userData = useAppSelector(selectUserData);
  const authorId = userData?.id || userData?._id;

  return (
    <MainLayout hideComments>
      <Paper className="pl-20 p-20 pr-20 mb-20" elevation={0}>
        <Typography variant="h5" style={{ fontWeight: 'bold', fontSize: 30, marginBottom: 6 }}>
          Рейтинг пользователей
        </Typography>
      </Paper>
      <Paper elevation={0}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Имя пользователя</TableCell>
              <TableCell align="right">Рейтинг</TableCell>
              {(userData?.id || userData?._id) && <TableCell align="right" />}
            </TableRow>
          </TableHead>
          <TableBody className={styles.user}>
            {users
              .sort((a, b) => b?.followers?.length - a?.followers?.length)
              .map((user) => (
                <TableRow key={user.userId}>
                  <TableCell component="th" scope="row">
                    {console.log(user)}
                    <Link href={`/profile/${user.userId}`}>
                      <a>{user.userId === authorId ? `${user.fullName} (вы)` : user.fullName}</a>
                    </Link>
                  </TableCell>
                  <TableCell align="right">{user.followers.length * 10}</TableCell>
                  {(userData?.id || userData?._id) && (
                    <TableCell align="right">
                      {user.userId !== authorId && <FollowState {...user} authorId={authorId} />}
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </MainLayout>
  );
};

export default Rating;

export const getServerSideProps = async () => {
  try {
    const users = await Api().user.getAll();

    return {
      props: {
        users,
      },
    };
  } catch (err) {
    console.warn(err);
  }

  return {
    props: {
      users: null,
    },
  };
};
