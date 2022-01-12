import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React from 'react';

const Comments = ({ comment }) => {
  // console.log(comment);

  return (
    <>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt={comment.creator.toUpperCase()} src='/static/images/avatar/2.jpg' />
        </ListItemAvatar>
        <ListItemText
          primary={comment.creator}
          secondary={
            <React.Fragment>
              <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
                {comment.createdAt.toDate().toString().slice(0, 25)}
              </Typography>
              {`  -  ${comment.text}`}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </>
  );
};

export default Comments;
