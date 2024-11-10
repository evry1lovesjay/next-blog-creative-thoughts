import Image from "next/image";
import styles from "./home.module.css"

const Home = () => {
  return (
  <div className={styles.container}>
    <div className={styles.textContainer}>
      <h1 className={styles.title}>Creative Thoughts Agency.</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Beatae perferendis atque distinctio nihil. Libero ea iure tenetur consectetur saepe consequuntur.
      </p>
      <div className={styles.buttons}>
        <button className={styles.button}>Learn More</button>
        <button className={styles.button}>Contact</button>
      </div>
      <div className={styles.brands}>
        <Image src="/brands.png" fill alt="" className={styles.brandImg}/>
      </div>
    </div>
    <div className={styles.imgContainer}>
      <Image src="/hero.gif" fill alt="" className={styles.heroImg}/>
    </div>
  </div>
  )
};

export default Home;