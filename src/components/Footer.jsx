import { Link } from 'react-router-dom'

const footerLinks = {
  Support: ['Help Center', 'Safety Info', 'Cancellation Options', 'Report a Concern'],
  Company: ['About Us', 'Careers', 'Press', 'Investor Relations'],
  Destinations: ['Kigali', 'Cape Town', 'Nairobi', 'Lagos', 'Zanzibar'],
  Hosting: ['List your property', 'Host resources', 'Community forum', 'Host responsibly'],
}

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-sm text-gray-600 hover:text-[#003580] hover:underline transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#003580] rounded-md px-2 py-1">
              <span className="text-white font-black text-base tracking-tight">Stay</span>
              <span className="text-[#febb02] font-black text-base">Africa</span>
            </div>
            <span className="text-gray-500 text-sm">© {new Date().getFullYear()} StayAfrica. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link to="#" className="hover:text-[#003580] transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-[#003580] transition-colors">Terms</Link>
            <Link to="#" className="hover:text-[#003580] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
