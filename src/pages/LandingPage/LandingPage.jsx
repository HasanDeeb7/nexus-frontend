import styles from "./LandingPage.module.css";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import HeroSection from "../../components/HeroSection/HeroSection";
import postImage from "/images/postNews.png";
import userPage from "/images/UserPage.png";
import chatImage from "/images/Broadcast.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { useLoadingStore } from "../../Store/loadingStore";
const featuresData = [
  {
    image: postImage, // Replace with your image path
    title: "Share Images",
    description: `
    Showcase your passion and connect with fellow gamers! Share your experiences, discuss strategies, and like amazing content - all in one place. Post images, comment on discussions, and join the thriving community.`,
    reverse: false,
  },
  {
    image: userPage, // Replace with your image path
    title: "Follow Friends & Games",
    description:
      "Expand your gaming circle and stay connected to the games you love! Build friendships with fellow players, follow your favorite games for updates, and discover new communities - all within our platform.",
    reverse: true,
  },
  {
    image: chatImage, // Replace with your image path
    title: "Chat with Gamers",
    description: `Connect and chat with fellow gamers, anytime, anywhere! Our platform lets you chat privately with friends or join public discussions about your favorite games. Share strategies, tips, and laughter in real-time, fostering a vibrant and connected community.`,
    reverse: false,
  },
];
function LandingPage() {
  const navigate = useNavigate();
  const { setLoadingWall } = useLoadingStore();
  function handleNavigate(path) {
    setLoadingWall(true);
    setTimeout(() => {
      navigate(path);
    }, 500);
  }

  return (
    <>
      <NavBar minimal handleNavigate={handleNavigate} />
      <div className={styles.landingPage}>
        <section className={styles.hero}>
          <HeroSection />
        </section>
        <section className={styles.features}>
          <h2 className={styles.featuresTitle}>Key Features</h2>
          <div className={styles.featuresContainer}>
            {featuresData.map((feature, idx) => (
              <FeatureCard key={feature.title} {...feature} index={idx} />
            ))}
          </div>
        </section>
        <section className={styles.cta}>
          <button
            className={styles.ctaButton}
            onClick={() => handleNavigate("/login")}
          >
            Sign Up Now!
          </button>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
