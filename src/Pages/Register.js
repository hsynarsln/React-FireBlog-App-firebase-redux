import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, CircularProgress, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Icon from '../Components/Icon';
import { signIn, signupWithEmail } from '../Redux/actions/userActions';

//! Yup --> validation olarak kullanılıyor
//! Bu şemayı Formik içerisine validationShema olarak atıyoruz.
const signUpValidationSchema = Yup.object().shape({
  username: Yup.string().required('Display name is required').min(2, 'Too short').max(15, 'Must be 15 char or less'),
  //! En az 2 karakter olması lazım. olmazsa yanına yazdığımız mesajı
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string()
    .required('No password provided')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .matches(/\d+/, 'Password must have a number')
    .matches(/[a-z]+/, 'Password must have a lowercase')
    .matches(/[A-Z]+/, 'Password must have a uppercase')
    .matches(/[!?.@#$%^&*()-+]+/, 'Password must have a special char')
});

function Login() {
  const dispatch = useDispatch();
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const loading = useSelector(state => state.userReducer.loading);

  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    // console.log(values);
    dispatch(signupWithEmail(values, navigate));

    resetForm();
    // navigate('/');
  };

  const signInGoogle = () => {
    dispatch(signIn(navigate));
  };

  return (
    <div className='auth'>
      <Container
        sx={{
          marginTop: '3rem',
          // mt: 6,
          height: 'calc(80vh)',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: '3rem',
          borderRadius: '20px'
        }}
        maxWidth='sm'
      >
        <Avatar
          sx={{
            margin: 'auto',
            bgcolor: 'primary.main'
            // bgcolor: blue[500],
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography sx={{ margin: '1rem' }} variant='h4'>
          REGISTER
        </Typography>
        {/* //! Bütün formu sarmallıyoruz. Kendi local state i var. ilave olarak state tanımlamıyoruz. Sadece yukarıda const ile initialValues tanımlıyoruz. initial değerleri formik tagi içerisine tanımlıyoruz. */}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          //! Yup ile hazırladığımız validationu buraya gönderiyoruz.
          validationSchema={signUpValidationSchema}
        >
          {/* //!Bütün formu curly braces içerisine alıyoruz. Ve arrow function kullanarak bütün değişkenleri burada tanımlıyoruz. Ayrıca değerleri destructuring yapmak önemli  */}
          {({
            //!Parametre olarak tanımladığımız (values) değişkenleri TextField içerisinde value değişkenlerine atıyoruz.
            values,
            handleChange,
            //! handleSubmit önce burada, daha sonra Formik içerisinde tanımlıyoruz. Müteakiben fonksiyonu yukarıda oluşturuyoruz.
            handleSubmit,
            //! touched and errors and handleBlur--> validation hatasını almak için eklememiz gerekiyor.
            touched,
            errors,
            //! handleBlur --> focustan yani inputtan çıktığımızda blur oluyor.
            handleBlur
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {/* //! xs={12} --> 12 birim yer kaplasın */}
                  <TextField
                    name='username'
                    label='User Name'
                    variant='outlined'
                    value={values.username}
                    onChange={handleChange}
                    //! onBlur --> focustan çıktıktan sonra
                    onBlur={handleBlur}
                    //! helper text input altındaki validation uyarısı
                    helperText={touched.username && errors.username}
                    //! uyarıyı error şeklinde vermesi için (rengi kırmızı oldu)
                    error={touched.username && Boolean(errors.username)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField name='email' label='Email' variant='outlined' value={values.email} onChange={handleChange} onBlur={handleBlur} helperText={touched.email && errors.email} error={touched.email && Boolean(errors.email)} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField name='password' label='Password' type='password' value={values.password} onChange={handleChange} onBlur={handleBlur} helperText={touched.password && errors.password} error={touched.password && Boolean(errors.password)} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  {loading ? (
                    <CircularProgress color='secondary' />
                  ) : (
                    <>
                      <Button type='submit' variant='contained' color='primary' fullWidth style={{ marginBottom: '1rem' }}>
                        REGISTER
                      </Button>

                      <Button color='primary' fullWidth onClick={() => signInGoogle()} startIcon={<Icon />} variant='contained'>
                        Google Sign In
                      </Button>
                    </>
                  )}
                </Grid>
                <Grid container justifyContent='flex-end'>
                  <p>
                    Already have an account?
                    <Link
                      sx={{
                        textDecoration: 'none',
                        fontWeight: '600',
                        paddingLeft: '0.5rem',
                        cursor: 'pointer'
                      }}
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Link>
                  </p>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default Login;
