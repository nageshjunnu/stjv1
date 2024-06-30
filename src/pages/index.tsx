import Head from "next/head";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRecovery, setPasswordRecovery] = useState(false);
  const [resetStatus, setResetStatus] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { token } = router.query;
    if (token) {
      const resetPassword = async () => {
        const data = JSON.stringify({
          token,
          password: '' // Sending an empty password as per the requirement
        });

        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://kyroes.in/st-josephs/api/send-reset-password/',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };

        try {
          const response = await axios.request(config);
          setApiResponse('Password reset successfully');
          setError('');
        } catch (error) {
          setApiResponse('Failed to reset password');
          setError('');
        }
      };

      resetPassword();
    }
  }, [router.query]);

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const userCheckRes = await fetch(`https://kyroes.in/st-josephs/api/users/user/${email}`);
      const userCheckData = await userCheckRes.json();

      if (userCheckData.status === 'success') {
        const hashedPassword = password;
        if (userCheckData.data.password === hashedPassword) {
          localStorage.setItem("usersData", JSON.stringify(userCheckData));
          localStorage.setItem("studentId", userCheckData.data.student_id);
          window.sessionStorage.setItem('sessionKey', userCheckData.sessionKey2);
          localStorage.setItem("token", userCheckData.token);
          localStorage.setItem("sessionKey", userCheckData.sessionKey);
          router.push('/dashboard');
        } else {
          setError('Incorrect password');
          setTimeout(() => setError(''), 5000);
          return false;
        }
      } else {
        loginUserWithSecondApi(email, password);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setTimeout(() => setError(''), 5000);
    }
  };

  const loginUserWithSecondApi = async (email: string, password: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PHP_API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("usersData", JSON.stringify(data));
        localStorage.setItem("studentId", data.data.student_id);
        const { sessionKey2 } = data.sessionKey;
        window.sessionStorage.setItem('sessionKey', sessionKey2);
        localStorage.setItem("token", data.token);
        localStorage.setItem("sessionKey", data.sessionKey);
        router.push('/dashboard');
      } else {
        setError(data.message);
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handlePasswordRecovery = () => {
    setPasswordRecovery(true);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleResetSubmit = async () => {
  
    try {
      const response = await axios.post('https://kyroes.in/st-josephs/api/reset/', {
        email: email
      });
      setResetStatus(response.data.message);
    } catch (error) {
      console.error('Error resetting password:', error);
      setResetStatus('Failed to reset password.');
    }
  };

  const handleLoginRedirect = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/images/favicon.ico" />
      </Head>
      <main className="hold-transition theme-primary bg-img"
        style={{
          backgroundImage: `url("/assets/images/auth-bg/bg-1.jpg")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <div className="container h-p100">
          <div className="row align-items-center justify-content-md-center h-p100">
            <div className="col-12">
              <div className="row justify-content-center g-0">
                <div className="col-lg-5 col-md-5 col-12">
                  {router.query.token ? (
                    <div className="bg-white rounded10 shadow-lg">
                      <div className="content-top-agile p-20 pb-0">
                        <h2 className="text-primary">Password Reset</h2>
                        <p className="mb-0">{apiResponse}</p>
                      </div>
                      <div className="p-40 text-center">
                        <button className="btn btn-danger mt-10" onClick={handleLoginRedirect}>Login</button>
                      </div>
                    </div>
                  ) : !passwordRecovery ? (
                    <div className="bg-white rounded10 shadow-lg">
                      <div className="content-top-agile p-20 pb-0">
                        <h2 className="text-primary">Lets Get Started</h2>
                        <p className="mb-0">Sign in to continue to St Joseph.</p>
                      </div>
                      <div className="p-40">
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            {error && <p className="error text-warning ms-5">{error}</p>}
                            <div className="input-group mb-3">
                              <span className="input-group-text bg-transparent"><i className="ti-user"></i></span>
                              <input
                                className="form-control ps-15 bg-transparent"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(event)=>{
                                  handleEmailChange(event.target.value)
                                }}
                                required
                              />
                              {emailError && <p className="error">{emailError}</p>}
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group mb-3">
                              <span className="input-group-text bg-transparent"><i className="ti-lock"></i></span>
                              <input
                                className="form-control ps-15 bg-transparent"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                              {passwordError && <p className="error">{passwordError}</p>}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <div className="checkbox">
                                <input type="checkbox" id="basic_checkbox_1" />
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="fog-pwd text-end">
                                <a href="javascript:void(0)" className="hover-warning" onClick={handlePasswordRecovery}><i className="ion ion-locked"></i> Forgot pwd?</a><br />
                              </div>
                            </div>
                            <div className="col-12 text-center">
                              <button type="submit" className="btn btn-danger mt-10">SIGN IN</button>
                            </div>
                          </div>
                        </form>
                        <div className="text-center">
                          <p className="mt-15 mb-0">Dont have an account? <a href="auth_register.html" className="text-warning ms-5">Sign Up</a></p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded10 shadow-lg">
                      <div className="content-top-agile p-20 pb-0">
                        <h2 className="text-primary">Password Recovery</h2>
                        {
                          !resetStatus && (
                            <p className="mb-0">Enter your email to reset your password.</p>
                          )
                        }
                      </div>
                      
                      {
                        !resetStatus && (
                          <div className="p-40">
                          <form onSubmit={handleResetSubmit}>
                          <div className="form-group">
                            <div className="input-group mb-3">
                              <span className="input-group-text bg-transparent"><i className="ti-user"></i></span>
                              <input
                                className="form-control ps-15 bg-transparent"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(event)=>{
                                  handleEmailChange(event.target.value)
                                }}
                                required
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 text-center">
                              <button type="submit" className="btn btn-danger mt-10">RESET PASSWORD</button>
                            </div>
                          </div>
                        </form>
                        </div>
                        )
                      }
                        {
                          resetStatus && (
                            <div className="text-center pb-10">
                            {/* <p className="mt-15 mb-0">Remember your password? <a href="javascript:void(0)" className="text-warning ms-5" onClick={() => setPasswordRecovery(false)}>Sign In</a></p> */}
                            <p className="mt-5 mb-5">{resetStatus}</p>
                          
                          <p className="mt-15 mb-0">Redirect to login <a style={{cursor:"pointer"}} onClick={()=>{setPasswordRecovery(false)}} className="text-warning ms-5">Sign In</a></p>
                        </div>                         
                          )
                        }
                      
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginForm;
