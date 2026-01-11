import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { dummyPublishedCreationData } from "../assets/assets";
import { Heart } from "lucide-react";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    if (user) fetchCreations();
  }, [user]);

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-xl font-semibold">Creations</h1>

      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll p-4">
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            xl:grid-cols-4 
            gap-5
          "
        >
          {creations.map((creation, index) => (
            <div
              key={index}
              className="relative group w-full aspect-4/3 rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={creation.content}
                alt=""
                className="w-full h-full object-cover"
              />

              <div
                className="
                  absolute inset-0
                  flex gap-2 items-end justify-end
                  group-hover:justify-between
                  p-3
                  group-hover:bg-linear-to-b
                  from-transparent to-black/80
                  text-white
                "
              >
                <p className="text-sm hidden group-hover:block line-clamp-2">
                  {creation.prompt}
                </p>

                <div className="flex gap-1 items-center">
                  <p>{creation.likes.length}</p>
                  <Heart
                    className={`min-w-5 h-5 hover:scale-110 transition cursor-pointer ${
                      creation.likes.includes(user.id)
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
