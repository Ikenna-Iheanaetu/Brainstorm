"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Logo from "@/public/logo.png";

const Nav = () => {
  const { data: session } = useSession();
  console.log(session);

  const [providers, setProviders] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    async function fetchProviders() {
      const res = await getProviders();
      setProviders(res);
      console.log(res);
    }
    fetchProviders();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="flex justify-between w-full mb-16 pt-3">
      <Link
        href="/"
        className="flex justify-between items-center gap-2 flex-center"
      >
        <Image
          src={Logo}
          alt="logo"
          width={50}
          height={50}
          className="object-contain"
        />
        <p className="logo_text">Brainstorm</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex items-center gap-3 md:gap-5">
            <Link href="/create-quiz" className="white_btn">
              Create quiz
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={40}
                height={40}
                className="rounded-full border-2 border-primary outline-none"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="white_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative items-center">
        {session?.user ? (
          <div className="flex">
            <div className="relative">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full border-2 border-primary outline-none"
                alt="profile"
                onClick={toggleDropdown}
              />

              {showDropdown && (
                <div className="dropdown" onClick={toggleDropdown}>
                  <Link href="/profile" className="dropdown_link">
                    My Profile
                  </Link>
                  <Link href="/create-quiz" className="dropdown_link">
                    Create Quiz
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="white_btn"
                >
                  Sign in
                </button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
