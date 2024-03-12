import styles from "./FeatureCard.module.css";
import { motion } from "framer-motion";
function FeatureCard({ image, title, description, reverse, index }) {
  const flexDirection = reverse ? "row-reverse" : "row";

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
      className={`${styles.featureCard} ${reverse && styles.reversed}`}
    >
      <motion.img
        className={`${styles.featureImage} ${
          index === 1 && styles.leftPositionImage
        }`}
        src={image}
        alt={title}
      />
      <motion.div className={styles.featureContent}>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </motion.div>
    </motion.div>
  );
}

export default FeatureCard;
