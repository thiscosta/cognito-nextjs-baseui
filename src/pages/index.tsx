import type { NextPage } from "next";

import styles from "../frontend/styles/Home.module.css";

const IndexPage: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}></header>
      </div>
    </>
  );
};

export default IndexPage;
