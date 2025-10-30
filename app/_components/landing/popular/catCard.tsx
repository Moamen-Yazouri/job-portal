import { Box, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface IProps {

  Icon: LucideIcon;

  title: string;
}

const CategoryCard = ({ Icon, title }: IProps) => {
  return (
    <Link
      to={"/jobs/jobs-list"}
      state={{ cat: title }}
      aria-label={`Browse ${title} jobs`}
      className="block"
    >
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg hover:shadow-lg transition-shadow cursor-pointer border border-gray-100">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-teal-700" strokeWidth={1.5} />
        </div>
        <h3 className="font-poppins font-semibold text-lg text-gray-900 text-center">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
