import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SignInImage from '/assets/sign-in.png';
import EyeOpen from '/assets/eye-open.png';
import EyeClose from '/assets/eye-close.png';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passEye, setPassEye] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      const response = await fetch(
        'https://entry-guard-backend.vercel.app/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', JSON.stringify(data.token));
        toast.success(data.msg);
        navigate('/user-profile');
      } else {
        toast.warn(data.msg);
      }
    } else {
      toast.warn('All Fields are required!');
    }
  };

  return (
    <section className="py-12 md:py-20 min-h-screen flex justify-center items-center">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-20">
          {/* image container */}
          <div className="flex justify-center items-center order-2 lg:order-1">
            <img
              src={SignInImage}
              alt="sign up image"
              className="max-w-full h-auto"
            />
          </div>

          {/* form container */}
          <div className="order-1 flex justify-center items-center">
            <div className="border border-gray-200 rounded-2xl shadow_light p-8 md:p-12 2xl:ml-20">
              {/* heading */}
              <h4 className="text-center text-primary font-black text-4xl sm:text-5xl">
                Fill what we know <span className="text-secondary">!</span>
              </h4>

              {/* form */}
              <form
                className="flex flex-col gap-y-5 mt-12"
                onSubmit={handleSubmit}
              >
                {/* email */}
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="input_style"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {/* password */}
                <div className="relative">
                  <input
                    type={passEye ? 'text' : 'password'}
                    placeholder="Set Password"
                    className="input_style"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <img
                    src={passEye ? EyeOpen : EyeClose}
                    alt=""
                    className="w-8 h-8 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setPassEye((prev) => !prev)}
                  />
                </div>

                {/* submit button */}
                <button
                  type="submit"
                  className="bg-primary py-4 text-xl font-semibold w-full text-white rounded-2xl hover:bg-secondary duration-300 mt-3"
                >
                  Sign In
                </button>

                {/* link to sign up page */}
                <Link
                  to="/"
                  className="flex justify-center items-center bg-white border-2 border-primary hover:border-secondary py-4 text-xl font-semibold w-full hover:text-white rounded-2xl hover:bg-secondary duration-300 "
                >
                  Sign Up
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
