"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Link from "next/link";
import { Blocks } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const ENABLE_TWITTER = process.env.NEXT_PUBLIC_ENABLE_TWITTER === 'true';

const Navabar = () => {
  const { account } = useWallet();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ENABLE_TWITTER || !account?.address || !API_BASE) return;

    fetch(`${API_BASE}/twitter_status?wallet_address=${account.address}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.new) {
          router.push("/onboarding/user");
        } else if (pathname === "/onboarding/user") {
          router.push("/user/campaign");
        }
      })
      .catch((error) => {
        console.error("Error fetching Twitter status:", error);
      });
  }, [account, pathname]);

  return (
    <div>
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="flex items-center justify-center cursor-pointer" onClick={() => router.push("/")}>
          <Blocks className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">Stream</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="/#features">
            Features
          </Link>
          <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="/#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors" href="/#faqs">
            FAQs
          </Link>
        </nav>
        <div>
          <WalletSelector />
        </div>
      </header>
    </div>
  );
};

export default Navabar;
