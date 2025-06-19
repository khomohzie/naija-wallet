"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    color: #333;
    font-size: 28px;
    font-weight: 700;
    margin: 0;
  }

  p {
    color: #666;
    margin: 5px 0 0 0;
    font-size: 14px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-radius: 8px;
  background: #f5f5f5;
  padding: 4px;
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: ${(props) => (props.$active ? "white" : "transparent")};
  color: ${(props) => (props.$active ? "#333" : "#666")};
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #333;
  }
`;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("auth_token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <Container>
      <Card>
        <Logo>
          <h1>NaijaWallet</h1>
          <p>Secure Digital Banking for Nigeria</p>
        </Logo>

        <TabContainer>
          <Tab
            $active={activeTab === "login"}
            onClick={() => setActiveTab("login")}
          >
            Login
          </Tab>
          <Tab
            $active={activeTab === "register"}
            onClick={() => setActiveTab("register")}
          >
            Register
          </Tab>
        </TabContainer>

        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
      </Card>
    </Container>
  );
}
