import React from "react";
import Skeleton from "react-loading-skeleton";

const MyBlogSkeleton = () => {
  return (
    <div className=" flex flex-col py-10 gap-5 lg:px-14">
      {[1, 2, 3, 4, 5, 6].map((e, index) => {
        return <MyBlogSkeletonCard />;
      })}
    </div>
  );
};

export default MyBlogSkeleton;

export const MyBlogSkeletonCard = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 lg:gap-5 lg:px-20 px-4">
      <div className="skeleton bg-[#2b323e] w-full h-96"></div>
      <div className="py-10 grid gap-2">
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-6">
          {[1, 2, 3, 4, 5].map((e, index) => {
            return <Skeleton key={index} />;
          })}
        </div>
        <Skeleton className="w-2/3" />
        <Skeleton count={8} />
      </div>
    </div>
  );
};
