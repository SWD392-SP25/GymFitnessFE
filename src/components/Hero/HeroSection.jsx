import styles from "./HeroSection.module.css";


const HeroSection = () => {

  return (
    <div className={styles['hero-section']} data-aos='zoom-out-down'>
      <h1 className={styles['main-heading']}>
        Keep Your Body
        <br />
        Fit & Strong
      </h1>
      <div>
      <a href="/"><button className={styles}>Join Us Now</button></a>
      <a href="/sign-in-sign-up"><button className={styles}>Become Trainer</button></a>
      </div>
    </div>
  );
};

export default HeroSection;
