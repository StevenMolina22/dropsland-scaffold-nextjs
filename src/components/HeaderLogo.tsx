import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./HeaderLogo.module.css";

const HeaderLogo: React.FC = () => {
  return (
    <Link href="/" className={styles.logoLink}>
      <Image
        src="/logo-dropsland.png"
        alt="Dropsland"
        className={styles.logoImage}
        width={150}
        height={50}
        priority
      />
    </Link>
  );
};

export default HeaderLogo;
