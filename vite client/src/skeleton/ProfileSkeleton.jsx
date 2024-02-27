import React from "react";
import Skeleton from "react-loading-skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="py-10 profile_div_main">
      <div className="profile_div flex flex-col items-center justify-center">
        <Skeleton className="h-48 w-48" circle />
        <Skeleton className="h-12 w-72 md:w-96" />
        <Skeleton className="h-12 w-72 md:w-96" />
        <Skeleton className="h-12 w-72 md:w-96" />
        <Skeleton className="h-12 w-72 md:w-96" />
        <Skeleton className="h-12 w-72 md:w-96" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
