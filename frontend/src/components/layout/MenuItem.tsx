import classNames from "classnames";
import { Link } from "react-router-dom";
import { MenuItemProps } from "./LeftSideBar";

export const MenuItem = ({ color, icon: Icon, label, to }: MenuItemProps) => {
  const colorSchema: any = {
    blue: { main: 'bg-blue-100 hover:bg-blue-300', icon: 'text-blue-700 bg-blue-200', title: 'text-blue-700' },
    red: { main: 'bg-red-100 hover:bg-red-300', icon: 'text-red-700 bg-red-200', title: 'text-red-700' },
    green: { main: 'bg-green-100 hover:bg-green-300', icon: 'text-green-700 bg-green-200', title: 'text-green-700' },
    yellow: { main: 'bg-yellow-100 hover:bg-yellow-300', icon: 'text-yellow-700 bg-yellow-200', title: 'text-yellow-700' },
    purple: { main: 'bg-purple-100 hover:bg-purple-300', icon: 'text-purple-700 bg-purple-200', title: 'text-purple-700' },
    pink: { main: 'bg-pink-100 hover:bg-pink-300', icon: 'text-pink-700 bg-pink-200', title: 'text-pink-700' },
    gray: { main: 'bg-gray-100 hover:bg-gray-300', icon: 'text-gray-700 bg-gray-200', title: 'text-gray-700' },
    teal: { main: 'bg-teal-100 hover:bg-teal-300', icon: 'text-teal-700 bg-teal-200', title: 'text-teal-700' },
    violet: { main: 'bg-violet-100 hover:bg-violet-300', icon: 'text-violet-700 bg-violet-200', title: 'text-violet-700' },
  };
  return (
    <>
      <Link to={to} className={classNames('rounded-lg transition-colors ease-in-out duration-400 py-3 px-4 hover:shadow-md shadow-sm focus:shadow-sm', colorSchema[color].main)}>
        <BUtton className='flex items-center gap-4'>
          <div className="relative">
            {/* <div className="absolute top-0 rounded-full animate-ping animate-infinite opacity-50 w-full h-full border bg-gray-50"></div> */}
            <Icon className={classNames('w-12 h-12 rounded-full p-2', colorSchema[color].icon)} />
          </div>
          <span className={classNames('text-center w-full text-2xl whitespace-nowrap', colorSchema[color].title, 'font-bold tracking-[1rem]')}>{label}</span>
        </BUtton>
      </Link>
    </>
  );
};
