import React from "react";
import ContactForm from "@/components/Forms/ContactForm";

const ContactUsPage = () => {
  return (
    <div className="w-4/5 mt-4 border border-neutral-800 bg-transparent mx-auto p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-4">Contact Us</h1>
      <ContactForm />
    </div>
  );
};

export default ContactUsPage;
