"use client"

import { useState, useRef } from "react"
import { ChevronDown, Users, DollarSign, TrendingUp, HelpCircle, X, Volume2, VolumeX, Play, Pause } from "lucide-react"

export default function FinalStepPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [days, setDays] = useState(1)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const checkoutUrl = "/checkout?product=main-47"

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(!isMuted)
  }

  const togglePlayPause = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleFAQ = (index: number) => setOpenFAQ(openFAQ === index ? null : index)
  const calculateProfit = (value: number) => Math.floor(1000 * Math.pow(1.15, value - 1))
  const profit = calculateProfit(days)

  const faqs = [
    { question: "How much money can I generate?", answer: "As much as you want! The AI system has unlimited earning potential based on how much you use it." },
    { question: "How often can I withdraw the profits?", answer: "Anytime you want! You have complete control over when to withdraw your earnings." },
    { question: "How much time do I have to dedicate in order to make money?", answer: "Just a couple hours a week. The AI does the heavy lifting while you focus on the simple tasks." },
    { question: "What skills do I need in order to use it?", answer: "The only skill you need is to be able to listen. If you can follow simple instructions, you can succeed." },
    { question: "What if it will not make me profits?", answer: "If you do not make money, we will refund everything you invest. We stand behind our system 100% with a full money-back guarantee." },
    { question: "Is it free?", answer: "The actual AI is free! This system is normally selling for $25,000 but you're getting test access today for just $1." },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <section className="bg-gray-900 py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'%3E%3Crect width='1200' height='675' fill='%23000'/%3E%3C/svg%3E"
              className="w-full h-auto"
              style={{ maxHeight: "600px" }}
              src="https://github.com/R3n3gade-ai/video-urls/releases/download/v1.0/Untitled.design.2.mp4"
            />

            <button onClick={togglePlayPause} className="absolute top-2 left-2 md:top-4 md:left-4 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-colors z-10">
              {isPlaying ? <Pause className="w-4 h-4 md:w-6 md:h-6" /> : <Play className="w-4 h-4 md:w-6 md:h-6" />}
            </button>

            <button onClick={toggleMute} className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-colors z-10">
              {isMuted ? <VolumeX className="w-4 h-4 md:w-6 md:h-6" /> : <Volume2 className="w-4 h-4 md:w-6 md:h-6" />}
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <div className="bg-[#5B5FED] text-white px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg">
              73 people are watching right now
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
            FINAL <span className="text-[#5B5FED]">STEP!</span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
            <div className="bg-white border-2 border-[#5B5FED] rounded-2xl p-6 flex items-center gap-4">
              <div className="bg-[#5B5FED]/10 p-3 rounded-xl"><Users className="w-8 h-8 text-[#5B5FED]" /></div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total users</p>
                <p className="text-3xl font-bold text-green-600">750</p>
              </div>
            </div>
            <div className="bg-white border-2 border-[#5B5FED] rounded-2xl p-6 flex items-center gap-4">
              <div className="bg-[#5B5FED]/10 p-3 rounded-xl"><DollarSign className="w-8 h-8 text-[#5B5FED]" /></div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total profits made</p>
                <p className="text-3xl font-bold text-green-600">$18,432,287</p>
              </div>
            </div>
            <div className="bg-white border-2 border-[#5B5FED] rounded-2xl p-6 flex items-center gap-4">
              <div className="bg-[#5B5FED]/10 p-3 rounded-xl"><TrendingUp className="w-8 h-8 text-[#5B5FED]" /></div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Average profit per user</p>
                <p className="text-3xl font-bold text-green-600">$23,560</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-center mb-8">EXPLORE EARNINGS</h2>
              <div className="text-center mb-6">
                <p className="text-sm font-semibold mb-2">Potential Profit:</p>
                <p className="text-5xl font-bold text-[#5B5FED]">${profit.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Days: {days}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #000 0%, #000 ${((days - 1) / 29) * 100}%, #e5e7eb ${((days - 1) / 29) * 100}%, #e5e7eb 100%)`,
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border-2 border-[#5B5FED]">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-4">ATTENTION!</h2>
              <p className="text-center font-bold text-sm md:text-base mb-2">Selling Out Fast - Act Now!</p>
              <p className="text-center font-bold text-red-600 text-sm md:text-base mb-6">ONLY 1 spot is available</p>
              <div className="text-center mb-6">
                <p className="text-xs md:text-sm mb-1">Regular Price: <span className="line-through">$599</span></p>
                <p className="text-sm md:text-base font-bold mb-4">Test Price: $1</p>
                <p className="text-xs text-gray-600 mb-6">Click before it's gone!</p>
              <a
                href={checkoutUrl}
                className="inline-flex items-center justify-center bg-[#5B5FED] hover:bg-[#4A4EDD] text-white font-bold py-3 px-6 md:px-8 rounded-full text-base md:text-lg transition-colors w-full"
              >
                BUY NOW FOR $1
              </a>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <HelpCircle className="w-10 h-10 text-[#5B5FED]" />
                <h2 className="text-3xl font-bold">FAQ</h2>
              </div>
            </div>

            <div className="space-y-4 mb-12">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full bg-[#E8E9FF] hover:bg-[#D8DAFF] rounded-2xl p-6 text-left flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform flex-shrink-0 ${openFAQ === index ? "rotate-180" : ""}`} />
                  </button>
                  {openFAQ === index && (
                    <div className="bg-white border-2 border-[#E8E9FF] rounded-xl p-6 mt-2">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href={checkoutUrl}
                className="inline-flex items-center justify-center bg-[#5B5FED] hover:bg-[#4A4EDD] text-white font-bold py-4 px-12 rounded-full text-xl transition-colors"
              >
                GAIN ACCESS
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">This site is not a part of the Facebook website or Facebook Inc.</p>
            <p className="text-sm text-gray-600">Additionally, This site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
