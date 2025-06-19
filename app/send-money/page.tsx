"use client"

import type React from "react"

import { useState } from "react"
import styled from "styled-components"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { paymentService } from "@/services/payment-service"

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`

const Header = styled.div`
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

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-radius: 8px;
  background: #f5f5f5;
  padding: 4px;
`

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: ${(props) => (props.active ? "white" : "transparent")};
  color: ${(props) => (props.active ? "#333" : "#666")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #333;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 14px;
`

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  &::placeholder {
    color: #999;
  }
`

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
  padding: 10px;
  background: #fdf2f2;
  border-radius: 6px;
  border: 1px solid #fecaca;
`

const SuccessMessage = styled.div`
  color: #16a34a;
  font-size: 14px;
  text-align: center;
  padding: 10px;
  background: #f0fdf4;
  border-radius: 6px;
  border: 1px solid #bbf7d0;
`

const RecipientInfo = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  
  h4 {
    margin: 0 0 5px 0;
    color: #333;
    font-size: 16px;
  }
  
  p {
    margin: 0;
    color: #666;
    font-size: 14px;
  }
`

export default function SendMoneyPage() {
  const [activeTab, setActiveTab] = useState<"bank" | "wallet">("wallet")
  const [formData, setFormData] = useState({
    recipientType: "wallet",
    walletId: "",
    accountNumber: "",
    bankCode: "",
    amount: "",
    description: "",
    pin: "",
  })
  const [recipientInfo, setRecipientInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const nigerianBanks = [
    { code: "044", name: "Access Bank" },
    { code: "014", name: "Afribank" },
    { code: "023", name: "Citibank" },
    { code: "050", name: "Ecobank" },
    { code: "011", name: "First Bank" },
    { code: "214", name: "First City Monument Bank" },
    { code: "070", name: "Fidelity Bank" },
    { code: "058", name: "Guaranty Trust Bank" },
    { code: "030", name: "Heritage Bank" },
    { code: "082", name: "Keystone Bank" },
    { code: "076", name: "Polaris Bank" },
    { code: "221", name: "Stanbic IBTC Bank" },
    { code: "068", name: "Standard Chartered Bank" },
    { code: "232", name: "Sterling Bank" },
    { code: "032", name: "Union Bank" },
    { code: "033", name: "United Bank for Africa" },
    { code: "215", name: "Unity Bank" },
    { code: "035", name: "Wema Bank" },
    { code: "057", name: "Zenith Bank" },
  ]

  const handleTabChange = (tab: "bank" | "wallet") => {
    setActiveTab(tab)
    setFormData((prev) => ({ ...prev, recipientType: tab }))
    setRecipientInfo(null)
    setError("")
    setSuccess("")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRecipientLookup = async () => {
    if (activeTab === "wallet" && formData.walletId) {
      try {
        const info = await paymentService.lookupWalletUser(formData.walletId)
        setRecipientInfo(info)
      } catch (err: any) {
        setError(err.message)
      }
    } else if (activeTab === "bank" && formData.accountNumber && formData.bankCode) {
      try {
        const info = await paymentService.lookupBankAccount(formData.accountNumber, formData.bankCode)
        setRecipientInfo(info)
      } catch (err: any) {
        setError(err.message)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      let result
      if (activeTab === "wallet") {
        result = await paymentService.sendToWallet({
          recipientWalletId: formData.walletId,
          amount: Number.parseFloat(formData.amount),
          description: formData.description,
          pin: formData.pin,
        })
      } else {
        result = await paymentService.sendToBank({
          accountNumber: formData.accountNumber,
          bankCode: formData.bankCode,
          amount: Number.parseFloat(formData.amount),
          description: formData.description,
          pin: formData.pin,
        })
      }

      setSuccess(`Transfer successful! Reference: ${result.reference}`)
      setFormData({
        recipientType: activeTab,
        walletId: "",
        accountNumber: "",
        bankCode: "",
        amount: "",
        description: "",
        pin: "",
      })
      setRecipientInfo(null)
    } catch (err: any) {
      setError(err.message || "Transfer failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <Container>
        <Header>
          <h1>Send Money</h1>
          <p>Transfer money to bank accounts or other wallets</p>
        </Header>

        <Card>
          <TabContainer>
            <Tab active={activeTab === "wallet"} onClick={() => handleTabChange("wallet")}>
              To Wallet
            </Tab>
            <Tab active={activeTab === "bank"} onClick={() => handleTabChange("bank")}>
              To Bank Account
            </Tab>
          </TabContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <Form onSubmit={handleSubmit}>
            {activeTab === "wallet" ? (
              <InputGroup>
                <Label htmlFor="walletId">Recipient Wallet ID or Phone</Label>
                <Input
                  id="walletId"
                  name="walletId"
                  type="text"
                  placeholder="Enter wallet ID or phone number"
                  value={formData.walletId}
                  onChange={handleChange}
                  onBlur={handleRecipientLookup}
                  required
                />
              </InputGroup>
            ) : (
              <>
                <InputGroup>
                  <Label htmlFor="bankCode">Select Bank</Label>
                  <Select id="bankCode" name="bankCode" value={formData.bankCode} onChange={handleChange} required>
                    <option value="">Select a bank</option>
                    {nigerianBanks.map((bank) => (
                      <option key={bank.code} value={bank.code}>
                        {bank.name}
                      </option>
                    ))}
                  </Select>
                </InputGroup>

                <InputGroup>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    type="text"
                    placeholder="Enter 10-digit account number"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    onBlur={handleRecipientLookup}
                    maxLength={10}
                    required
                  />
                </InputGroup>
              </>
            )}

            {recipientInfo && (
              <RecipientInfo>
                <h4>{recipientInfo.name}</h4>
                <p>{activeTab === "bank" ? recipientInfo.bankName : "NaijaWallet User"}</p>
              </RecipientInfo>
            )}

            <InputGroup>
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                min="1"
                step="0.01"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                name="description"
                type="text"
                placeholder="What's this for?"
                value={formData.description}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="pin">Transaction PIN</Label>
              <Input
                id="pin"
                name="pin"
                type="password"
                placeholder="Enter your 4-digit PIN"
                value={formData.pin}
                onChange={handleChange}
                maxLength={4}
                required
              />
            </InputGroup>

            <Button type="submit" disabled={loading || !recipientInfo}>
              {loading ? "Processing..." : `Send ₦${formData.amount || "0.00"}`}
            </Button>
          </Form>
        </Card>
      </Container>
    </DashboardLayout>
  )
}
