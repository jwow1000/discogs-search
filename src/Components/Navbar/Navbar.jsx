import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ searchResults }) {
  const pages =
    searchResults.pagination.pages > 10 ? 10 : searchResults.pagination.pages;

  const navLinks = new Array(pages).fill("");
  

  return (
    <div id="theNavBar">
      <div id="navItems">
        {navLinks.map((e, i) => (
            <Link key={i} to={`/pages/${i + 1}`}>
              Page {i + 1}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Navbar;


