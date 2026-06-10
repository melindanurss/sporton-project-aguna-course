export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F7F9FA] w-full min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
}