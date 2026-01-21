import { useContext, useEffect, useState } from 'react'
// import './App.css'
import Navbar from '../components/Navbar'
import ProductListItem from '../components/ProductListItem'
import { v4 as uuidv4 } from 'uuid';
import StatsCard from '../components/StatsCard';
import TextInput from '../components/TextInput';
import Modal from '../components/Modal';
import { ThemeContext } from '../provider/ThemeContext';
import useProducts from '../hooks/useProducts';
import useProductCategories from '../hooks/useProductCategories';
import ErrorCard from '../components/ErrorCard';
import { CartContext } from '../provider/CartContext';


function Home() {
  // const [products, setProducts] = useState<Array<{
  //   id: string,
  //   name: string,
  //   price: number,
  //   category: string,
  //   quantity: number
  // }>>([]);

  // const [displayProducts, setDisplayProducts] = useState<Array<{
  //   id: string,
  //   name: string,
  //   price: number,
  //   category: string,
  //   quantity: number
  // }>>([]);

  // const [newProduct, setNewProduct] = useState<{
  //   name: string,
  //   price: number,
  //   category: string,
  //   quantity: number
  // }>({
  //   name: "",
  //   price: 0,
  //   category: "",
  //   quantity: 0
  // });

  // const [newProductError, setNewProductError] = useState<{
  //   name: string,
  //   price: string,
  //   category: string,
  //   quantity: string
  // }>({
  //   name: "",
  //   price: "",
  //   category: "",
  //   quantity: ""
  // });

  // const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editProductId, setEditProductId] = useState<string>("");



  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  const { theme } = useContext(ThemeContext)
  const { products, status: productsStatus, error: productsError, fetchProducts } = useProducts()
  const { productsCategory, fetchProductCategories } = useProductCategories()
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    const fetch = async () => {
      await fetchProductCategories()
    }
    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      await fetchProducts(search, filter)
    }
    fetch()
  }, [search, filter])

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

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   const name = newProduct.name.trim();
  //   const price = Number(newProduct.price);
  //   const category = newProduct.category.trim().toLowerCase();
  //   const quantity = Number(newProduct.quantity);
  //   let error = false;
  //   setNewProductError({
  //     name: "",
  //     price: "",
  //     category: "",
  //     quantity: ""
  //   })
  //   if (name == "") {
  //     setNewProductError((error) => { return { ...error, name: "Product name is required" } })
  //     error = true;
  //   }
  //   if (products.find((ps) => ((ps.name == name && (showEditModal ? ps.id!=editProductId: true))))) {
  //     setNewProductError((error) => { return { ...error, name: "Product with this name already exist" } })
  //     error = true;
  //   }
  //   if (price == 0) {
  //     setNewProductError((error) => { return { ...error, price: "Product price is required" } })
  //     error = true;
  //   }
  //   if (category == "") {
  //     setNewProductError((error) => { return { ...error, category: "Product category is required" } })
  //     error = true;
  //   }
  //   if (!error) {
  //     if (showEditModal) {
  //       setProducts(ps => {
  //         const newProducts: typeof products =ps.map(product => product.id==editProductId ? {...product, name: name, price: price, category: category, quantity: quantity} : product)
  //         localStorage.setItem('products', JSON.stringify(newProducts))
  //         return newProducts
  //       })
  //       setNewProduct({ name: "", price: 0, category: "", quantity: 0 })
  //       setNewProductError({ name: "", price: "", category: "", quantity: "" })
  //       setShowEditModal(false);
  //       setEditProductId("");
  //     } else {
  //       setProducts((ps) => {
  //         const newProducts: typeof products = [...ps, { id: uuidv4(), name: name, price: price, category: category, quantity: quantity }]
  //         localStorage.setItem('products', JSON.stringify(newProducts))
  //         return newProducts
  //       })
  //       setNewProduct({ name: "", price: 0, category: "", quantity: 0 })
  //       setNewProductError({ name: "", price: "", category: "", quantity: "" })
  //       setShowModal(false);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   const productsList = localStorage.getItem("products")
  //   if (productsList) {
  //     setProducts(JSON.parse(productsList));
  //   }
  // }, [])

  // useEffect(() => {
  //   setDisplayProducts([...products])
  // }, [products])

  // useEffect(() => {
  //   const searchTerm = search.trim().toLowerCase();
  //   const filterValue = filter.toLowerCase();
  //   if ((filterValue != "all" && filterValue != "") || searchTerm!="") {
  //     setDisplayProducts([...products.filter((p) => p.category.toLowerCase() == filterValue || p.name.toLowerCase().includes(searchTerm) || p.category.toLowerCase().includes(searchTerm))])
  //   } else {
  //     setDisplayProducts([...products])
  //   }
  // }, [products, search, filter])

  // const handleAddProductClick = () => {
  //   setShowModal(true)
  // }

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setShowEditModal(false);
  //   setEditProductId("");
  //   setNewProduct({
  //     name: "",
  //     price: 0,
  //     category: "",
  //     quantity: 0
  //   })
  //   setNewProductError({
  //     name: "",
  //     price: "",
  //     category: "",
  //     quantity: ""
  //   })
  // }

  // const handleDelete = (id:string) => {
  //   console.log("id");
  //   console.log(id);

  //   // setProducts((products)=>products.filter((product)=>product.id!=id))
  //   setProducts((products) => {
  //       const newProducts: typeof products = products.filter((product)=>product.id!=id)
  //       localStorage.setItem('products', JSON.stringify(newProducts))
  //       return newProducts
  //     })
  // }

  // const handleEdit = (id:string) => {
  //   setShowEditModal(true);
  //   setEditProductId(id);
  //   const productToEdit = products.find(product=>product.id==id)
  //   if (productToEdit) {
  //     setNewProduct({
  //       name: productToEdit.name,
  //       price: productToEdit.price,
  //       category: productToEdit.category,
  //       quantity: productToEdit.quantity,
  //     })
  //   }
  // }
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

                {/* <div className="max-w-sm mx-auto py-5">
          <h1 className='text-4xl font-bold'>Product Details</h1>
          <TextInput
            name="name"
            labelText="Name"
            value={newProduct.name}
            type="text"
            error={newProductError.name}
            onChange={handleValueChange}
          />
          <TextInput
            name="price"
            labelText="Price"
            value={newProduct.price}
            type="number"
            error={newProductError.price}
            onChange={handleValueChange}
          />
          <TextInput
            name="category"
            labelText="Category"
            value={newProduct.category}
            type="text"
            error={newProductError.category}
            onChange={handleValueChange}
          />
          <TextInput
            name="quantity"
            labelText="Quantity"
            value={newProduct.quantity}
            type="text"
            error={newProductError.quantity}
            onChange={handleValueChange}
          />
          <button
            type="submit"
            className="text-white bg-gray-800 box-border border border-transparent hover:bg-brand-strong shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none cursor-pointer rounded"
            onClick={handleSubmit}
          >
            Add Product
          </button>
        </div> */}
              </>
      }
    </>
  )
}

export default Home
