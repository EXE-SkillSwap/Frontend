import { processMembershipPayment } from "@/api/services/membershipService";
import PaymentFailed from "@/components/payment/PaymentFailed";
import PaymentSucess from "@/components/payment/PaymentSucess";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  const id = params.get("id");
  const cancel = params.get("cancel");
  const status = params.get("status");
  const orderCode = params.get("orderCode");

  const handleCallback = async () => {
    const paymentRequest = {
      cancel,
      status,
      orderCode,
    };
    try {
      const response = await processMembershipPayment(paymentRequest);
      if (response.status === 200) {
        navigate("/profile");
      } else {
        console.error("Payment processing failed:", response);
      }
    } catch (error) {
      console.error("Error handling payment callback:", error);
    }
  };

  useEffect(() => {
    handleCallback();
  }, [location.search]);

  if (cancel === "false") {
    return (
      <>
        <PaymentSucess />
      </>
    );
  } else if (cancel === "true") {
    return (
      <>
        <PaymentFailed />
      </>
    );
  }
};

export default Payment;
