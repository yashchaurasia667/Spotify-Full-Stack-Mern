import { useState } from "react";

import { IoIosClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";

import ArtistBar from "../global/ArtistBar";
import ArtistCard from "../global/ArtistCard";
import Track from "../global/Track";

const ProfileContent = () => {
  const [options, setOptions] = useState(false);
  const [currentPass, setCurrentPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");

  const checkPass = () => {
    const letterCheck = newPass.match(/[a-zA-Z]/);
    const numberCheck = newPass.match(/[\d\W]/);
    const lenCheck = newPass.length > 9;

    if (!(letterCheck && numberCheck && lenCheck)) {
      toast.error(
        "password must contain a letter, a digit or a special character and must have atleast 10 characters",
        {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        }
      );
      return false;
    }
    return true;
  };

  const changePass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkPass()) return;

    const res = await fetch("/api/auth/changepassword", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        current_password: currentPass,
        new_password: newPass,
      }),
    });

    if (res.status == 201) {
      toast.success("password changed", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setOptions(false);
    } else if (res.status == 401) {
      toast.error("Wrong password", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    } else {
      toast.error("Something went wrong", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        limit={1}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="light"
      />
      <dialog
        open={options}
        className="bg-[#12121288] w-full h-[100vh] z-[1000] top-0"
      >
        <div className="absolute bg-background-elevated-highlight w-1/3 min-h-[250px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-md">
          <div className="flex justify-between mb-4">
            <p className="text-[1.6rem] font-bold tracking-tight">
              Change Password
            </p>
            <button onClick={() => setOptions(false)}>
              <IoIosClose size={35} fill="#acacac" />
            </button>
          </div>
          <form onSubmit={changePass} className="flex gap-x-8 items-end">
            <div className="flex flex-col gap-y-4 w-[60%]">
              <input
                type="text"
                placeholder="Current password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                className="bg-[#3e3e3e] w-full rounded-md p-2 py-4 outline-none focus:border focus:border-[#acacac]"
              />
              <div>
                <input
                  type="text"
                  placeholder="New password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="bg-[#3e3e3e] w-full rounded-md p-2 py-4 outline-none focus:border focus:border-[#acacac]"
                />
                <p></p>
              </div>
            </div>
            <button
              type="submit"
              className="bg-white text-background-base font-medium rounded-full text-lg px-10 py-4"
            >
              Save
            </button>
          </form>
        </div>
      </dialog>

      <div className="main_content bg-background-base p-5 relative">
        <div className="absolute top-0 left-0 h-[35vh] w-full pointer-events-none bg-gradient-to-b from-[#a9b1c755] to-[#00000000]"></div>
        <div className="h-[60px]">
          <button
            className="text-text-subdued h-full"
            onClick={() => setOptions(true)}
          >
            • • •
          </button>
        </div>
        <div>
          <ArtistBar
            main={
              <>
                <p className="text-2xl font-bold hover:underline">
                  Top artists this month
                </p>
                <p className="text-sm text-text-subdued font-medium hover:no-underline">
                  Only visible to you
                </p>
              </>
            }
            side={"Show all"}
          />
          <div className="grid grid-cols-10 mt-3">
            <ArtistCard
              name="Ciggerates After Sex"
              type="Artist"
              img="artists/CAS.jpg"
              className="w-[200px]"
            />
          </div>
        </div>
        <div className="mt-4">
          <ArtistBar
            main={
              <>
                <p className="text-2xl font-bold hover:underline">
                  Top tracks this month
                </p>
                <p className="text-sm text-text-subdued font-medium hover:no-underline">
                  Only visible to you
                </p>
              </>
            }
            side={"Show all"}
          />
          <div className="mt-3">
            <Track
              track_id="asdfas"
              index={1}
              name="Lovers Rock"
              artist="TV Girl"
              cover="https://i.scdn.co/image/ab67616d00004851e1bc1af856b42dd7fdba9f84"
              album="French Exit"
              duration_ms={112341234}
            />
          </div>
        </div>
        <div className="mt-12">
          <p className="text-2xl font-bold hover:underline">Public Playlists</p>
          {/* {publicPlaylists} */}
        </div>
      </div>
    </>
  );
};

export default ProfileContent;
