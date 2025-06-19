// Mock transaction service for recent-transactions component
class TransactionService {
  async getRecentTransactions(userId: string) {
    // Simulate network latency
    await new Promise((res) => setTimeout(res, 900))

    // Return five mock transactions – replace with real Fineract / NIBSS data later
    const categories = ["transfer", "bills", "airtime", "shopping"]
    return Array.from({ length: 5 }).map((_, i) => {
      const type = i % 2 === 0 ? "debit" : "credit"
      const amount = Math.floor(Math.random() * 50_000) + 500
      return {
        id: `txn_${Date.now()}_${i}`,
        description: type === "credit" ? "Wallet Top-up" : "Payment / Transfer",
        category: categories[i % categories.length],
        type,
        amount,
        createdAt: new Date(Date.now() - i * 86_400_000).toISOString(), // past days
      }
    })
  }
}

export const transactionService = new TransactionService()
