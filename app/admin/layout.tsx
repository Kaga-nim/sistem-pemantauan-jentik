// Layout ini hanya membungkus halaman login (/admin)
// Halaman protected punya layout sendiri di (protected)/layout.tsx
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
