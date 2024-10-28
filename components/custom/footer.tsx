import footerLinks from "@/lib/footer-links";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { FaFacebookSquare as Facebook } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <footer className="w-full border mt-10 p-4">
        <div className="max-w-7xl mx-auto flex lg:flex-row flex-col gap-10  py-10">
          <div className="w-full lg:w-1/3 space-y-5">
            <h2 className="text-2xl font-extrabold">About</h2>
            <p className="text-sm font-bold">
              The Public Works, Irrigation & Local Self Government Departments
              of Government of Kerala have united over a common goal and formed
              a non-profit organization with over 3000 engineers. This
              organization provides free technical materials for the public and
              civil engineers in the private sector, technical papers from its
              members, and government circulars and orders related to
              construction and infrastructural development.
            </p>
          </div>
          <div className="w-full lg:w-1/3 flex flex-col items-start lg:px-10 space-y-5">
            <h2 className="text-2xl font-extrabold">Useful Links</h2>
            <ul className="space-y-2 text-sm font-bold">
              {footerLinks.map((footerLink) => (
                <FooterLinks
                  key={footerLink.label}
                  label={footerLink.label}
                  href={footerLink.href}
                />
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-1/3 space-y-5">
            <h2 className="text-2xl font-extrabold">Follow Us</h2>
            <a
              href="https://www.facebook.com/aoekerala"
              target="_blank"
              className=" block"
            >
              <Facebook size={32} className="text-blue-500" />
            </a>
          </div>
        </div>
      </footer>
      <div className="w-full text-center bg-black py-5 text-white">
        <span className="text-yellow-500 font-bold">AOEK</span> &copy;{" "}
        {new Date().getFullYear()} - Powered by Ervinor
      </div>
    </>
  );
};

export default Footer;

const FooterLinks = ({ label, href }: { label: string; href: string }) => {
  return (
    <div className="flex items-center hover:text-primary">
      <ChevronRight size={18} />
      <Link href={href}>{label}</Link>
    </div>
  );
};
