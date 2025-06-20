"use client";

import type React from "react";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    router.push("/");
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "🏠" },
    { href: "/send-money", label: "Send Money", icon: "💸" },
    { href: "/receive-money", label: "Receive Money", icon: "💰" },
    { href: "/transactions", label: "Transactions", icon: "📊" },
    { href: "/cards", label: "Cards", icon: "💳" },
    { href: "/banks", label: "Bank Accounts", icon: "🏦" },
    { href: "/bills", label: "Pay Bills", icon: "🧾" },
    { href: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <LayoutContainer>
      <Sidebar $collapsed={sidebarCollapsed}>
        <SidebarHeader>
          {!sidebarCollapsed && <h2>NaijaWallet</h2>}
          <CollapseButton
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? "→" : "←"}
          </CollapseButton>
        </SidebarHeader>

        <NavList>
          {navItems.map((item) => (
            <NavItem key={item.href} $active={isActive(item.href)}>
              <a href={item.href}>
                <span>{item.icon}</span>
                {!sidebarCollapsed && item.label}
              </a>
            </NavItem>
          ))}
        </NavList>
      </Sidebar>

      <MainContent $sidebarCollapsed={sidebarCollapsed}>
        <TopBar>
          <MobileMenuButton
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            ☰
          </MobileMenuButton>

          <UserMenu>
            <UserAvatar>JD</UserAvatar>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserMenu>
        </TopBar>

        {children}
      </MainContent>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
`;

const Sidebar = styled.aside<{ $collapsed: boolean }>`
  width: ${(props) => (props.$collapsed ? "80px" : "280px")};
  background: white;
  border-right: 1px solid #e2e8f0;
  transition: width 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 100;

  @media (max-width: 768px) {
    width: ${(props) => (props.$collapsed ? "0" : "280px")};
    transform: translateX(${(props) => (props.$collapsed ? "-100%" : "0")});
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin: 0;
  }
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;

  &:hover {
    background: #f1f5f9;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 20px 0;
  margin: 0;
`;

const NavItem = styled.li<{ $active?: boolean }>`
  margin: 0;

  a {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: ${(props) => (props.$active ? "#667eea" : "#64748b")};
    text-decoration: none;
    font-weight: ${(props) => (props.$active ? "600" : "400")};
    background: ${(props) => (props.$active ? "#f0f4ff" : "transparent")};
    border-right: ${(props) => (props.$active ? "3px solid #667eea" : "none")};
    transition: all 0.2s ease;

    &:hover {
      background: #f1f5f9;
      color: #333;
    }

    svg {
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }
  }
`;

const MainContent = styled.main<{ $sidebarCollapsed: boolean }>`
  flex: 1;
  margin-left: ${(props) => (props.$sidebarCollapsed ? "80px" : "280px")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const TopBar = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 20px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;

  &:hover {
    background: #f1f5f9;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #dc2626;
  }
`;
