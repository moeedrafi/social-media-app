import Image from "next/image";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg text-sm">
      <div className="flex justify-between items-center text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image
          src="/more.png"
          width={16}
          height={16}
          alt="more"
          className="w-4 h-4 cursor-pointer"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/23193135/pexels-photo-23193135.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/23193135/pexels-photo-23193135.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6 rounded-lg object-cover"
          />
          <span className="text-blue-500 font-medium">BigChef Lounge</span>
        </div>

        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            : size === "md"
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit."}
        </p>

        <button className="p-2 bg-gray-200 text-gray-500 text-xs rounded-lg">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Ad;
