import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const FloatingContact = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] animate-float">
      <Link
        to="/contact"
        className="
          flex items-center justify-center
          w-14 h-14 
          rounded-full 
          bg-accent text-dark
          shadow-[0_0_20px_rgba(6,182,212,0.4)]
          hover:shadow-[0_0_40px_rgba(6,182,212,0.7)]
          hover:scale-110
          transition-all duration-300
        "
        title="Contact Us"
      >
        <MessageCircle className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default FloatingContact;
