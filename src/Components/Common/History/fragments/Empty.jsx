function Empty({ message = "در حال حاضر داده‌ای برای نمایش وجود ندارد" }) {
  return (
    <div className="flex items-center justify-center flex-col py-12 gap-5 select-none">
      <img
        className="w-20 h-20 object-contain opacity-85"
        src="/shopping bag-remove.png"
        alt="empty"
      />
      <span className="text-base sm:text-lg font-medium text-gray-500 text-center">
        {message}
      </span>
    </div>
  );
}

export default Empty;
