import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const navLinks = [
    { text: 'Home', url: '#', current: true },
    { text: 'About', url: '#' },
    { text: 'Services', url: '#' },
    { text: 'Contact', url: '#' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('overflow-hidden');
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      buttonRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
      document.body.classList.remove('overflow-hidden');
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="font-inter">
      <nav className="border-gray-200 bg-white">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold">
              Flowbite
            </span>
          </a>
          <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Get started
            </button>
            <div
              ref={buttonRef}
              className="relative h-4 w-6 cursor-pointer md:hidden"
              onClick={handleMenuToggle}
            >
              <span
                className={`absolute top-0 block h-0.5 w-full bg-black transition-all duration-300 ease-in-out ${isMenuOpen ? 'open' : ''}`}
                style={
                  isMenuOpen
                    ? {
                        transform: 'translateY(-50%) rotate(45deg)',
                        top: '50%',
                      }
                    : {}
                }
              ></span>
              <span
                className={`absolute top-1/2 block h-0.5 w-full -translate-y-1/2 bg-black transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                className={`absolute top-full block h-0.5 w-full -translate-y-full bg-black transition-all duration-300 ease-in-out ${isMenuOpen ? 'open' : ''}`}
                style={
                  isMenuOpen
                    ? {
                        transform: 'translateY(-50%) rotate(-45deg)',
                        top: '50%',
                      }
                    : {}
                }
              ></span>
            </div>
          </div>
          <div
            ref={menuRef}
            className={`absolute right-0 mx-auto w-full items-center justify-between transition-transform duration-300 ease-in-out max-md:top-12 md:relative md:order-1 md:flex md:w-auto ${isMenuOpen ? 'translate-x-0' : 'max-md:-translate-x-full'}`}
          >
            <ul className="mt-6 flex flex-col space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium max-md:mx-4 md:mt-0 md:flex-row md:space-x-8 md:space-y-0 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <li key={link.text}>
                  <a
                    href={link.url}
                    className={`block rounded px-3 py-2 font-poppins font-medium md:p-0 md:hover:bg-transparent ${
                      link.current
                        ? 'bg-blue-700 text-white hover:bg-blue-700 md:bg-transparent md:text-blue-700'
                        : 'text-gray-900 hover:bg-gray-100 md:hover:text-blue-700'
                    }`}
                    aria-current={link.current ? 'page' : undefined}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
