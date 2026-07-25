import {
  IconInstagram,
  IconFacebook,
  IconTwitter,
  IconYoutube,
  IconLinkedin,
} from "./ContactIcons";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    handle: "@breakfastclub.pk",
    url: "https://instagram.com",
    icon: IconInstagram,
    bgColor: "hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-500 hover:to-amber-500 hover:text-white",
    iconColor: "text-pink-600",
    borderColor: "hover:border-pink-500",
  },
  {
    name: "Facebook",
    handle: "facebook.com/breakfastclub",
    url: "https://facebook.com",
    icon: IconFacebook,
    bgColor: "hover:bg-blue-600 hover:text-white",
    iconColor: "text-blue-600",
    borderColor: "hover:border-blue-600",
  },
  {
    name: "Twitter (X)",
    handle: "@breakfastclub",
    url: "https://twitter.com",
    icon: IconTwitter,
    bgColor: "hover:bg-black hover:text-white",
    iconColor: "text-gray-900",
    borderColor: "hover:border-black",
  },
  {
    name: "YouTube",
    handle: "BreakfastClubTV",
    url: "https://youtube.com",
    icon: IconYoutube,
    bgColor: "hover:bg-red-600 hover:text-white",
    iconColor: "text-red-600",
    borderColor: "hover:border-red-600",
  },
  {
    name: "LinkedIn",
    handle: "The Breakfast Club",
    url: "https://linkedin.com",
    icon: IconLinkedin,
    bgColor: "hover:bg-blue-700 hover:text-white",
    iconColor: "text-blue-700",
    borderColor: "hover:border-blue-700",
  },
];

export default function SocialFollow() {
  return (
    <div className="bg-linear-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-200/80 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-block bg-amber-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold font-pixelify-sans uppercase tracking-wider">
          Stay Connected
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-pixelify-sans text-gray-900">
          Follow Us
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 font-pixelify-sans">
          Join our online community for daily food stories, morning specials, behind-the-scenes chef clips, and exclusive branch discounts!
        </p>
      </div>

      {/* Grid of 5 Social Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {SOCIAL_LINKS.map((social) => {
          const IconComp = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-white border border-gray-200 ${social.borderColor} ${social.bgColor} rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2.5 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 group`}
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center ${social.iconColor} group-hover:text-white group-hover:bg-white/20 transition-colors`}
              >
                <IconComp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold font-pixelify-sans text-sm text-gray-900 group-hover:text-white transition-colors">
                  {social.name}
                </h4>
                <p className="text-[11px] font-pixelify-sans text-gray-500 group-hover:text-white/80 transition-colors truncate max-w-30">
                  {social.handle}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
