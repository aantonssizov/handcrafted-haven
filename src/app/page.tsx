import Image from "next/image";
import { heading } from "./fonts";
import heroImage from "../../public/images/handcrafted-haven-hero.jpg";
import artisanImage from "../../public/images/handcrafted-haven-artisans.jpg";
import customerImage from "../../public/images/handcrafted-haven-costomers.jpg";

export default function Page() {
  return (
    <main className="text-slate-900">
      <section className="relative min-h-screen text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage.src})` }}
        />
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 py-12 pb-15 sm:px-10 lg:px-10">
          <div className="max-w-2xl space-y-6">
            <h1
              className={`mt-6 text-5xl font-black tracking-tight text-gold-bold sm:text-6xl ${heading.className}`}
            >
              Revolutionary Platform for Artisans
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-100/90 whitespace-pre-line">
              Handcrafted Haven is an innovative web application that aims to
              provide a platform for artisans and crafters to showcase and sell
              their unique handcrafted items. It serves as a virtual
              marketplace, connecting talented creators with potential customers
              who appreciate the beauty and quality of handmade products. The
              application focuses on fostering a sense of community, supporting
              local artisans, and promoting sustainable consumption.
            </p>
            <div className="mt-8 mb-15">
              <a
                href="/login"
                className="inline-flex items-center rounded-[5px] bg-[#FFE169] px-8 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-[#FFE169]/30 transition hover:bg-[#FDDD5E]"
              >
                Start Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="space-y-5">
              <h2
                className={`text-3xl font-bold text-[#DBB42C] ${heading.className}`}
              >
                Artisans
              </h2>
              <div className="overflow-hidden rounded-[5px] bg-slate-100">
                <Image
                  src={artisanImage}
                  alt="Artisan crafting handmade goods"
                  className="h-full w-full object-cover"
                  placeholder="blur"
                />
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-700">
                Our platform presents your products to customers and connects
                you to other artisans.
              </p>
            </article>

            <article className="space-y-5">
              <h2
                className={`text-3xl font-bold text-[#DBB42C] ${heading.className}`}
              >
                Customers
              </h2>
              <div className="overflow-hidden rounded-[5px] bg-slate-100">
                <Image
                  src={customerImage}
                  alt="Customer using a laptop to shop handmade goods"
                  className="h-full w-full object-cover"
                  placeholder="blur"
                />
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-700">
                Our platform connects you quality handmade crafts of your
                desired design on a budget you can afford.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-10">
          <div className="max-w-3xl space-y-4 text-left">
            <p className="text-sm uppercase tracking-[0.28em] text-[#1B5E20]">
              Testimonials
            </p>
            <h2
              className={`text-4xl font-bold text-slate-950 ${heading.className}`}
            >
              What Our App Users Say
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[5px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm leading-7 text-slate-700">
                “Joining this platform helped me reach customers I never would
                have found on my own. Listing my handmade ceramics was simple,
                and I started receiving orders within my first few weeks. It
                opened a wonderful way to grow my small business while focusing
                on what I love—creating.”
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1B5E20]/10 text-[#1B5E20]">
                  S
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Sarah Smith</p>
                  <p className="text-sm text-slate-500">Ceramic Artisan</p>
                </div>
              </div>
            </article>

            <article className="rounded-[5px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm leading-7 text-slate-700">
                “I was looking for a unique birthday gift and found a beautiful
                handcrafted leather journal on this app. The quality exceeded my
                expectations, and it felt great knowing I was supporting a local
                artisan instead of buying something mass-produced. I have
                already used this app to buy jewellery now I am a regular.”
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1B5E20]/10 text-[#1B5E20]">
                  O
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Olivia T</p>
                  <p className="text-sm text-slate-500">Regular Customer</p>
                </div>
              </div>
            </article>

            <article className="rounded-[5px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm leading-7 text-slate-700">
                “As a full-time artisan, I wanted a place where people truly
                appreciate handmade work. This app made it easy to showcase my
                products, manage my orders, and connect with customers who value
                craftsmanship. I`ve seen both my sales and confidence grow.”
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1B5E20]/10 text-[#1B5E20]">
                  J
                </div>
                <div>
                  <p className="font-semibold text-slate-900">James M</p>
                  <p className="text-sm text-slate-500">Wood Worker</p>
                </div>
              </div>
            </article>

            <article className="rounded-[5px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm leading-7 text-slate-700">
                “Shopping here was such a refreshing experience. I loved
                browsing products made by real artisans, reading their stories,
                and finding one-of-a-kind pieces. My handmade wooden serving
                board arrived beautifully crafted, and I’ll definitely be back
                for more.”
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1B5E20]/10 text-[#1B5E20]">
                  D
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Daniel R</p>
                  <p className="text-sm text-slate-500">Regular Customer</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#1B5E20] py-16 text-white">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div className="space-y-4">
              <p
                className={`text-sm uppercase tracking-[0.28em] text-[#FFE169] ${heading.className}`}
              >
                Ready to get started?
              </p>
              <h2 className={`text-4xl font-bold ${heading.className}`}>
                Create your artisan storefront and connect with buyers today.
              </h2>
              <p className="max-w-xl text-sm leading-7 text-slate-100/90">
                Join Handcrafted Haven now to sell your handmade goods, manage
                orders effortlessly, and grow your craft business with a
                supportive community.
              </p>
            </div>

            <div className="flex items-center">
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-[5px] bg-[#FFE169] px-8 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-[#FFE169]/30 transition hover:bg-[#FDDD5E]"
              >
                Start Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
