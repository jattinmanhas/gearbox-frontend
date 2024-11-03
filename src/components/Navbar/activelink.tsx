"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";
import classNames from "classnames";

type ActiveLinkProps = {
  activeClassName?: string;
  allowSubPath?: boolean;
  className?: string;
  href?: string;
  clickHandler?: () => void;
};

export default function ActiveLink({
  children,
  activeClassName,
  allowSubPath,
  className,
  href = "",
  clickHandler
}: PropsWithChildren<ActiveLinkProps>) {
  const pathname = usePathname();
  const finalClassName = classNames(className, {
    [activeClassName!]: allowSubPath
      ? pathname.startsWith(`/${href.toString().split("/")[1]}`)
      : href.toString() === pathname,
  });

  return (
    <>
      <Link className={finalClassName} href={href} onClick={clickHandler}>
        {children}
      </Link>
    </>
  );
}
