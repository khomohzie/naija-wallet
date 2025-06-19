// Mock wallet service with Fineract integration
class WalletService {
  private baseUrl = process.env.NEXT_PUBLIC_FINERACT_URL || "https://demo.fineract.dev"

  async getWalletBalance(userId: string) {
    await this.delay(800)

    // Mock wallet data from Fineract savings account
    return {
      balance: 150000.5,
      accountNumber: "1234567890",
      bankName: "NaijaWallet (Fineract)",
      currency: "NGN",
      accountType: "SAVINGS",
      fineractAccountId: "savings_" + userId,
      availableBalance: 150000.5,
      ledgerBalance: 150000.5,
    }
  }

  async createSavingsAccount(clientId: string) {
    await this.delay(1000)

    // Mock Fineract savings account creation
    const accountPayload = {
      clientId: clientId,
      productId: 1, // Default savings product
      submittedOnDate: new Date().toISOString().split("T")[0],
      nominalAnnualInterestRate: 5.0,
      interestCompoundingPeriodType: 1,
      interestPostingPeriodType: 4,
      interestCalculationType: 1,
      interestCalculationDaysInYearType: 365,
      minRequiredOpeningBalance: 1000,
      lockinPeriodFrequency: 6,
      lockinPeriodFrequencyType: 2,
      withdrawalFeeForTransfers: false,
      allowOverdraft: false,
    }

    return {
      savingsId: Math.floor(Math.random() * 1000000),
      accountNo: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
      clientId: clientId,
      status: "SUBMITTED_AND_PENDING_APPROVAL",
    }
  }

  async approveSavingsAccount(savingsId: string) {
    await this.delay(500)

    return {
      savingsId: savingsId,
      status: "APPROVED",
      approvedOnDate: new Date().toISOString(),
    }
  }

  async activateSavingsAccount(savingsId: string) {
    await this.delay(500)

    return {
      savingsId: savingsId,
      status: "ACTIVE",
      activatedOnDate: new Date().toISOString(),
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export const walletService = new WalletService()
