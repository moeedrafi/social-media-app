"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { User } from "@prisma/client";

import { updateProfile } from "@/lib/actions";
import UpdateButton from "@/components/rightMenu/UpdateButton";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";

const UpdateUser = ({ user }: { user: User }) => {
  const [cover, setCover] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    if (state.success) router.refresh();
  };

  return (
    <div>
      <span
        onClick={() => setOpen(true)}
        className="text-blue-500 text-xs cursor-pointer"
      >
        Update
      </span>

      {open && (
        <div className="absolute h-screen w-full top-0 left-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <form
            action={(formData) =>
              formAction({ formData, cover: cover?.secure_url || "" })
            }
            className="relative bg-white p-7 rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-[40%]"
          >
            <h1 className="text-gray-500">Update Profile</h1>
            <div className="text-xs text-gray-500">
              Use the navbar profile to change the avatar or username.
            </div>

            {/* COVeR PIC UPLOAD */}
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => {
                return (
                  <div
                    onClick={() => open()}
                    className="flex flex-col gap-4 my-4"
                  >
                    <label>Cover Picture</label>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Image
                        src={user.cover || "/noCover.png"}
                        alt=""
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <span className="text-xs underline text-gray-600">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            {/* INPUT */}
            <div className="mt-4 flex flex-wrap justify-between gap-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">First Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder={user.name || "John"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">Surname</label>
                <input
                  type="text"
                  name="surname"
                  placeholder={user.surname || "Doe"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder={user.description || "Life is beautiful..."}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder={user.city || "New York"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">School</label>
                <input
                  type="text"
                  name="school"
                  placeholder={user.school || "MIT"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">Work</label>
                <input
                  type="text"
                  name="work"
                  placeholder={user.work || "Apple Inc."}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">Website</label>
                <input
                  type="text"
                  name="website"
                  placeholder={user.website || "mmr.dev"}
                  className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
                />
              </div>
            </div>

            {/* UPDATe BUTTON */}
            <UpdateButton />

            {state.success && (
              <span className="text-green-500 text-center">
                Profile has been updated!
              </span>
            )}
            {state.error && (
              <span className="text-red-500 text-center">
                Something went wrong!
              </span>
            )}

            <button
              onClick={handleClose}
              className="absolute top-3 right-5 text-blue-500 text-xl cursor-pointer"
            >
              X
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
