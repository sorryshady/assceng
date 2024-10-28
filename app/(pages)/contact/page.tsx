import ContactForm from "@/components/custom/contact-form";
import EmbedMap from "@/components/custom/embed-map";
import { Separator } from "@/components/ui/separator";
import { MailOpen, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto p-5 space-y-16">
      <h1 className="text-5xl font-bold text-center">Contact Us</h1>
      <div className="flex gap-10 lg:gap-5 lg:flex-row flex-col-reverse">
        <div className="w-full lg:w-1/3 space-y-8 border p-8 rounded-md shadow-md bg-primary-foreground">
          <h2 className="text-3xl font-extrabold">Get In Touch</h2>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold underline">General Secretary</h3>
            <p>Vinod S</p>
            <p>Assistant Executive Engineer</p>
            <p>Email: vinod_shamsudeen@gmail.com</p>
            <p>Mobile: 9847062932</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold underline">Website Administrator</h3>
            <p>Vishnu K R</p>
            <p>Assistant Engineer</p>
            <p>Email: vishnugect@gmail.com</p>
            <p>Mobile: 8129166086</p>
          </div>
          <Separator />
          <div className="flex items-start justify-start gap-5">
            <MapPin size={32} />
            <div>
              <h3 className="font-bold text-lg">Office Address</h3>
              <p>
                Association of Engineers Kerala, PMG
                <br />
                Junction, Vikas Bhavan P O
              </p>
              <p>Thiruvananthapuram -695 033</p>
            </div>
          </div>
          <div className="flex items-start justify-start gap-5">
            <Phone size={32} />
            <div>
              <h3 className="font-bold text-lg">Phone</h3>
              <a href="tel:+919544339218" className="hover:text-primary">
                +91 9544339218
              </a>
            </div>
          </div>
          <div className="flex items-start justify-start gap-5">
            <MailOpen size={32} />
            <div>
              <h3 className="font-bold text-lg">Email</h3>
              <a
                href="mailto:aoekerala@gmail.com"
                className="hover:text-primary"
              >
                aoekerala@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          <ContactForm />
        </div>
      </div>
      <EmbedMap />
    </div>
  );
}
