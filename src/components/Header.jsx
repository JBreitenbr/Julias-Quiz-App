import Giulietta from "../assets/Giulietta.png"; // Import the image
import "../App.css";
function Header() {
  return (
    <header className="flex flex-col items-center justify-items-center py-4">
      <img className="h-20 w-20" src={Giulietta} alt="Giulietta" />
      <h1 className="my-4 text-2xl h-8">Julias Quiz App</h1>
    </header>
  );
}

export default Header;