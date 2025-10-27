import CategoryCard from './catCard';
import { useContext, useEffect, useState } from 'react';
import { apiCats } from 'api/api';
import type { ICardItem, ICategoryFromAPI } from '~/@types';
import { mapCategoriesToCardItems } from './cats.utils';
import { toast } from 'sonner';
import FullPageLoader from '~/_components/full-page-loader/fullPageLoader';
import { CategoryContext } from '~/provider/category/categoryContext';

const AllCats = () => {
  const [cats, setAPICats] = useState<ICardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {setCats} = useContext(CategoryContext);
  useEffect(() => {
    
    let ignore = false;


    const load = async () => {
      try {
        setLoading(true);

        const { data } = await apiCats.get<ICategoryFromAPI[]>(
          "/categories",
        );

        const mapped = mapCategoriesToCardItems(Array.isArray(data) ? data : []);
        const top10 = mapped.slice(0, 11); 

        if (!ignore) {
          setAPICats(top10);
          setCats(data)
        }

      } catch (err) {

        toast.error(`Failed to load categories`);

      } finally {

        if (!ignore) setLoading(false);

      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        {loading && (
          <FullPageLoader />
        )}
      <div className="max-w-7xl mx-auto">
        <h2 className="font-poppins font-bold text-4xl text-center mb-12 text-gray-900">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {cats.map((category, index) => (  
            <CategoryCard
              key={index}
              Icon={category.Icon}
              title={category.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCats;