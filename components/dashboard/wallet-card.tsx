"use client"

import styled from "styled-components"

const Card = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 30px;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  opacity: 0.9;
`

const CardIcon = styled.div`
  font-size: 24px;
`

const Balance = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 20px;
`

const BalanceLabel = styled.p`
  font-size: 14px;
  margin: 0 0 5px 0;
  opacity: 0.8;
`

const BalanceAmount = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
`

const AccountInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
`

const AccountNumber = styled.div`
  font-size: 14px;
  opacity: 0.9;
`

const BankName = styled.div`
  font-size: 12px;
  opacity: 0.8;
`

interface WalletCardProps {
  walletData: {
    balance: number
    accountNumber: string
    bankName: string
    currency: string
  } | null
}

export default function WalletCard({ walletData }: WalletCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Main Wallet</CardTitle>
        <CardIcon>💳</CardIcon>
      </CardHeader>

      <Balance>
        <BalanceLabel>Available Balance</BalanceLabel>
        <BalanceAmount>{walletData ? formatCurrency(walletData.balance) : "₦0.00"}</BalanceAmount>
      </Balance>

      <AccountInfo>
        <div>
          <AccountNumber>{walletData?.accountNumber || "1234567890"}</AccountNumber>
          <BankName>{walletData?.bankName || "NaijaWallet Bank"}</BankName>
        </div>
        <div>
          <div style={{ fontSize: "12px", opacity: 0.8 }}>Fineract Core</div>
        </div>
      </AccountInfo>
    </Card>
  )
}
