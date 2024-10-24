export const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full ">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-t-4 border-white rounded-full animate-spin" />
        <p className="text-white text-2xl mt-4 font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};
