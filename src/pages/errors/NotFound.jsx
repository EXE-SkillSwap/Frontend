import notfound from "@/assets/notfoundpage.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate();
  return (
    <div className="boxShadow px-10 w-full lg:flex-row gap-[30px] lg:gap-0 flex-col flex items-center justify-evenly py-20 rounded-xl">
      <div className="w-[80%] lg:w-[40%]">
        <img src={notfound} alt="illustration" className="w-full" />
      </div>

      <div className="w-full lg:w-[30%] text-center lg:text-start">
        <h1 className="text-[2.5rem] dark:text-{#abc2d3] sm:text-[4rem] font-[800] text-indigo-600 leading-[80px]">
          Ô Mai Gót!!!
        </h1>

        <h3 className="text-indigo-600 dark:text-slate-400 text-[0.9rem] sm:text-[1.2rem]">
          Không tìm thấy trang
        </h3>

        <button
          className="py-3 px-6 sm:px-8 text-[0.9rem] sm:text-[1rem] rounded-full bg-indigo-400 text-white mt-8"
          onClick={() => nav(-1)}
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default NotFound;
