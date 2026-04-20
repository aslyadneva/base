export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f6f3] flex items-center justify-center p-10">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
