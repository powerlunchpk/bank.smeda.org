'use client';

import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

import { useSettings } from '@/lib/context/SettingsContext';

export default function ContactUs() {
  const { t } = useSettings();

  return (
    <footer className="bg-card-bg pt-20 pb-10 border-t border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-white uppercase tracking-tight">S</div>
              <span className="text-xl font-bold text-primary uppercase tracking-wider">SMEDA</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-8">
              {t.footer.desc}
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
            <h4 className="text-text-main font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px]">{t.footer.links}</h4>
            <ul className="space-y-4">
              <FooterLink label={t.footer.search} />
              <FooterLink label={t.footer.compareBanks} />
              <FooterLink label={t.footer.regulatoryCompliance} />
              <FooterLink label={t.footer.downloadGuides} />
              <FooterLink label={t.footer.faqs} />
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-text-main font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px]">{t.footer.support}</h4>
            <ul className="space-y-4">
              <FooterLink label={t.footer.literacy} />
              <FooterLink label={t.footer.grievance} />
              <FooterLink label={t.footer.policyDoc} />
              <FooterLink label={t.footer.privacyPolicy} />
              <FooterLink label={t.footer.termsOfService} />
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-text-main font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px]">{t.footer.contact}</h4>
            <div className="space-y-6">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-text-muted leading-snug">
                  {t.footer.address}
                </p>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-text-muted leading-snug">+92 42 111 111 456</p>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-text-muted leading-snug">info@smeda.org.pk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
              {t.incentives.govPak} <div className="w-1 h-1 bg-border rounded-full" />
            </span>
            <div className="flex items-center gap-2 text-text-muted hover:text-primary cursor-pointer transition-colors">
              <span className="text-xs font-semibold">{t.footer.webPortal}</span>
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
      <button className="text-sm text-text-muted hover:text-primary transition-colors flex items-center gap-2 group">
        <div className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
        {label}
      </button>
    </li>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-2 border border-border rounded-lg text-text-muted hover:text-white hover:bg-primary hover:border-primary transition-all">
      {icon}
    </button>
  );
}
