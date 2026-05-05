'use client';

import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function ContactUs() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-smeda-blue rounded flex items-center justify-center font-bold text-white uppercase tracking-tight">S</div>
              <span className="text-xl font-bold text-smeda-blue uppercase tracking-wider">SMEDA</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Small and Medium Enterprises Development Authority (SMEDA) is the premier SME development body of the Government of Pakistan.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook className="w-5 h-5" />} />
              <SocialIcon icon={<Twitter className="w-5 h-5" />} />
              <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
              <SocialIcon icon={<Youtube className="w-5 h-5" />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px]">Portal Links</h4>
            <ul className="space-y-4">
              <FooterLink label="Search Products" />
              <FooterLink label="Compare Banks" />
              <FooterLink label="Regulatory Compliance" />
              <FooterLink label="Download Guides" />
              <FooterLink label="FAQS" />
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px]">Support & Resources</h4>
            <ul className="space-y-4">
              <FooterLink label="Financial Literacy Vids" />
              <FooterLink label="Grievance Redressal" />
              <FooterLink label="Policy Documentation" />
              <FooterLink label="Privacy Policy" />
              <FooterLink label="Terms of Service" />
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px]">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-smeda-blue flex-shrink-0" />
                <p className="text-sm text-slate-600 leading-snug">
                  6th Floor, LDA Plaza, Egerton Road, Lahore, Pakistan
                </p>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-smeda-blue flex-shrink-0" />
                <p className="text-sm text-slate-600 leading-snug">+92 42 111 111 456</p>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-smeda-blue flex-shrink-0" />
                <p className="text-sm text-slate-600 leading-snug">info@smeda.org.pk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © 2025 SMEDA Pakistan - Financial Services Portal. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              Government of Pakistan <div className="w-1 h-1 bg-slate-300 rounded-full" />
            </span>
            <div className="flex items-center gap-2 text-slate-400 hover:text-smeda-blue cursor-pointer transition-colors">
              <span className="text-xs font-semibold">Web Portal Portal</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <li>
      <button className="text-sm text-slate-500 hover:text-smeda-blue transition-colors flex items-center gap-2 group">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-smeda-blue transition-colors" />
        {label}
      </button>
    </li>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-2 border border-slate-100 rounded-lg text-slate-400 hover:text-white hover:bg-smeda-blue hover:border-smeda-blue transition-all">
      {icon}
    </button>
  );
}
