"use client";

import { useEffect, useState } from "react";

import { Button, Typography, Space, Result, Card } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function NotFound() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSearching, setIsSearching] = useState(true);
  const [showReturn, setShowReturn] = useState(false);

  useEffect(() => {
    // Character movement animation
    const interval = setInterval(() => {
      if (isSearching) {
        setPosition({
          x: Math.sin(Date.now() / 500) * 30,
          y: Math.sin(Date.now() / 700) * 15,
        });
      }
    }, 50);

    // Stop searching after 4 seconds and look confused
    const searchTimeout = setTimeout(() => {
      setIsSearching(false);
    }, 4000);

    // Show return button with a delay for better UX
    const buttonTimeout = setTimeout(() => {
      setShowReturn(true);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(searchTimeout);
      clearTimeout(buttonTimeout);
    };
  }, [isSearching]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

        {/* Floating elements */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative w-full max-w-lg mx-auto text-center space-y-8 z-10">
        {/* Character animation container */}
        <div className="relative h-80 w-full mx-auto">
          {/* Character */}
          <div
            className="absolute transition-all duration-300 ease-in-out"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              left: "calc(50% - 40px)",
              top: "calc(50% - 60px)",
            }}
          >
            {/* Character Head */}
            <div className="w-20 h-20 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full flex items-center justify-center relative shadow-lg">
              {/* Eyes */}
              <div
                className={`absolute w-4 h-${
                  isSearching ? "4" : "1"
                } bg-white rounded-full left-4 top-6 transition-all duration-300`}
              ></div>
              <div
                className={`absolute w-4 h-${
                  isSearching ? "4" : "1"
                } bg-white rounded-full right-4 top-6 transition-all duration-300`}
              ></div>

              {/* Eyebrows */}
              <div
                className="absolute w-5 h-1.5 bg-blue-400/20 rounded-full left-3.5 top-4 transition-all duration-300"
                style={{
                  transform: isSearching ? "rotate(0deg)" : "rotate(-20deg)",
                }}
              ></div>
              <div
                className="absolute w-5 h-1.5 bg-blue-400/20 rounded-full right-3.5 top-4 transition-all duration-300"
                style={{
                  transform: isSearching ? "rotate(0deg)" : "rotate(20deg)",
                }}
              ></div>

              {/* Mouth */}
              <div
                className="absolute bg-white rounded-full transition-all duration-500"
                style={{
                  width: isSearching ? "8px" : "14px",
                  height: isSearching ? "8px" : "7px",
                  bottom: "5px",
                  left: "calc(50% - 7px)",
                  transform: isSearching ? "none" : "rotate(180deg)",
                }}
              ></div>

              {/* Blush */}
              <div className="absolute w-4 h-2 bg-blue-400/20 rounded-full left-3 bottom-5 opacity-60"></div>
              <div className="absolute w-4 h-2 bg-blue-400/20 rounded-full right-3 bottom-5 opacity-60"></div>
            </div>

            {/* Character Body */}
            <div className="w-16 h-24 bg-gradient-to-b from-blue-500 to-blue-600 mx-auto mt-2 rounded-2xl relative shadow-lg">
              {/* Arms */}
              <div
                className="absolute w-10 h-4 bg-blue-500 rounded-full left-[-24px] top-6 origin-right transition-all duration-500 shadow-sm"
                style={{
                  transform: `rotate(${
                    isSearching ? Math.sin(Date.now() / 400) * 40 : -30
                  }deg)`,
                }}
              ></div>
              <div
                className="absolute w-10 h-4 bg-blue-500 rounded-full right-[-24px] top-6 origin-left transition-all duration-500 shadow-sm"
                style={{
                  transform: `rotate(${
                    isSearching ? -Math.sin(Date.now() / 400) * 40 : 30
                  }deg)`,
                }}
              ></div>

              {/* Legs */}
              <div className="absolute w-5 h-12 bg-blue-500 rounded-b-2xl left-1.5 bottom-[-10px] shadow-sm"></div>
              <div className="absolute w-5 h-12 bg-blue-500 rounded-b-2xl right-1.5 bottom-[-10px] shadow-sm"></div>

              {/* Outfit details */}
              <div className="absolute w-10 h-3 bg-blue-400/10 rounded-full left-3 top-4"></div>
              <div className="absolute w-10 h-3 bg-blue-400/10 rounded-full left-3 top-9"></div>
            </div>
          </div>

          {/* Magnifying glass when searching */}
          {isSearching && (
            <div
              className="absolute transition-all duration-300 ease-in-out"
              style={{
                left: `calc(50% + ${position.x + 40}px)`,
                top: `calc(50% + ${position.y - 20}px)`,
                transform: "rotate(-30deg)",
              }}
            >
              <div className="w-16 h-16 border-4 border-gray-500 rounded-full relative shadow-md">
                <div className="absolute w-5 h-14 bg-gray-500 rounded-full rotate-45 left-12 top-10 shadow-sm"></div>
                <div className="absolute w-8 h-1 bg-gray-400 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-1 h-8 bg-gray-400 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          )}

          {/* Question marks when confused */}
          {!isSearching && (
            <>
              <div
                className="absolute text-3xl font-bold text-blue-500/70 animate-float-slow"
                style={{ left: "calc(50% - 40px)", top: "calc(30% - 60px)" }}
              >
                ?
              </div>
              <div
                className="absolute text-4xl font-bold text-blue-500/80 animate-float-slow delay-150"
                style={{ left: "calc(50% + 30px)", top: "calc(35% - 70px)" }}
              >
                ?
              </div>
              <div
                className="absolute text-2xl font-bold text-blue-500/60 animate-float-slow delay-300"
                style={{ left: "calc(50% + 15px)", top: "calc(25% - 60px)" }}
              >
                ?
              </div>
            </>
          )}

          {/* Search area highlight */}
          {isSearching && (
            <div
              className="absolute w-40  border border-dashed border-blue-500/30 rounded-full opacity-50"
              style={{
                left: `calc(50% - 20px + ${position.x * 1.2}px)`,
                top: `calc(50% - 20px + ${position.y * 1.2}px)`,
                animation: "pulse 2s infinite",
              }}
            ></div>
          )}
        </div>

        <div>
          <div />
          <p className="!text-4xl !font-bold !text-transparent !bg-clip-text !bg-gradient-to-r from-blue-500 to-blue-400 !drop-shadow-sm">
            404
          </p>
          <p className="!mt-2 !text-gray-700">Sorry, the page you visited does not exist</p>
        </div>

        <Space direction="vertical" size="large" className="w-full">
          

          <div
            className={`transition-all duration-700 transform ${
              showReturn
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Link href="/" className="inline-block">
              <Button
                type="primary"
                icon={<HomeOutlined className="animate-bounce-subtle" />}
                size="large"
                className="home-button !h-12 !px-8 !rounded-xl !border-none !shadow-lg !bg-gradient-animate"
              >
                Return to Home
              </Button>
            </Link>
          </div>
        </Space>
      </div>

      {/* Add custom animation keyframes and styles */}
      <style jsx global>{`
        /* Custom animations */
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Custom styles */
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .bg-gradient-animate {
          background: linear-gradient(
            90deg,
            #1677ff,
            #52c41a,
            #faad14,
            #f5222d,
            #722ed1
          ) !important;
          background-size: 300% 300% !important;
          animation: gradient-shift 5s ease infinite !important;
          transition: all 0.3s ease !important;
        }

        .home-button {
          position: relative;
        }

        .home-button::before {
          content: "";
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: linear-gradient(
            90deg,
            #1677ff,
            #52c41a,
            #faad14,
            #f5222d,
            #722ed1
          );
          background-size: 300% 300%;
          animation: gradient-shift 5s ease infinite;
          border-radius: 16px;
          z-index: -1;
          filter: blur(8px);
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .home-button:hover::before {
          opacity: 0.8;
        }

        .home-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </div>
  );
}
