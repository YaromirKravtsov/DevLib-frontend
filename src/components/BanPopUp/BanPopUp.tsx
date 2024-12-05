import React from "react";
import styles from "./BanPopUp.module.css";
import BanIcon from '../../assets/images/icons/ban.png';

interface BanPopupProps {
  onClose: () => void; // Пропс для закриття поп-апу
}

const BanPopup: React.FC<BanPopupProps> = ({ onClose }) => {
  return (
    <div className={styles["ban-popup"]}>
      <div className={styles["ban-popup-content"]}>
       <button className={styles.closeButton} onClick={onClose}>✖</button>
        <img src={BanIcon} alt="Ban Icon" className={styles["ban-popup-icon"]} />
        <h2 className={styles["body-text"]}>Ви були заблоковані через порушення правил сайту!</h2>
        <p className={styles["ban-popup-footer"]}>
          За додатковою інформацією звертайтеся на пошту <strong>DevLib@gmail.com</strong>
        </p>
      </div>
    </div>
  );
};

export default BanPopup;
