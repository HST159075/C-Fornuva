import React from 'react';
import Layout from '@/components/layout/Layout';

const TermsPage = () => {
  return (
    <Layout title="Terms & Conditions | FurNova">
      <div className="bg-[var(--background)] min-h-screen pt-12 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[4rem] border border-[var(--border)] shadow-sm space-y-12">
            <div className="space-y-4">
              <span className="text-[var(--primary)] font-semibold tracking-widest uppercase text-xs">Legal Information</span>
              <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
              <p className="text-[var(--muted)] font-medium">Last updated: May 04, 2024</p>
            </div>

            <div className="space-y-8 text-[var(--foreground)] leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Agreement to Terms</h2>
                <p>By accessing or using FurNova, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Intellectual Property</h2>
                <p>The content, design, and branding of FurNova are protected by copyright and other intellectual property laws. You may not use our assets without explicit permission.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. User Obligations</h2>
                <p>You agree to provide accurate information when creating an account and to maintain the security of your credentials.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. Limitation of Liability</h2>
                <p>FurNova shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
