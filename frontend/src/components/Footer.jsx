import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-3">
              <ShoppingBag className="h-6 w-6 text-primary-400" />
              <span className="text-lg font-bold text-white">BabbaFly</span>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Your trusted marketplace for buying and selling. Discover amazing 
              products and connect with sellers in your community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="hover:text-primary-400 transition-colors">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-primary-400 transition-colors">
                  Create Listing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-6 pt-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} BabbaFly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
