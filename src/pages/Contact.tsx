import React from 'react';
import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
      id="contact-page"
    >
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-primary">Get in Touch</h2>
        <p className="text-gray-500">
          Have any questions? We are here to help. Reach out to us via the form or contact details below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100" id="contact-form">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Subject</label>
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Message</label>
              <textarea
                placeholder="Your message here..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm resize-none"
              ></textarea>
            </div>
            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/20">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </section>

        {/* Contact info & Map placeholder */}
        <section className="space-y-8" id="contact-sidebar">
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-primary/5 p-6 rounded-2xl flex items-start gap-4 border border-primary/10">
              <div className="p-3 bg-primary text-white rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-primary">Our Address</h4>
                <p className="text-sm text-gray-600 mt-1">Station Road, Rangpur, Bangladesh</p>
              </div>
            </div>
            <div className="bg-secondary/5 p-6 rounded-2xl flex items-start gap-4 border border-secondary/10">
              <div className="p-3 bg-secondary text-white rounded-xl">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-secondary">Phone Number</h4>
                <p className="text-sm text-gray-600 mt-1">+880 1234 567890 (Main Office)</p>
              </div>
            </div>
            <div className="bg-primary/5 p-6 rounded-2xl flex items-start gap-4 border border-primary/10">
              <div className="p-3 bg-primary text-white rounded-xl">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-primary">Email Support</h4>
                <p className="text-sm text-gray-600 mt-1">info@rangpurgghs.edu.bd</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h4 className="font-bold text-primary flex items-center gap-2">
              <Clock className="w-5 h-5" /> Office Hours
            </h4>
            <div className="space-y-2 text-sm text-gray-500 font-medium">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span>Sunday - Thursday</span>
                <span className="text-primary">9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span>Saturday</span>
                <span className="text-primary">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Friday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
