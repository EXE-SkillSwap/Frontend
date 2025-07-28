import paymentSucessSound from "@/assets/sounds/payment-success-sound.mp3";

export const playPaymentSuccessSound = () => {
  const audio = new Audio(paymentSucessSound);
  audio.play();
};
