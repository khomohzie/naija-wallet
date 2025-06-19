// Mock authentication service with Fineract integration
class AuthService {
  private baseUrl = process.env.NEXT_PUBLIC_FINERACT_URL || "https://demo.fineract.dev"

  async login(email: string, password: string) {
    // Simulate API call to Fineract authentication
    await this.delay(1000)

    // Mock successful login
    if (email === "demo@example.com" && password === "password") {
      return {
        token: "mock-jwt-token-" + Date.now(),
        user: {
          id: "12345",
          firstName: "John",
          lastName: "Doe",
          email: email,
          phone: "+2348012345678",
          fineractClientId: "client_001",
        },
      }
    }

    // For demo purposes, accept any email/password combination
    return {
      token: "mock-jwt-token-" + Date.now(),
      user: {
        id: Math.random().toString(36).substr(2, 9),
        firstName: email.split("@")[0],
        lastName: "User",
        email: email,
        phone: "+234" + Math.floor(Math.random() * 9000000000 + 1000000000),
        fineractClientId: "client_" + Math.random().toString(36).substr(2, 6),
      },
    }
  }

  async register(userData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    dateOfBirth: string
    state: string
  }) {
    // Simulate API call to Fineract client creation
    await this.delay(1500)

    // Create Fineract client
    const fineractClient = await this.createFineractClient(userData)

    return {
      success: true,
      message: "Registration successful. Please verify your phone number.",
      clientId: fineractClient.clientId,
    }
  }

  async verifyOTP(email: string, otp: string) {
    await this.delay(800)

    // Mock OTP verification
    if (otp === "123456") {
      return {
        success: true,
        message: "Phone number verified successfully",
      }
    }

    throw new Error("Invalid OTP. Please try again.")
  }

  private async createFineractClient(userData: any) {
    // Mock Fineract client creation
    const clientId = "client_" + Math.random().toString(36).substr(2, 9)

    // In real implementation, this would call Fineract API
    const fineractPayload = {
      officeId: 1,
      firstname: userData.firstName,
      lastname: userData.lastName,
      fullname: `${userData.firstName} ${userData.lastName}`,
      displayName: `${userData.firstName} ${userData.lastName}`,
      mobileNo: userData.phone,
      emailAddress: userData.email,
      dateOfBirth: userData.dateOfBirth,
      genderId: 1,
      clientTypeId: 1,
      clientClassificationId: 1,
    }

    return {
      clientId: clientId,
      accountNo: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
      fineractResponse: fineractPayload,
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export const authService = new AuthService()
