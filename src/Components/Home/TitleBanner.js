import React from 'react'
import styles from "./Home.module.css";
import bookspic from '../../assets/bookspic.jpg'


const TitleBanner = () => {
  return (
    <div
    className={styles.ad_banner}
    style={{
      background: `
        url(${bookspic})`,
      backgroundSize: "cover",
    }}

  >
    <div className={styles.ad_text}>
        <h1>The Repository of Favorite Books</h1>
        </div>
  </div>
  )
}

export default TitleBanner