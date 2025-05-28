import { tokens } from "../../theme";

import axios from "axios";

const API_URL = "https://vaccine-system2.azurewebsites.net"; // Thay bằng URL thực tế của bạn

export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/Customer/get-customer`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getInvoices = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/Invoice/get-invoices`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

let updatedDataTeam = [];
// console.log(updatedDataTeam);

export let mockDataTeam = [];
export let mockPieData = [];
export let mockBarData = [];
export let mockWithdrawData = [];
export let mockTransactions = [];
export let mockLineData = [
  {
    id: "Revenue",
    color: tokens("dark").greenAccent[500],
    data: Array.from({ length: 12 }, (_, i) => ({
      x: (i + 1).toString(),
      y: 0,
    })),
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getServiceName = (invoiceType) => {
  switch (invoiceType) {
    case "Single":
      return "Single";
    case "Combo":
      return "Combo";
    default:
      return "Other Service";
  }
};

const mockCustomers = [
  {
    customerId: 1,
    userName: "Alice",
    email: "alice@example.com",
    phone: "0123456789",
    dob: "1990-01-01",
  },
  {
    customerId: 2,
    userName: "Bob",
    email: "bob@example.com",
    phone: "0987654321",
    dob: "1985-05-05",
  },
  // thêm customer khác nếu muốn
];

const mockInvoices = [
  {
    invoiceId: 101,
    customerId: 1,
    createdAt: "2025-05-01T10:00:00Z",
    status: "Paid",
    totalAmount: 100,
    type: "Single",
  },
  {
    invoiceId: 102,
    customerId: 1,
    createdAt: "2025-05-15T15:00:00Z",
    status: "Paid",
    totalAmount: 200,
    type: "Combo",
  },
  {
    invoiceId: 103,
    customerId: 2,
    createdAt: "2025-04-20T09:00:00Z",
    status: "Pending",
    totalAmount: 150,
    type: "Single",
  },
  // thêm invoice khác nếu muốn
];

const fetchData = async () => {
  try {
    // const [customers, invoices] = await Promise.all([
    //   getCustomers(),
    //   getInvoices(),
    // ]);
    // updatedDataTeam = [];
    const customers = mockCustomers;
    const invoices = mockInvoices;

    // Tạo mapping từ customerId sang user
    const customerMap = {};
    customers.forEach((customer) => {
      customerMap[customer.customerId] = {
        id: customer.customerId.toString(),
        username: customer.userName || "Unknown",
        email: customer.email || "",
        phone: customer.phone || "",
        creationTime: customer.dob || new Date().toISOString(),
        bookings: {},
        refundMoney: {},
      };
    });

    // Thêm invoice data vào từng user
    invoices.forEach((invoice) => {
      if (customerMap[invoice.customerId]) {
        const invoiceDate = invoice.createdAt
          ? new Date(invoice.createdAt)
          : new Date();
        const formattedDate = formatDate(invoiceDate);

        customerMap[invoice.customerId].bookings[invoice.invoiceId] = {
          bookingId: invoice.invoiceId.toString(),
          date: formattedDate,
          time: invoiceDate.toLocaleTimeString(),
          status: invoice.status || "Unknown",
          totalPaid: invoice.totalAmount || 0,
          services: [getServiceName(invoice.type)],
          feeOfCancellation: 0,
          type: invoice.type || "Unknown",
          createdAt: invoice.createdAt,
        };
      }
    });

    updatedDataTeam = Object.values(customerMap);
    mockDataTeam = [...updatedDataTeam];
    mockTransactions = getMockTransactions();
    getMockLineData();
    mockPieData = getMockPieData();
    mockBarData = getMockBarData();
    mockWithdrawData = getMockWithdrawData();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getMockTransactions = () => {
  let transactions = [];

  mockDataTeam.forEach((user) => {
    for (const bookingId in user.bookings) {
      const booking = user.bookings[bookingId];
      const date = new Date(booking.createdAt);
      const formattedDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;

      transactions.push({
        bookingID: booking.bookingId,
        user: user.username,
        date: formattedDate,
        time: booking.time,
        formattedDate: booking.createdAt,
        status: booking.status,
        cost: booking.totalPaid,
        feeOfCancellation: booking.feeOfCancellation,
        cancellationDate: null,
      });
    }
  });

  return transactions.sort(
    (a, b) => new Date(b.formattedDate) - new Date(a.formattedDate)
  );
};

const getMockLineData = () => {
  const currentYear = new Date().getFullYear();
  const monthlyTotals = Array(12).fill(0);

  mockDataTeam.forEach((user) => {
    for (const bookingId in user.bookings) {
      const booking = user.bookings[bookingId];
      if (booking.status !== "Paid") continue;

      const bookingDate = new Date(booking.createdAt);
      if (bookingDate.getFullYear() === currentYear) {
        const month = bookingDate.getMonth();
        monthlyTotals[month] += booking.totalPaid || 0;
      }
    }
  });

  mockLineData[0].data = monthlyTotals.map((total, index) => ({
    x: (index + 1).toString(),
    y: total,
  }));
};

const getMockPieData = () => {
  const serviceCounts = {};

  mockDataTeam.forEach((user) => {
    for (const bookingId in user.bookings) {
      const booking = user.bookings[bookingId];
      if (booking.status !== "Paid") continue;

      booking.services.forEach((serviceName) => {
        serviceCounts[serviceName] = (serviceCounts[serviceName] || 0) + 1;
      });
    }
  });

  return Object.entries(serviceCounts).map(([serviceName, count]) => ({
    id: serviceName,
    label: serviceName,
    value: count,
    color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
  }));
};

const getMockBarData = () => {
  const currentYear = new Date().getFullYear();
  const barData = [];

  for (let month = 0; month < 12; month++) {
    const monthData = {
      months: (month + 1).toString(),
      Combo: 0,
      Single: 0,
    };

    mockDataTeam.forEach((user) => {
      for (const bookingId in user.bookings) {
        const booking = user.bookings[bookingId];
        if (booking.status !== "Paid") continue;

        const bookingDate = new Date(booking.createdAt);
        if (
          bookingDate.getFullYear() === currentYear &&
          bookingDate.getMonth() === month
        ) {
          booking.services.forEach((serviceName) => {
            if (serviceName === "Single") {
              monthData.Single++;
            } else if (serviceName === "Combo") {
              monthData["Combo"]++;
            }
          });
        }
      }
    });

    barData.push(monthData);
  }

  return barData;
};

const getMockWithdrawData = () => {
  // Tạm thời trả về mảng rỗng vì API chưa cung cấp dữ liệu này
  return [];
};

// Fetch data ngay khi load và thiết lập interval
fetchData();
setInterval(fetchData, 15000);

export { fetchData };
