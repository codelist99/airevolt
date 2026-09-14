"use client"

import { useState } from "react"
import { Check, X, Clock, Zap, TrendingUp } from "lucide-react"

export default function LastChance47() {
  const [showCheckout, setShowCheckout] = useState(false)
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              We Noticed You Didn't Complete Your Order...
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4">
              So We're Extending This ONE-TIME Offer
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border-4 border-red-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-6">
                <Zap className="w-16 h-16 text-red-600" />
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Infinite AI Revolution</h2>
              </div>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
                Get <span className="font-bold text-red-600">UNLIMITED ACCESS</span> to Our AI Money-Making System
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 mb-8 text-white">
              <h3 className="text-2xl font-bold text-center mb-6">Compare The Value:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">Regular Price</p>
                  <p className="text-4xl font-bold line-through text-red-400">$299</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-yellow-400 mb-2 font-bold">YOUR SPECIAL PRICE TODAY</p>
                  <p className="text-6xl font-black text-yellow-400">$1</p>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-green-100 text-green-800 px-6 py-4 rounded-full mb-4">
                <Check className="w-6 h-6" />
                <span className="font-bold">100% Money-Back Guarantee</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-black text-2xl py-6 px-8 rounded-full transition-all shadow-2xl mb-4"
            >
              YES! GIVE ME INFINITE AI FOR JUST $1
            </button>
          </div>
        </div>
      </section>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setShowCheckout(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-center mb-2">Secure Your $1 Deal!</h2>
            <p className="text-center text-gray-600 mb-6">Get instant access to Infinite AI Revolution</p>
            <a href="/checkout?product=downsell-47" className="block w-full rounded-full bg-gradient-to-r from-red-600 to-orange-600 px-6 py-4 text-center text-base font-bold text-white shadow-lg transition hover:from-red-700 hover:to-orange-700">
              Complete Secure Order
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
