import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Select, { StylesConfig } from 'react-select';

import SignUpImage from '/assets/sign-up.png';
import EyeOpen from '/assets/eye-open.png';
import EyeClose from '/assets/eye-close.png';

const contactModeOptions = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
];

const selectStyles: StylesConfig = {
  control: (styles, { isFocused }) => ({
    ...styles,
    border: '0',
    borderRadius: '0',
    borderBottom: `1px solid ${isFocused ? '#3A244A' : '#e5e7eb'}`,
    transition: 'border-color 0.2s ease',

    boxShadow: 'none',
    '&:hover': {
      borderBottom: `1px solid #3A244A`,
    },
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    backgroundColor: 'white',
    color: isSelected && '#3A244A',
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

const SignUp = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [conPassword, setConPassword] = useState<string>('');
  const [contactMode, setContactMode] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [passEye, setPassEye] = useState<boolean>(false);
  const [conPassEye, setConPassEye] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(firstName, lastName, password, conPassword, contactMode, email);
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

          {/* form container */}
          <div className="border border-gray-200 rounded-2xl shadow_light p-8 md:p-12  order-1 2xl:ml-20">
            {/* heading */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 items-center justify-between text-primary">
              <h4 className="font-black text-4xl sm:text-5xl">
                Let us know <span className="text-secondary">!</span>
              </h4>
              <Link to="/" className="font-bold text-xl sm:text-2xl underline">
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
                required
              />

              {/* last name */}
              <input
                type="text"
                placeholder="Last Name"
                className="input_style"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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

              {/* confirm password */}
              <div className="relative">
                <input
                  type={conPassEye ? 'text' : 'password'}
                  placeholder="Retype Password"
                  className="input_style"
                  value={conPassword}
                  onChange={(e) => setConPassword(e.target.value)}
                  required
                />
                <img
                  src={conPassEye ? EyeOpen : EyeClose}
                  alt=""
                  className="w-8 h-8 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setConPassEye((prev) => !prev)}
                />
              </div>

              {/* contact mode */}
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue="Contact Mode"
                name="contact-mode"
                options={contactModeOptions}
                styles={selectStyles}
                onChange={(e) => setContactMode(e.value)}
                required
              />

              {/* email */}
              <input
                type="email"
                placeholder="Enter Email"
                className="input_style"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
      </div>
    </section>
  );
};

export default SignUp;
