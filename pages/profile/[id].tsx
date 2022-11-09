import Link from 'next/link';
import { Paper, Avatar, Typography, Button, Tabs, Tab, useMediaQuery } from '@material-ui/core';
import UserAddIcon from '@material-ui/icons/PersonAddOutlined';
import { Post } from '../../components/Post';
import { MainLayout } from '../../layouts/MainLayout';
import { usePosts } from '../../hooks/usePosts';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';
import { useEffect, useRef, useState } from 'react';
import styles from './profile.module.scss';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { destroyCookie } from 'nookies';
import { Api } from '../../utils/api';
import { NextPage } from 'next';
import { CloudinaryApi } from '../../utils/api/CloudinaryApi';
import { selectUserData } from '../../redux/slices/user';
import { useAppSelector } from '../../redux/hooks';
import ProfileSkeleton from './ProfileSkeleton';
import { useLoading } from '../../hooks/useLoading';
import FollowersBlockSkeleton from './FollowersBlockSkeleton';

const Profile: NextPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [imageFormData, setImageFormData] = useState([]);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState('');
  const [isSave, setIsSave] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [postComments, setPostComments] = useState([]);

  const { isLoading } = useLoading();

  const avatarBgRef = useRef(null);

  const userData = useAppSelector(selectUserData);
  const userId = userData?.id || userData?._id;

  const inputFileRef = useRef(null);

  const router = useRouter();

  const { id } = router.query;

  const { posts } = usePosts();

  const { user } = useUser(id);

  const onLogout = () => {
    destroyCookie(null, 'authToken', { path: '/' });
    router.push('/');
  };

  const userComments = postComments.filter((comment) => comment?.author?.userId === id);

  const matches427 = useMediaQuery('(max-width:427px)');

  const opacityUp = [
    {
      opacity: 0,
      transition: 'all 0.5s ease-in-out',
    },
    {
      opacity: 1,
      transition: 'all 0.5s ease-in-out',
    },
  ];

  const opacityDown = [
    {
      opacity: 1,
      transition: 'all 0.5s ease-in-out',
    },
    {
      opacity: 0,
      transition: 'all 0.5s ease-in-out',
    },
  ];

  const timing = {
    duration: 200,
    iterations: 1,
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await Api().post.getAllPostsComments();

        setPostComments(data);
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data: any = await Api().user.getFavorites(id);
        setUserFavorites(data);

        const user: any = await Api().user.getOne(id);
      } catch (err) {
        console.warn(err);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  useEffect(() => {
    (async () => {
      try {
        const data = await Api().user.getOne(id);

        if (data.followers.some((follower) => follower.userId === userId)) {
          setIsFollow(true);
        } else {
          setIsFollow(false);
        }
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  const handleChangeAvatar = async (files) => {
    try {
      const formData: any = new FormData();

      formData.append('file', files[0]);
      formData.append('upload_preset', 'cqxjdiz4');

      setImageFormData(formData);

      setImage(files[0]);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  };

  const onSubmit = async () => {
    try {
      const { data } = await CloudinaryApi().cloudinary.changeImage(imageFormData);

      await Api().user.updateAvatar(id, data.secure_url);
    } catch (err) {
      console.warn(err);
      alert('Update image error');
    } finally {
      setIsSave(false);
    }
  };

  const onChangeAvatar = () => {
    inputFileRef.current.click();

    setIsSave(true);
  };

  const onFollow = async () => {
    await Api().user.addFollower(userId, id);
    setIsFollow(true);
  };

  const onUnfollow = async () => {
    await Api().user.unfollow(userId, id);
    setIsFollow(false);
  };

  const onMouseEnter = () => {
    avatarBgRef?.current?.animate(opacityUp, timing);
    setIsEditVisible(true);
  };

  const onMouseLeave = () => {
    avatarBgRef?.current?.animate(opacityDown, timing);

    setTimeout(() => {
      setIsEditVisible(false);
    }, 200);
  };

  return (
    <MainLayout contentFullWidth hideComments>
      {isLoading && <ProfileSkeleton />}
      <Paper className="pl-20 pr-20 pt-20 mb-30" elevation={0} style={{ display: isLoading ? 'none' : '' }}>
        <div className={`d-flex justify-between ${matches427 && 'flex-column'}`}>
          <div>
            <div className="avatarContainer" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              {userId === id && (
                <div className={styles.avatarBg} style={{ display: isEditVisible ? 'flex' : 'none' }} ref={avatarBgRef}>
                  <p onClick={onChangeAvatar}>Изменить</p>
                  <input
                    accept="image/*"
                    ref={inputFileRef}
                    type="file"
                    onChange={(e) => handleChangeAvatar(e.target.files)}
                    hidden
                  />
                </div>
              )}
              <div className={styles.avatar}>
                <Avatar src={preview || user?.avatarUrl} style={{ width: 120, height: 120, borderRadius: 6 }}></Avatar>
              </div>
            </div>
            {isSave && (
              <Button variant="contained" className="mt-15" onClick={onSubmit}>
                Сохранить
              </Button>
            )}
            <Typography style={{ fontWeight: 'bold' }} className="mt-10" variant="h4">
              {user?.fullName}
            </Typography>
          </div>
          {userData?.id === id ? (
            <div className={styles.exitButton}>
              <Button onClick={onLogout} style={{ height: 42, minWidth: 45, width: 45 }} variant="contained">
                <ExitToAppIcon />
              </Button>
            </div>
          ) : (
            userId && (
              <div className={styles.unFollow}>
                {isFollow ? (
                  <Button variant="contained" onClick={onUnfollow}>
                    <b>Отписаться</b>
                  </Button>
                ) : (
                  <Button variant="contained" onClick={onFollow}>
                    {matches427 ? (
                      <UserAddIcon />
                    ) : (
                      <>
                        <UserAddIcon />
                        <b className="ml-10">Подписаться</b>
                      </>
                    )}
                  </Button>
                )}
              </div>
            )
          )}
        </div>
        <Typography>На проекте с {user?.createdAt.slice(0, -14)}</Typography>
        <Tabs
          className={`mt-20 ${styles.tabs}`}
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(_, newValue) => setActiveTab(newValue)}
        >
          <Tab label="Статьи" />
          <Tab label="Комментарии" />
          <Tab label="Закладки" />
        </Tabs>
      </Paper>
      <div className={`d-flex align-start ${styles.profileBlocks}`}>
        <div className={`mr-20 flex ${styles.posts}`}>
          {activeTab === 0
            ? posts?.map((obj) => {
                if (obj.userId === id) {
                  return <Post {...obj} key={obj.postId} width={680} />;
                }
              })
            : activeTab === 1
            ? userComments?.map((comment: any) => {
                return (
                  <Paper key={comment.commentId} elevation={0} className="p-20" classes={{ root: styles.paper }}>
                    <div className={styles.comment}>
                      <div className={styles.userInfo}>
                        <Avatar src={comment.author?.avatarUrl}></Avatar>
                        <b>{comment.author.fullName}</b>
                        <span>{comment.author.createdAt.slice(0, -14)}</span>
                      </div>
                      <Typography className={styles.text}>{comment.text}</Typography>
                    </div>
                    <p className={styles.postLink}>
                      <Link href={`/news/${comment.postId}`}>
                        <a>{posts.find((post) => post.postId === comment.postId).title}</a>
                      </Link>
                    </p>
                  </Paper>
                );
              })
            : activeTab === 2 &&
              userFavorites?.map((favorite) => {
                return <Post {...favorite} key={favorite.postId} width={680} />;
              })}
        </div>
        {isLoading && <FollowersBlockSkeleton />}
        <Paper
          style={{ width: 300, display: isLoading ? 'none' : '' }}
          className={`p-20 mb-20 ${styles.subsBlock}`}
          elevation={0}
        >
          <b>Подписчики</b>
          <div className="d-flex mt-15">
            {user?.followers?.map((follower) => (
              <Link href={`/profile/${follower.userId}`} key={follower.userId}>
                <a>
                  <Avatar className="mr-10" src={follower?.avatarUrl} />
                </a>
              </Link>
            ))}
          </div>
        </Paper>
      </div>
    </MainLayout>
  );
};

export default Profile;
