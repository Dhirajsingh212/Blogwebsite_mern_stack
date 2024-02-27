import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";

const BlogSkeleton = () => {
  const { blogs } = useSelector((state) => state.blogReducer);
  return (
    <div className="max-md:px-4 max-sm:py-20 py-28 gap-5 grid lg:grid-cols-3 lg:px-20 md:grid-cols-2 md:px-10">
      {blogs.length > 0
        ? blogs.map((e, index) => {
            return <BlogSkeletonCard key={index} />;
          })
        : null}
    </div>
  );
};

export default BlogSkeleton;

export const BlogSkeletonCard = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-60 rounded-md" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="w-1/2" />
        <Skeleton className="" />
      </div>
      <div>
        <Skeleton count={6} className="" />
      </div>
    </div>
  );
};
