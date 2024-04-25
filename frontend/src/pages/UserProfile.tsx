import { FormEvent, useState } from 'react';

import heroBg from '/assets/user-header-bg.webp';
import EyeOpen from '/assets/eye-open.png';
import EyeClose from '/assets/eye-close.png';

const UserProfile = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const [passEye, setPassEye] = useState<boolean>(false);
  const [newPassEye, setNewPassEye] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(currentPassword, newPassword);
  };
  return (
    <section>
      <div
        className="min-h-[60vh] flex justify-center items-center bg-cover bg-center bg-no-repeat w-full"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white">
          Your Profile
        </h1>
      </div>

      <div className="container px-4 mx-auto -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-12">
          <div className="col-span-1 lg:col-span-2 border border-gray-200 rounded-2xl shadow_light p-8 md:p-12 bg-white">
            <div className="flex justify-between items-center pb-4">
              <h5 className="text-2xl font-medium">My account</h5>
              <button className="bg-primary text-white font-medium py-2 px-4 rounded-md hover:bg-secondary duration-300">
                Logout
              </button>
            </div>

            <div className="mt-6">
              <h5 className="text-gray-700 font-medium text-center text-2xl">
                Personal Infromation
              </h5>

              <div className="grid sm:grid-cols-2 justify-between items-center gap-4 mt-6 max-w-2xl mx-auto xl:pl-20">
                <p className="text-lg font-medium">
                  <span className="text-secondary">Firstname:</span> Shafayetur
                </p>
                <p className="text-lg font-medium">
                  <span className="text-secondary">LastName:</span> Rahman
                </p>
                <p className="text-lg font-medium">
                  <span className="text-secondary">Email:</span>{' '}
                  11shafayet@gmail.com
                </p>
                <p className="text-lg font-medium">
                  <span className="text-secondary">Contact Type:</span> Email
                </p>
              </div>
            </div>
          </div>

          {/* change password */}
          <div className="col-span-1 border border-gray-200 rounded-2xl shadow_light p-8 md:p-12 bg-white">
            <h4 className="text-center text-2xl font-bold text-primary">
              Change Password
            </h4>
            <form
              className="flex flex-col gap-y-5 mt-12"
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <input
                  type={passEye ? 'text' : 'password'}
                  placeholder="Current Password"
                  className="input_style"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <img
                  src={passEye ? EyeOpen : EyeClose}
                  alt=""
                  className="w-8 h-8 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setPassEye((prev) => !prev)}
                />
              </div>

              {/* new password */}
              <div className="relative">
                <input
                  type={newPassEye ? 'text' : 'password'}
                  placeholder="New Password"
                  className="input_style"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <img
                  src={newPassEye ? EyeOpen : EyeClose}
                  alt=""
                  className="w-8 h-8 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setNewPassEye((prev) => !prev)}
                />
              </div>

              {/* submit button */}
              <button
                type="submit"
                className="bg-primary py-4 text-xl font-semibold w-full text-white rounded-2xl hover:bg-secondary duration-300 mt-3"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
