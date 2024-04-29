import { FormEvent, useEffect, useState } from 'react';

import heroBg from '/assets/user-header-bg.webp';
import EyeOpen from '/assets/eye-open.png';
import EyeClose from '/assets/eye-close.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactMode: string;
}

const UserProfile = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const [passEye, setPassEye] = useState<boolean>(false);
  const [newPassEye, setNewPassEye] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUserData(user);
    }
  }, []);

  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentPassword && newPassword) {
      if (currentPassword !== newPassword) {
        const response = await fetch(
          'https://entry-guard.onrender.com/user/change-password',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              _id: userData?._id,
              currentPassword,
              newPassword,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setCurrentPassword('');
          setNewPassword('');
          toast.success('Password changed successfully!');
        } else {
          toast.error(data?.msg);
        }
      } else {
        toast.warn('Both password are same');
      }
    } else {
      toast.warn('Please fill up the fields!');
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Logged Out Successfully!');
    navigate('/sign-in');
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

      {userData && (
        <div className="container px-4 mx-auto -mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-12">
            <div className="col-span-1 lg:col-span-2 border border-gray-200 rounded-2xl shadow_light p-8 md:p-12 bg-white">
              <div className="flex justify-between items-center pb-4">
                <h5 className="text-2xl font-medium">My account</h5>
                <button
                  className="bg-primary text-white font-medium py-2 px-4 rounded-md hover:bg-secondary duration-300"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>

              <div className="mt-6">
                <h5 className="text-gray-700 font-medium text-center text-2xl">
                  Personal Infromation
                </h5>

                <div className="grid sm:grid-cols-2 justify-between items-center gap-4 mt-6 max-w-2xl mx-auto xl:pl-20">
                  <p className="text-lg font-medium">
                    <span className="text-secondary capitalize">
                      Firstname:
                    </span>{' '}
                    {userData?.firstName}
                  </p>
                  <p className="text-lg font-medium">
                    <span className="text-secondary capitalize">LastName:</span>{' '}
                    {userData?.lastName}
                  </p>
                  <p className="text-lg font-medium">
                    <span className="text-secondary">Email:</span>{' '}
                    {userData?.email}
                  </p>
                  <p className="text-lg font-medium">
                    <span className="text-secondary capitalize">
                      Contact Type:
                    </span>{' '}
                    {userData?.contactMode}
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
                onSubmit={handleUpdatePassword}
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
      )}
    </section>
  );
};

export default UserProfile;
