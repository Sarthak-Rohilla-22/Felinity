import { Link } from "react-router";

function Button({
  to,
  children,
  bgColor = "taupe-700",
  textColor = "white",
  className = "",
  type = "link",
}) {
  if (type === "link") {
    return (
      <Link
        to={to}
        className={
          `flex items-center gap-2 rounded-sm bg-${bgColor} px-5 py-3 font-cute font-medium text-${textColor} transition-all hover:bg-taupe-600 hover:scale-105 active:scale-95 cursor-pointer ` +
          className
        }
      >
        {children}
      </Link>
    );
  }
}

export default Button;
