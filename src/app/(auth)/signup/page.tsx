import SignupForm from '@/components/Auth/User/Signup/SignupForm'
import React from 'react'
import { Signup } from '@/lib/auth';

export default function SignupPage() {
  return (
    <div>
      <section>
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Signup Image"
              src="/Images/signupImage.jpg"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to GearBox
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>
            </div>
          </section>
          <main className="flex items-center justify-center px-8 py-2 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative mt-16 block lg:hidden">
                <h1 className="mt-2 text-2xl font-bold  sm:text-3xl md:text-4xl">
                  Welcome to GearBox
                </h1>
                <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
                </p>
              </div>
              <SignupForm  action={Signup} />
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
