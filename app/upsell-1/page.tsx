"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle2, Volume2 } from "lucide-react"

export default function Upsell1Page() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [seatsRemaining, setSeatsRemaining] = useState(7)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer1 = setTimeout(() => setSeatsRemaining(6), 20000) // 20 seconds
    const timer2 = setTimeout(() => setSeatsRemaining(5), 300000) // 5 minutes
    const timer3 = setTimeout(() => setSeatsRemaining(4), 480000) // 8 minutes

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false
        setIsMuted(false)
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        if (videoRef.current.paused) {
          videoRef.current.play()
          setIsPlaying(true)
        } else {
          videoRef.current.pause()
          setIsPlaying(false)
        }
      }
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)

      video.addEventListener("play", handlePlay)
      video.addEventListener("pause", handlePause)

      return () => {
        video.removeEventListener("play", handlePlay)
        video.removeEventListener("pause", handlePause)
      }
    }
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 py-6 md:py-8 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-3 md:mb-4">
          <div className="inline-block p-2 md:p-3 bg-green-500 rounded-full">
            <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3">Thank You!</h1>
        <p className="text-lg md:text-xl text-gray-200 mb-3 md:mb-4">Your order has been confirmed.</p>

        <div className="inline-block bg-yellow-400 text-black font-bold text-lg md:text-xl px-6 md:px-8 py-2 md:py-3 rounded mb-4 md:mb-6">
          IMPORTANT
        </div>

        <p className="text-white text-xl md:text-2xl lg:text-3xl font-semibold mb-2 md:mb-3 px-2">
          Watch this short video to unlock your next step
        </p>
        <p className="text-gray-300 text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 px-2">
          (It contains crucial information – don't skip!)
        </p>

        <div className="mb-6 md:mb-8 rounded-lg md:rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto relative">
          <video
            ref={videoRef}
            className="w-full aspect-video cursor-pointer"
            autoPlay
            muted
            playsInline
            preload="metadata"
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            style={{ pointerEvents: "auto" }}
          >
            <source
              src="https://yqcsqvhfpvxmdvd6.public.blob.vercel-storage.com/Recording%202025-12-14%20165135.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {isMuted && (
            <div
              onClick={handleVideoClick}
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity hover:bg-black/50"
            >
              <div className="text-center px-4">
                <Volume2 className="w-12 h-12 md:w-20 md:h-20 text-white mb-3 md:mb-4 mx-auto" />
                <p className="text-white text-lg md:text-2xl font-bold mb-1 md:mb-2">YOUR VIDEO IS PLAYING.</p>
                <p className="text-white text-base md:text-xl font-semibold">CLICK TO UNMUTE</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-xl mx-auto">
          <div className="inline-block bg-yellow-400 text-black font-bold text-xl md:text-2xl px-6 md:px-8 py-2 md:py-3 rounded-lg mb-3 md:mb-4">
            WAIT!
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
            You Will Never See This Page Again! Ever!
          </h2>

          <p className="text-red-600 font-bold text-base md:text-lg mb-4 md:mb-6">
            Only selling {seatsRemaining} more seats
          </p>

          {/* Offer Text */}
          <div className="mb-6 text-gray-700">
            <p className="text-lg mb-2">"I Don't Want Too Many People To Have This Mega Profit Module</p>
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-6 text-center text-sm text-slate-700">
            Complete your upgrade securely using Authorize.Net.
          </div>

          <div className="space-y-4">
            <a href="/checkout?product=upsell-97" className="inline-flex w-full justify-center rounded-full bg-yellow-400 px-6 py-4 text-xl font-bold text-black shadow-lg transition hover:bg-yellow-500">
              YES! ADD TO MY ORDER
            </a>

            <button
              onClick={() => (window.location.href = "/confirmation")}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-base md:text-lg py-3 px-6 rounded-lg transition-all"
            >
              No thank you, I want to skip this page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
