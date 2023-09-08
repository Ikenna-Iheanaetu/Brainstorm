import "@/styles/global.css";
import { Providers } from "@/redux/provider";
import Sessionprovider from "@/components/Sessionprovider";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Brain Storm",
  description:
    "A quiz application made for practice questions to be set for you to text your knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <Sessionprovider>
          <body className="bg-base-background">
            <main className="app">
              <Nav />
              {children}
            </main>
          </body>
        </Sessionprovider>
      </Providers>
    </html>
  );
}
