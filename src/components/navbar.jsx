import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import LogoSmall from "../assets/FelinitySmallLogo.png";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="h-20 border-b bg-[#FAF7F0] border-taupe-700">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={LogoSmall}
            alt="Felinity"
            className="h-14 w-auto shrink-0"
          />
        </Link>

        {/* Desktop Menu */}
        <NavMenu className="hidden lg:block" />

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <Link to="/profile">
              <Button
                className="rounded-md cursor-pointer bg-[#5C4634] hover:bg-[#4A3728] text-white 
                       font-medium px-7 py-5.5 text-[15px] font-serif shadow-sm"
              >
                Profile
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/signin">
                <Button
                  variant="outline"
                  className="rounded-md cursor-pointer border-2 border-[#5C4634] text-[#5C4634] hover:bg-[#EDE4D8] hover:text-[#4A3728] 
                       font-medium px-7 py-5 text-[15px] font-serif"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="rounded-md cursor-pointer bg-[#5C4634] hover:bg-[#4A3728] text-white 
                       font-medium px-7 py-5.5 text-[15px] font-serif shadow-sm"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}

          <div className="lg:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
