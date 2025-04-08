import React, { useState, useEffect } from "react";

const StockNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate stock detection event
    const interval = setInterval(() => {
      const stockAvailable = Math.random() > 0.5; // Random stock status
      const message = stockAvailable ? "Stock Added to Shelf" : "Shelf Space Empty";
      const type = stockAvailable ? "success" : "error";

      setNotifications((prev) => [
        ...prev,
        { id: Date.now(), message, type },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div style={{ position: "fixed", top: "20px", right: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
      {notifications.map(({ id, message, type }) => (
        <div
          key={id}
          style={{
            padding: "15px 20px",
            borderRadius: "8px",
            color: "white",
            fontSize: "16px",
            minWidth: "250px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: type === "success" ? "#28a745" : "#dc3545",
            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
            opacity: "1",
            transform: "translateX(0)"
          }}
        >
          <strong>{message}</strong>
          <p>Detected by IoT System</p>
          <button onClick={() => removeNotification(id)} style={{ marginLeft: "10px", background: "none", border: "none", color: "white", cursor: "pointer" }}>✖</button>
        </div>
      ))}
    </div>
  );
};

export default StockNotifications;
