import { useContext } from 'react'
import { ThemeContext } from '../provider/ThemeContext'
import { CartContext } from '../provider/CartContext'
import { Link } from 'react-router-dom'

const Navbar = ({
}: {
  }) => {
  const { theme, setTheme } = useContext(ThemeContext)
  const { totalItemsInCart } = useContext(CartContext)
  const handleChangeTheme = (e: any) => {
    setTheme(e.target.checked ? "dark" : "light")
  }
  return (
    <nav className="relative bg-gray-800 dark:bg-gray-800 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to={"/"} className="flex shrink-0 items-center">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
                className="h-8 w-auto"
              />
              <span className={`${theme == "light" ? "text-black" : "text-white"} font-bold ml-2`}>Swift shop</span>
            </Link>
          </div>
          <div>
            <Link to={"/cart"} className='px-4 py-2 cursor-pointer rounded text-white'>Cart ({totalItemsInCart})</Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultValue=""
                className="sr-only peer"
                onChange={handleChangeTheme}
                checked={theme == "dark"}
              />
              <span className="text-white mr-2 select-none ms-3 text-sm font-medium text-heading">
                Dark Mode
              </span>
              <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none ring-2 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand" />
            </label>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
