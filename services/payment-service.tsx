// Payment service with Flutterwave and NIBSS integration
class PaymentService {
  private flutterwavePublicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "FLWPUBK_TEST-mock-key"
  private nibssBaseUrl = process.env.NEXT_PUBLIC_NIBSS_URL || "https://api.nibss-plc.com.ng"

  async sendToWallet(data: {
    recipientWalletId: string
    amount: number
    description: string
    pin: string
  }) {
    await this.delay(2000)

    // Mock wallet-to-wallet transfer via Fineract
    const transferPayload = {
      fromOfficeId: 1,
      fromClientId: "current_user_client_id",
      fromAccountType: 2, // Savings
      fromAccountId: "sender_savings_id",
      toOfficeId: 1,
      toClientId: data.recipientWalletId,
      toAccountType: 2,
      toAccountId: "recipient_savings_id",
      transferAmount: data.amount,
      transferDate: new Date().toISOString().split("T")[0],
      transferDescription: data.description || "Wallet transfer",
    }

    return {
      success: true,
      reference: "NW" + Date.now(),
      transactionId: "txn_" + Math.random().toString(36).substr(2, 9),
      amount: data.amount,
      fee: 0, // No fee for wallet transfers
      recipient: data.recipientWalletId,
      status: "COMPLETED",
    }
  }

  async sendToBank(data: {
    accountNumber: string
    bankCode: string
    amount: number
    description: string
    pin: string
  }) {
    await this.delay(3000)

    // Use NIBSS for bank transfers
    const nibssTransfer = await this.processNIBSSTransfer(data)

    // Also integrate with Flutterwave as backup
    const flutterwaveTransfer = await this.processFlutterwaveTransfer(data)

    return {
      success: true,
      reference: "FW" + Date.now(),
      transactionId: "txn_" + Math.random().toString(36).substr(2, 9),
      amount: data.amount,
      fee: 50, // Simulate transfer fee
      recipient: data.accountNumber,
      status: "COMPLETED",
    }
  }

  async lookupWalletUser(walletId: string) {
    await this.delay(1000)

    // Mock wallet user lookup
    return {
      name: "Recipient User",
      walletId: walletId,
    }
  }

  async lookupBankAccount(accountNumber: string, bankCode: string) {
    await this.delay(1500)

    // Mock bank account lookup via NIBSS
    return {
      name: "Account Name",
      accountNumber: accountNumber,
      bankName: this.getBankName(bankCode),
    }
  }

  private async processNIBSSTransfer(data: any) {
    // Simulate NIBSS transfer processing
    await this.delay(1000)

    return {
      nibssReference: "NIBSS" + Date.now(),
      status: "SUCCESSFUL",
    }
  }

  private async processFlutterwaveTransfer(data: any) {
    // Simulate Flutterwave transfer processing
    await this.delay(1200)

    return {
      flutterwaveReference: "FW" + Date.now(),
      status: "SUCCESSFUL",
    }
  }

  private getBankName(bankCode: string): string {
    const banks = [
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

    const bank = banks.find((b) => b.code === bankCode)
    return bank ? bank.name : "Unknown Bank"
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export const paymentService = new PaymentService()
