import styles from "./FeatureCard.module.css";
import { motion } from "framer-motion";
function FeatureCard({ image, title, description, reverse, index }) {
  const flexDirection = reverse ? "row-reverse" : "row";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={`${styles.featureCard} ${reverse && styles.reversed}`}
    >
      <img
        className={`${styles.featureImage} ${
          index === 1 && styles.leftPositionImage
        }`}
        src={image}
        alt={title}
      />
      <div className={styles.featureContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </motion.div>
  );
}

export default FeatureCard;
