import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Plane, Menu, User, Phone, MapPin, Mail, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationItems = [
  { name: "Home", url: createPageUrl("Home") },
  { name: "Bookings", url: createPageUrl("Bookings") },
  { name: "Fleet", url: createPageUrl("Fleet") },
  { name: "Staff", url: createPageUrl("Staff") },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const NavItems = ({ mobile = false, onItemClick = () => {} }) => (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          to={item.url}
          onClick={onItemClick}
          className={`${
            mobile
              ? "block px-3 py-2 text-lg font-medium"
              : "px-4 py-2 text-sm font-medium rounded-md"
          } transition-colors ${
            location.pathname === item.url
              ? "bg-amber-500 text-black"
              : "text-white hover:bg-amber-400 hover:text-black"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <style>{`
        :root {
          --primary-navy: #1e40af;
          --primary-sky: #0ea5e9;
          --accent-gold: #f59e0b;
          --text-charcoal: #374151;
        }
      `}</style>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-sky-800 shadow-xl relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.05'%3e%3cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e')] opacity-20"></div>
        
        <nav className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3 group">
              <div className="relative">
                <Plane className="h-8 w-8 text-amber-400 transition-transform group-hover:scale-110" />
                <div className="absolute -inset-1 bg-amber-400/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Monarch Air</span>
                <span className="text-xs text-amber-300 -mt-1">Virtual</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItems />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="text-white hover:bg-white/10 ml-4"
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="text-white hover:bg-white/10"
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] bg-blue-900 border-blue-800">
                    <div className="flex flex-col space-y-4 mt-8">
                      <NavItems mobile onItemClick={() => {}} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Plane className="h-8 w-8 text-amber-400" />
                <div>
                  <div className="text-xl font-bold">Monarch Air Virtual</div>
                  <div className="text-sm text-slate-400">Your journey begins here</div>
                </div>
              </div>
              <p className="text-slate-300 text-sm">
                Experience premium air travel with our world-class service and unmatched comfort.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.url}
                    className="block text-slate-300 hover:text-amber-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Customer Support</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <Mail className="h-4 w-4" />
                  <span>exec.monarch@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <MapPin className="h-4 w-4" />
                  <span>24/7 Customer Service</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-slate-400">
                &copy; 2025 Monarch Air Virtual. All rights reserved. Created by og_madrid.
              </p>
              <div className="flex space-x-6">
                <Link
                  to={createPageUrl("PrivacyPolicy")}
                  className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to={createPageUrl("TermsAndConditions")}
                  className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}