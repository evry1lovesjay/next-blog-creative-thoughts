import styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>halfwayDev</div>
      <div className={styles.text}>
        halfwayDev creative thoughts agency. All rights reserved.
      </div>
    </div>
  )
}

export default Footer