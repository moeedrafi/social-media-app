"use client";

import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-blue-500 text-white p-2 mt-2 rounded-md disabled:bg-opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;
