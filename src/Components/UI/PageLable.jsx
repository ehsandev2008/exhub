import clsx from "clsx";

const PageLable = ({ lable, icon: Icon, className, bgColor, iconColor }) => {
  return (
    <div className={clsx("flex items-center gap-3 mb-6", className)}>
      <span className={`w-1.5 h-6 ${bgColor} rounded-full shadow-sm`}></span>

      <div className="flex items-center gap-2">
        <div className={`${iconColor}`}>{Icon}</div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
          {lable}
        </h1>
      </div>
    </div>
  );
};

export default PageLable;
