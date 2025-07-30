import paymentSucessSound from "@/assets/sounds/payment-success-sound.mp3";
import notificationSound from "@/assets/sounds/notification-sound.mp3";

export const playPaymentSuccessSound = () => {
  const audio = new Audio(paymentSucessSound);
  audio.play();
};

export const playNotificationSound = () => {
  const audio = new Audio(notificationSound);
  audio.play();
};
