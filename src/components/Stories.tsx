import Image from "next/image";

const Stories = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide ">
      <div className="flex gap-8 w-max">
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="/noCover.png"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Add a Story</span>
        </div>
      </div>
    </div>
  );
};

export default Stories;
