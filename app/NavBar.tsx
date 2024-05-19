"use client";
import Link from "next/link";
import React from "react";
import { VscIssueReopened } from "react-icons/vsc";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const currentPath = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <VscIssueReopened />
      </Link>

      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            className={classNames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover: text-zinc-800 transition-colors": true,
            })}
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
