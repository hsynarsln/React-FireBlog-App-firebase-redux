import { Button, Paper, TextField } from '@mui/material';
import { teal } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: 5
    }
  },
  paper: {
    padding: 10
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  fileInput: {
    width: '97%',
    margin: '10px 0'
  },
  buttonSubmit: {
    marginBottom: 10
  }
}));

const BlogForm = ({ currentId, setCurrentId, card }) => {
  const [blogData, setBlogData] = useState({
    title: '',
    imageURL: '',
    content: ''
  });

  const classes = useStyles();

  useEffect(() => {
    if (card) {
      setBlogData(card);
    }
  }, [card]);

  const handleSubmit = async e => {
    e.preventDefault();

    // if (!currentId) {
    //   dispatch(createPost({ ...blogData, name: user?.result?.name }));
    //   clear();
    // } else {
    //   dispatch(updatePost(currentId, { ...blogData, name: user?.result?.name }));
    //   clear();
    // }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <TextField name='title' variant='outlined' label='Title *' fullWidth value={blogData.title} onChange={e => setBlogData({ ...blogData, title: e.target.value })} />
        <TextField name='imageURL' variant='outlined' label='Image URL *' fullWidth value={blogData.imageURL} onChange={e => setBlogData({ ...blogData, message: e.target.value })} />
        <TextField name='content' variant='outlined' label='Content *' fullWidth value={blogData.content} onChange={e => setBlogData({ ...blogData, tags: e.target.value })} multiline rows={10} />
        <Button className={classes.buttonSubmit} sx={{ bgcolor: teal[400] }} variant='contained' color='success' size='medium' type='submit' fullWidth>
          {blogData.id ? 'UPDATE' : 'SUBMIT'}
        </Button>
      </form>
    </Paper>
  );
};

export default BlogForm;
