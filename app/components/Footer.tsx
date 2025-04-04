
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              E-Shop
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-blue-500">
              Products
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-blue-500">
              Cart (0)
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;