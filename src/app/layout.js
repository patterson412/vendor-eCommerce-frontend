import { ThemeProvider } from "@/providers/theme-provider";
import ReduxProvider from "@/providers/ReduxProvider";
import NavHeader from "@/components/NavHeader";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata = {
  title: "Vendor Portal",
  description: "Vendor Product management portal",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased dark:bg-dark">
        <ReduxProvider>
          <ThemeProvider>
            <NavHeader />
            {children}
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}