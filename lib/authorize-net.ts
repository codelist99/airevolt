type AuthorizePayment = {
  amount: number
  opaqueDataDescriptor: string
  opaqueDataValue: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
}

export async function processPayment(payment: AuthorizePayment) {
  const apiLoginId = process.env.AUTHORIZENET_API_LOGIN_ID
  const transactionKey = process.env.AUTHORIZENET_TRANSACTION_KEY
  if (!apiLoginId || !transactionKey) throw new Error("Authorize.Net is not configured")

  const endpoint = process.env.AUTHORIZENET_ENVIRONMENT === "sandbox"
    ? "https://apitest.authorize.net/xml/v1/request.api"
    : "https://api.authorize.net/xml/v1/request.api"

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      createTransactionRequest: {
        merchantAuthentication: { name: apiLoginId, transactionKey },
        refId: crypto.randomUUID().slice(0, 20),
        transactionRequest: {
          transactionType: "authCaptureTransaction",
          amount: payment.amount.toFixed(2),
          payment: { opaqueData: { dataDescriptor: payment.opaqueDataDescriptor, dataValue: payment.opaqueDataValue } },
          order: { description: "AI Revolution" },
          customer: { email: payment.email },
          billTo: {
            firstName: payment.firstName,
            lastName: payment.lastName,
            address: payment.address,
            city: payment.city,
            state: payment.state,
            zip: payment.zip,
            country: "US",
            phoneNumber: payment.phone,
          },
          transactionSettings: {
            setting: [{ settingName: "duplicateWindow", settingValue: "120" }],
          },
        },
      },
    }),
  })

  const data = JSON.parse((await response.text()).replace(/^\uFEFF/, ""))
  const transaction = data.transactionResponse
  if (response.ok && data.messages?.resultCode === "Ok" && transaction?.responseCode === "1") {
    return {
      success: true as const,
      transactionId: String(transaction.transId),
      cardLastFour: String(transaction.accountNumber || "").slice(-4) || null,
    }
  }

  const message = transaction?.errors?.[0]?.errorText
    || transaction?.messages?.[0]?.description
    || data.messages?.message?.[0]?.text
    || "Your payment could not be approved. Please verify your information or call us."
  return { success: false as const, message }
}
