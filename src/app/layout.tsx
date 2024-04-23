"use client";
import React, { useState } from "react";
import Header from "./Header";
import "./globals.css";
import { AdminRightsContext } from "./AdminContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isAdminMode, setAdminMode] = useState(false);

  const handleToggle = () => {
    setAdminMode(!isAdminMode);
  };

  return (
    <>
      <AdminRightsContext.Provider value={isAdminMode}>
        <html>
          <body>
            <Header
              onToggleAdminMode={handleToggle}
              isAdminMode={isAdminMode}
            />
            {children}
          </body>
        </html>
      </AdminRightsContext.Provider>
    </>
  );
};

export default Layout;
