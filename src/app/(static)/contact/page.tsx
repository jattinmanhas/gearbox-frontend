import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import ContactForm from "@/components/Forms/ContactForm";

const ContactUsPage = () => {
  return (
    <Card className="w-4/5 mx-auto mt-4 px-8 py-4 bg-neutral-900">
      <CardTitle className="text-2xl underline underline-offset-4">CONTACT US</CardTitle>
      <ContactForm />
    </Card>
  );
};

export default ContactUsPage;
