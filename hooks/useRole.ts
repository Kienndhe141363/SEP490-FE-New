import { useState, useEffect } from "react";

const useRole = () => {
  const [role, setRole] = useState(() => {
    // Lấy role từ localStorage khi khởi tạo
    return localStorage.getItem("role") || null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      // Cập nhật role khi localStorage thay đổi
      const updatedRole = localStorage.getItem("role");
      setRole(updatedRole);
    };

    // Lắng nghe sự kiện storage để xử lý thay đổi role
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return role;
};

export default useRole;
