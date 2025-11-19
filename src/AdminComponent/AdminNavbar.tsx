import TopBar from "./AdminTopBar";
import NavigationMenu from "./AdminNavigationMenu";
import bgimage from "../assets/bgimage.svg";

const Navbar = () => {
  return (
    <div>
      <div
        className="bg-cover bg-center pb-6"
        style={{
          backgroundImage: `url(${bgimage})`,
        }}
      >
        <div className="h-10 w-full bg-primary" />

        <TopBar />

        <NavigationMenu />
      </div>
    </div>
  );
};

export default Navbar;
