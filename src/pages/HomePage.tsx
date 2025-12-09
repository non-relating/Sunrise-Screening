import React from 'react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1596529847296-12c82307204f?q=80&w=2000&auto=format&fit=crop" 
            alt="Florida Pool Enclosure at Sunrise" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/95 via-sky-900/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/90 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            src="/sunrise-logo.png"
            alt="Sunrise Screening logo"
            className="w-40 mx-auto mb-6 filter drop-shadow-lg"
            data-aos="fade-up"
            data-aos-delay="200"
          />
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.2] mb-6 drop-shadow-lg"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Fast, Reliable Pool Screen Repair — <span className="text-amber-300">Built for Florida Weather</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg lg:text-xl text-sky-100 mb-10 leading-relaxed font-medium drop-shadow max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            St. Petersburg's trusted screen repair & replacement specialists. No delays, no surprises — just clean, high-quality work done right the first time.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <a 
              href="/quote"
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-amber-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Get a Free Quote
            </a>
            <a 
              href="tel:+15551234567"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 hover:border-white/50"
            >
              Call Now – We Answer
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white dark:bg-slate-800 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
            data-aos="fade-up"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
              Expert Pool Screen Repair & Replacement
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="200">
            {[
              {
                title: "Screen Panel Repair",
                description: "Fix torn or sagging panels with durable replacements.",
                icon: "🔧"
              },
              {
                title: "Full Enclosure Rescreens", 
                description: "Transform your pool area with premium, long-lasting mesh.",
                icon: "🏠"
              },
              {
                title: "Storm-Ready Materials",
                description: "High-tensile mesh built for Florida's weather extremes.",
                icon: "🛡️"
              },
              {
                title: "Pet & No-See-Um Mesh",
                description: "Keep out pests and protect your pets with reinforced screens.",
                icon: "🐕"
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group h-full bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors shadow-sm text-2xl">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-sky-600 transition-colors">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-slate-600">
              <strong>Coming soon:</strong> Pool cleaning & water treatment services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
            data-aos="fade-up"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
              What Your Neighbors Are Saying
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stars: "★★★★★",
                text: "They replaced our entire lanai screen within days. Polite, fast, and flawless work!",
                author: "Alyssa M., Shore Acres"
              },
              {
                stars: "★★★★★", 
                text: "Finally found a company that answers calls and shows up on time. Top-notch!",
                author: "Robert K., Old Northeast"
              },
              {
                stars: "★★★★★",
                text: "Hurricane damage fixed same week — our enclosure looks brand new.",
                author: "Maria S., Snell Isle"
              },
              {
                stars: "★★★★★",
                text: "Professional team with fair pricing. They left everything clean and perfect.",
                author: "David P., Gulfport"
              }
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <div className="text-amber-400 text-xl mb-3">{review.stars}</div>
                <p className="text-slate-600 leading-relaxed mb-4 italic">"{review.text}"</p>
                <strong className="text-slate-800">— {review.author}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Why Homeowners Choose Sunrise Screening
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "✅ Fast Scheduling",
                description: "We answer and arrive when promised."
              },
              {
                title: "✅ Transparent Pricing", 
                description: "No hidden fees or upsells."
              },
              {
                title: "✅ Professional Work",
                description: "Clean, respectful craftsmanship."
              },
              {
                title: "✅ Durable Materials",
                description: "Florida-tested and UV-resistant."
              },
              {
                title: "✅ Local Integrity",
                description: "Proudly serving St. Pete with honesty."
              }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
              >
                <h3 className="font-bold text-slate-800 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="quote" className="py-24 bg-sky-900 text-white relative">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              Ready for Fast, Reliable Pool Screen Repair?
            </h2>
            <p className="text-xl text-sky-100 mb-8">
              Get your enclosure looking brand new — without the hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="/quote"
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Request Your Free Quote
              </a>
              <a 
                href="tel:+15551234567"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 hover:border-white/50"
              >
                📞 Call Now
              </a>
            </div>
            <div className="text-sky-100">
              <p>📧 info@sunrisescreening.com</p>
              <p>📍 St. Petersburg, FL</p>
              <p>Hours: Mon–Sat, 8 am–6 pm</p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;