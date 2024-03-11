import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function Main({ Children }) {
  //TO BE FIXED THE FOOTER AT THE BOTTOM OF THE PAGE
  let digit = -screen.height;
  const styleFooter = {
    bottom: digit + "%",
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="lg:pt-20 " style={{ minHeight: "700px" }}>
          {Children}
        </div>
        <Footer />
      </div>
    </>
  );
}
