export const formatDateAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds} giây trước`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} ngày trước`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} tháng trước`;
  const years = Math.floor(months / 12);
  return `${years} năm trước`;
};

// Format date to Vietnamese format: dd/mm/yyyy
export const formatDateVN = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Format datetime to Vietnamese format: dd/mm/yyyy HH:mm
export const formatDateTimeVN = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

// Format date to readable Vietnamese format: "30 tháng 7, 2025"
export const formatDateReadableVN = (dateString) => {
  const date = new Date(dateString);
  const months = [
    "tháng 1",
    "tháng 2",
    "tháng 3",
    "tháng 4",
    "tháng 5",
    "tháng 6",
    "tháng 7",
    "tháng 8",
    "tháng 9",
    "tháng 10",
    "tháng 11",
    "tháng 12",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

// Format date with day of week: "Thứ Ba, 30/07/2025"
export const formatDateWithDayVN = (dateString) => {
  const date = new Date(dateString);
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  const dayName = days[date.getDay()];
  const formattedDate = formatDateVN(dateString);

  return `${dayName}, ${formattedDate}`;
};

// Format time only: "17:56"
export const formatTimeOnly = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Format time with seconds: "17:56:35"
export const formatTimeWithSeconds = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

// Format ISO date for API: "2025-07-30T17:56:35.000Z"
export const formatDateISO = (date = new Date()) => {
  return date.toISOString();
};

// Format date for input fields: "2025-07-30"
export const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Format relative date (smart format)
export const formatDateSmart = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return `Hôm nay, ${formatTimeOnly(dateString)}`;
  if (days === 1) return `Hôm qua, ${formatTimeOnly(dateString)}`;
  if (days < 7) return `${days} ngày trước`;
  if (days < 30) return formatDateVN(dateString);

  return formatDateReadableVN(dateString);
};

// Check if date is today
export const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

// Check if date is yesterday
export const isYesterday = (dateString) => {
  const date = new Date(dateString);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

// Get time period (morning, afternoon, evening, night)
export const getTimePeriod = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours();

  if (hours >= 5 && hours < 12) return "sáng";
  if (hours >= 12 && hours < 17) return "chiều";
  if (hours >= 17 && hours < 21) return "tối";
  return "đêm";
};

// Format with time period: "17:56 tối"
export const formatTimeWithPeriod = (dateString) => {
  const time = formatTimeOnly(dateString);
  const period = getTimePeriod(dateString);
  return `${time} ${period}`;
};
