import Header from "../(website)/components/layouts/header";
import Footer from "../(website)/components/layouts/footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}