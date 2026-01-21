import { useContext, useEffect, useState } from 'react'
import ProductListItem from '../components/ProductListItem'
import StatsCard from '../components/StatsCard';
import { ThemeContext } from '../provider/ThemeContext';
import useProducts from '../hooks/useProducts';
import useProductCategories from '../hooks/useProductCategories';
import ErrorCard from '../components/ErrorCard';


function Home() {
  const { theme } = useContext(ThemeContext)
  const { products, status: productsStatus, error: productsError, fetchProducts } = useProducts()
  const { productsCategory, fetchProductCategories } = useProductCategories()
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");
  const [debounceSearch, setDebounceSearch] = useState(search);

  useEffect(() => {
    const fetch = async () => {
      await fetchProductCategories()
    }
    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      await fetchProducts(debounceSearch, filter)
    }
    fetch()
  }, [debounceSearch, filter])

  const handleSearch = (e: any) => {
    if (e.target.value != "" || e.target.value != null) {
      setFilter("All")
    }
    setSearch(e.target.value)
  }

  const handleFilter = (e: any) => {
    if (e.target.value != "All" || e.target.value != null) {
      setSearch("")
    }
    setFilter(e.target.value)
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  return (
    <>
      <div className="w-full max-w-md mx-auto mt-4">
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 ">
            <input
              id="search"
              type="text"
              name="search"
              placeholder="Search Products..."
              value={search}
              onChange={handleSearch}
              className="block text-black min-w-0 grow py-1.5 pr-3 pl-1 text-base placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
            />
            <div className="grid shrink-0 grid-cols-1 focus-within:relative">
              <select
                id="currency"
                name="currency"
                aria-label="Currency"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-700 py-1.5 pr-7 pl-3 text-base text-gray-400 *:bg-gray-800 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                onChange={handleFilter}
                value={filter}
              >
                <option>All</option>
                {
                  productsCategory.map((a: any, index: any) =>
                    <option key={index}>{a}</option>
                  )
                }
              </select>
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                data-slot="icon"
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
              >
                <path
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {
        productsStatus == "loading" ?
          <div
            className="inline-block h-32 w-32 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-black"
            role="status"
          >
          </div>
          :
          productsStatus == "error" ?
            <ErrorCard errorMessage={productsError} />
            :
            products.length <= 0 ?
              <ErrorCard errorMessage={"No Products found"} />
              :
              <>
                <h1 className={`${theme == "light" ? "text-black" : "text-gray-300"} text-4xl ml-8 font-bold ml-2`}>Products</h1>

                <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 mt-4 mx-8">
                  {
                    products.map((product: any) => {
                      return <ProductListItem id={product.id} name={product.title} price={product.price} quantity={product.stock} category={product.category} key={product.id} />
                    })
                  }
                </div>

                <div className='bg-gray-300 mt-8 py-4'>
                  <h1 className='text-4xl mx-8 font-bold' >Inventory Stats</h1>
                  <div className='grid md:grid-cols-3 gap-4 sm:grid-cols-1 mt-4 pb-4 mx-8'>
                    <StatsCard title='Total Products' body={`${products.length}`} />
                    <StatsCard title='Total Inventory' body={`${products.length > 0 ? products.reduce((acc: number, product: any) => acc + product.stock, 0) : 0}`} />
                    <StatsCard title='Total Inventory value' body={`${products.length > 0 ? products.reduce((acc: number, product: any) => acc + (product.stock * product.price), 0) : 0}`} />
                  </div>
                </div>
              </>
      }
    </>
  )
}

export default Home
