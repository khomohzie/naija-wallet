"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import styled from "styled-components"
import DashboardLayout from "@/components/layout/dashboard-layout"
import WalletCard from "@/components/dashboard/wallet-card"
import QuickActions from "@/components/dashboard/quick-actions"
import RecentTransactions from "@/components/dashboard/recent-transactions"
import { walletService } from "@/services/wallet-service"

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const WelcomeSection = styled.div`
  margin-bottom: 30px;
  
  h1 {
    font-size: 28px;
    font-weight: 700;
    color: #333;
    margin: 0 0 5px 0;
  }
  
  p {
    color: #666;
    margin: 0;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const TransactionsSection = styled.div`
  grid-column: 1 / -1;
`

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [walletData, setWalletData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        const userData = localStorage.getItem("user_data")

        if (!token || !userData) {
          router.push("/")
          return
        }

        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)

        // Fetch wallet data
        const wallet = await walletService.getWalletBalance(parsedUser.id)
        setWalletData(wallet)
      } catch (error) {
        console.error("Dashboard initialization error:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    initializeDashboard()
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout>
      <DashboardContainer>
        <WelcomeSection>
          <h1>Welcome back, {user?.firstName}!</h1>
          <p>Manage your finances with ease</p>
        </WelcomeSection>

        <GridContainer>
          <WalletCard walletData={walletData} />
          <QuickActions />
          <TransactionsSection>
            <RecentTransactions userId={user?.id} />
          </TransactionsSection>
        </GridContainer>
      </DashboardContainer>
    </DashboardLayout>
  )
}
