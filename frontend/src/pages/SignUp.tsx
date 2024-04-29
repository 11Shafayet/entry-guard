import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select, { StylesConfig, ValueContainerProps } from 'react-select';

import SignUpImage from '/assets/sign-up.png';
import EyeOpen from '/assets/eye-open.png';
import EyeClose from '/assets/eye-close.png';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

const contactModeOptions = ['Email', 'Phone'];

const selectStyles: StylesConfig = {
  control: (styles, { isFocused }) => ({
    ...styles,
    border: '0',
    borderRadius: '0',
    borderBottom: `1px solid ${isFocused ? '#3A244A' : '#e5e7eb'}`,
    transition: 'border-color 0.2s ease',
    paddingLeft: '4px',
    boxShadow: 'none',
    '&:hover': {
      borderBottom: `1px solid #3A244A`,
    },
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    backgroundColor: 'white',
    color: isSelected ? '#3A244A' : '#000',
    '&:hover': {
      backgroundColor: '#3A244A',
      color: 'white',
    },
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '10px',
    overflow: 'hidden',
  }),
};

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [conPassword, setConPassword] = useState<string>('');
  const [contactMode, setContactMode] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [passEye, setPassEye] = useState<boolean>(false);
  const [conPassEye, setConPassEye] = useState<boolean>(false);

  const [isOTPForm, setIsOTPForm] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [serverOtp, setServerOtp] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      email &&
      firstName &&
      lastName &&
      password &&
      conPassword &&
      contactMode
    ) {
      if (password === conPassword) {
        const response = await fetch(
          'https://entry-guard.onrender.com/user/otp',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              firstname: firstName,
            }),
          }
        );

        const data = await response.json();
        const otp = data.otp;

        if (otp) {
          toast.success('OTP sent successfully. Please check your email.');
          setServerOtp(String(otp));
          setIsOTPForm(true);
        } else {
          toast.error('Failed to send OTP. Email might already exist!');
        }
      } else {
        toast.warn("Passwords doesn't match!");
      }
    } else {
      toast.warn('All Fields are required!');
    }
  };

  const handleOTPSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp && otp.length === 6) {
      if (otp === serverOtp) {
        const response = await fetch('https://entry-guard.onrender.com/user/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
            contactMode,
          }),
        });

        const data = await response.json();
        toast.success(data.msg);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate('/user-profile');
      } else {
        toast.warn("Sorry! your otp doesn't match. Please try again.");
      }
    } else {
      toast.warn('Please insert the OTP.OTP must contain 6 digits');
    }
  };

  return (
    <section className="py-12 md:py-20 min-h-screen flex justify-center items-center">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-20">
          {/* image container */}
          <div className="flex justify-center items-center order-2 lg:order-1">
            <img
              src={SignUpImage}
              alt="sign up image"
              className="max-w-full h-auto"
            />
          </div>

          {/* sign up form container */}
          {!isOTPForm && (
            <div className="order-1 flex justify-center items-center">
              <div className="border border-gray-200 rounded-2xl shadow_light p-8 md:p-12 2xl:ml-20 w-full">
                {/* heading */}
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 items-center justify-between text-primary">
                  <h4 className="font-black text-4xl sm:text-5xl">
                    Let us know <span className="text-secondary">!</span>
                  </h4>
                  <Link
                    to="/sign-in"
                    className="font-bold text-xl sm:text-2xl underline"
                  >
                    Sign <span className="text-secondary underline">In</span>
                  </Link>
                </div>

                {/* form */}
                <form
                  className="flex flex-col gap-y-5 mt-12"
                  onSubmit={handleSubmit}
                >
                  {/* first name */}
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input_style"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  {/* last name */}
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input_style"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />

                  {/* password */}
                  <div className="relative">
                    <input
                      type={passEye ? 'text' : 'password'}
                      placeholder="Set Password"
                      className="input_style"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <img
                      src={passEye ? EyeOpen : EyeClose}
                      alt=""
                      className="w-8 h-8 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setPassEye((prev) => !prev)}
                    />
                  </div>

                  {/* confirm password */}
                  <div className="relative">
                    <input
                      type={conPassEye ? 'text' : 'password'}
                      placeholder="Retype Password"
                      className="input_style"
                      value={conPassword}
                      onChange={(e) => setConPassword(e.target.value)}
                    />
                    <img
                      src={conPassEye ? EyeOpen : EyeClose}
                      alt=""
                      className="w-8 h-8 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setConPassEye((prev) => !prev)}
                    />
                  </div>

                  {/* contact mode */}

                  <select
                    className="input_style"
                    value={contactMode}
                    onChange={(e) => setContactMode(e.target.value)}
                  >
                    <option defaultChecked hidden>
                      Contact Mode
                    </option>
                    {contactModeOptions.map((item, i) => (
                      <option key={i}>{item}</option>
                    ))}
                  </select>

                  {/* email */}
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="input_style"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {/* submit button */}
                  <button
                    type="submit"
                    className="bg-primary py-4 text-xl font-semibold w-full text-white rounded-2xl hover:bg-secondary duration-300 mt-3"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* otp form container */}
          {isOTPForm && (
            <div className="order-1 flex justify-center items-center">
              <div className="relative border border-gray-200 rounded-2xl shadow_light p-8 md:p-12 2xl:ml-20 w-full">
                {/* heading */}
                <div className="text-center">
                  <span
                    className="absolute top-8 left-8 text-start cursor-pointer w-8 h-8 rounded flex justify-center items-center bg-secondary text-white hover:bg-opacity-90"
                    onClick={() => setIsOTPForm(false)}
                  >
                    <FaArrowLeft />
                  </span>

                  <h4 className="text-primary text-center font-black text-4xl sm:text-5xl mt-12">
                    Enter Your OTP <span className="text-secondary">!</span>
                  </h4>
                  <p className="opacity-75 mt-4">
                    Please check your email to get the OTP.
                  </p>
                </div>

                {/* otp form */}
                <form className="mt-12" onSubmit={handleOTPSubmit}>
                  <input
                    type="number"
                    placeholder="Enter OTP"
                    className="input_style"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  {/* submit button */}
                  <button
                    type="submit"
                    className="bg-primary py-4 text-xl font-semibold w-full text-white rounded-2xl hover:bg-secondary duration-300 mt-6"
                  >
                    Verify OTP
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignUp;
