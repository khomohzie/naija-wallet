"use client"

import { useRouter } from "next/navigation"
import styled from "styled-components"

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
`

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`

const ActionButton = styled.button`
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  
  &:hover {
    background: #f1f5f9;
    border-color: #667eea;
    transform: translateY(-2px);
  }
`

const ActionIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`

const ActionLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`

export default function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      icon: "💸",
      label: "Send Money",
      onClick: () => router.push("/send-money"),
    },
    {
      icon: "💰",
      label: "Receive Money",
      onClick: () => router.push("/receive-money"),
    },
    {
      icon: "🧾",
      label: "Pay Bills",
      onClick: () => router.push("/bills"),
    },
    {
      icon: "📱",
      label: "Buy Airtime",
      onClick: () => router.push("/airtime"),
    },
  ]

  return (
    <Card>
      <CardTitle>Quick Actions</CardTitle>
      <ActionsGrid>
        {actions.map((action, index) => (
          <ActionButton key={index} onClick={action.onClick}>
            <ActionIcon>{action.icon}</ActionIcon>
            <ActionLabel>{action.label}</ActionLabel>
          </ActionButton>
        ))}
      </ActionsGrid>
    </Card>
  )
}
