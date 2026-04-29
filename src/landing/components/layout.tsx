import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";

export default function LandingLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}