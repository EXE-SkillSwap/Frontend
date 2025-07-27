import { cancelPayment } from "@/api/services/membershipService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Copy, CreditCard, ExternalLink, QrCode } from "lucide-react";
import { useState } from "react";
import QRCode from "react-qr-code";

const PaymentDialog = ({ open, setOpen, paymentData }) => {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleNavigateToPayment = () => {
    // Open PayOS checkout URL in new tab
    if (paymentData?.checkoutUrl) {
      window.open(paymentData.checkoutUrl, "_blank");
    }
  };

  const CopyButton = ({ text, field }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => copyToClipboard(text, field)}
      className="h-8 w-8 p-0"
    >
      {copiedField === field ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );

  const handleCancel = async () => {
    alert("Hủy thanh toán");
    try {
      await cancelPayment(data.orderCode);
    } catch (error) {
      console.error("Error canceling payment:", error);
    }
    setOpen(false);
  };

  const formatAmount = (amount, currency) => {
    if (currency === "VND") {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    }
    return `${amount} ${currency}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "PAID":
        return "bg-green-100 text-green-800 border-green-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const defaultPaymentData = {
    amount: 20000,
    currency: "VND",
    orderCode: 633927,
    accountName: "NGUYEN HA VIET ANH",
    accountNumber: "VQRQADMYX5588",
    description: "Thanh toan Co Ban 633927",
    status: "PENDING",
    checkoutUrl: "https://pay.payos.vn/web/18e09e59e12148f5b0cbfa1d3252eed6",
    qrCode:
      "00020101021238570010A000000727012700069704220113VQRQADMYX55880208QRIBFTTA53037045405200005802VN62280824Thanh toan Co Ban 63392763047F04",
  };

  const data = paymentData || defaultPaymentData;

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Thông tin thanh toán
          </DialogTitle>
          <DialogDescription>
            Quét mã QR hoặc truy cập trang thanh toán để hoàn tất giao dịch
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Payment Summary and Info */}
          <div className="space-y-4">
            {/* Payment Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-muted-foreground">Số tiền</span>
                  <Badge variant="secondary" className="text-lg font-semibold">
                    {formatAmount(data.amount, data.currency)}
                  </Badge>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-muted-foreground">
                    Người nhận
                  </span>
                  <span className="text-sm font-medium">
                    {data.accountName}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-muted-foreground">
                    Số tài khoản
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono">
                      {data.accountNumber}
                    </span>
                    <CopyButton
                      text={data.accountNumber}
                      field="accountNumber"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-muted-foreground">
                    Mã đơn hàng
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono">{data.orderCode}</span>
                    <CopyButton text={data.orderCode} field="orderCode" />
                  </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-muted-foreground">
                    Nội dung
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-right max-w-48 truncate">
                      {data.description}
                    </span>
                    <CopyButton text={data.description} field="description" />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Trạng thái
                  </span>
                  <Badge
                    variant="outline"
                    className={getStatusColor(data.status)}
                  >
                    {data.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Button */}
            <div className="space-y-3">
              <Button
                onClick={handleNavigateToPayment}
                className="w-full gap-2 h-12 text-base font-medium"
                size="lg"
                disabled={!data.checkoutUrl}
              >
                Đến trang thanh toán
                <ExternalLink className="h-4 w-4" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Hoặc tiếp tục đến trang thanh toán an toàn của chúng tôi để có
                thêm tùy chọn thanh toán
              </p>
            </div>

            {/* Important Note */}
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
              <p className="text-xs text-blue-800 text-center">
                <strong>Quan trọng:</strong> Vui lòng sử dụng nội dung{" "}
                <span className="font-mono">{data.description}</span> khi chuyển
                khoản
              </p>
            </div>
          </div>

          {/* Right Column - QR Code Section */}
          <div className="text-center space-y-4 flex flex-col justify-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <QrCode className="h-5 w-5" />
              <h3 className="font-semibold">Thanh toán nhanh</h3>
            </div>

            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                {data.qrCode ? (
                  <div className="relative">
                    <div className="w-48 h-48 mx-auto bg-white flex items-center justify-center border rounded-lg">
                      <div className="text-center">
                        <QRCode value={data.qrCode} size={180} />
                        <p className="text-xs text-gray-500">
                          QR Code sẽ được hiển thị ở đây
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full"
                      onClick={() => copyToClipboard(data.qrCode, "qrCode")}
                    >
                      {copiedField === "qrCode" ? (
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      Sao chép mã QR
                    </Button>
                  </div>
                ) : (
                  <div className="w-48 h-48 mx-auto bg-gray-100 flex items-center justify-center rounded-lg">
                    <div className="text-center">
                      <QrCode className="h-16 w-16 mx-auto mb-2 text-gray-400" />
                      <p className="text-xs text-gray-500">Không có mã QR</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Quét mã QR để thanh toán nhanh chóng hoặc sao chép thông tin thanh
              toán bên trái qua ứng dụng ngân hàng của bạn.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
