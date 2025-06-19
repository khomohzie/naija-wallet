"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { transactionService } from "@/services/transaction-service"

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #f8fafc;
  border-radius: 12px;
  transition: background 0.2s ease;
  
  &:hover {
    background: #f1f5f9;
  }
`

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const TransactionIcon = styled.div<{ type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: ${(props) => {
    switch (props.type) {
      case "credit":
        return "#dcfce7"
      case "debit":
        return "#fee2e2"
      default:
        return "#e0e7ff"
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case "credit":
        return "#16a34a"
      case "debit":
        return "#dc2626"
      default:
        return "#4f46e5"
    }
  }};
`

const TransactionDetails = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 0 0 2px 0;
  }
  
  p {
    font-size: 12px;
    color: #666;
    margin: 0;
  }
`

const TransactionAmount = styled.div<{ type: string }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => {
    switch (props.type) {
      case "credit":
        return "#16a34a"
      case "debit":
        return "#dc2626"
      default:
        return "#333"
    }
  }};
`

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  
  div {
    font-size: 48px;
    margin-bottom: 15px;
  }
  
  h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 5px 0;
  }
  
  p {
    font-size: 14px;
    margin: 0;
  }
`

interface RecentTransactionsProps {
  userId: string
}

export default function RecentTransactions({ userId }: RecentTransactionsProps) {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await transactionService.getRecentTransactions(userId)
        setTransactions(data)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchTransactions()
    }
  }, [userId])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }

  const getTransactionIcon = (type: string, category: string) => {
    if (type === "credit") return "💰"
    if (category === "transfer") return "💸"
    if (category === "bills") return "🧾"
    if (category === "airtime") return "📱"
    return "💳"
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <div>Loading transactions...</div>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <ViewAllButton>View All</ViewAllButton>
      </CardHeader>

      {transactions.length === 0 ? (
        <EmptyState>
          <div>📊</div>
          <h4>No transactions yet</h4>
          <p>Your recent transactions will appear here</p>
        </EmptyState>
      ) : (
        <TransactionList>
          {transactions.slice(0, 5).map((transaction) => (
            <TransactionItem key={transaction.id}>
              <TransactionInfo>
                <TransactionIcon type={transaction.type}>
                  {getTransactionIcon(transaction.type, transaction.category)}
                </TransactionIcon>
                <TransactionDetails>
                  <h4>{transaction.description}</h4>
                  <p>{new Date(transaction.createdAt).toLocaleDateString()}</p>
                </TransactionDetails>
              </TransactionInfo>
              <TransactionAmount type={transaction.type}>
                {transaction.type === "credit" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </TransactionAmount>
            </TransactionItem>
          ))}
        </TransactionList>
      )}
    </Card>
  )
}
