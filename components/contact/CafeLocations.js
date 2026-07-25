import { IconMapPin, IconClock, IconPhone } from "./ContactIcons";

const LOCATIONS = [
  {
    id: "shimla-hill",
    name: "Shimla Hill Abbottabad",
    tagline: "Food with beautiful scenery",
    badge: "Mountain View",
    description:
      "Perched on the scenic ridge of Shimla Hill, enjoy breathtaking panoramic views of Abbottabad valley while savoring our artisanal breakfasts, freshly baked pastries, and signature espresso blends in crisp hill station air.",
    address: "Shimla Hill Road, Top View Park, Abbottabad",
    phone: "+92 (0992) 861-421",
    hours: "08:00 AM – 10:00 PM Daily",
    features: ["Scenic View Deck", "Fresh Mountain Air", "Open Air Patio"],
    accentColor: "from-amber-500 to-orange-600",
  },
  {
    id: "nathiagali",
    name: "Nathiagali Abbottabad",
    tagline: "Alpine pine forest dining experience",
    badge: "Pine Chalet",
    description:
      "Nestled amid the lush pine forests and misty trails of Nathiagali. Experience a cozy wooden chalet ambiance serving hot Belgian waffles, gourmet brunch platters, and steaming hot chocolate by warm open fireplaces.",
    address: "Main Bazar Road, Near Governor House, Nathiagali",
    phone: "+92 (0992) 861-422",
    hours: "08:00 AM – 09:30 PM Daily",
    features: ["Pine Forest Views", "Wood Fireplace", "Warm Alpine Brunch"],
    accentColor: "from-emerald-600 to-teal-700",
  },
  {
    id: "f6-islamabad",
    name: "F-6 Islamabad",
    tagline: "Urban elegance & sunlit patio",
    badge: "Capital Flagship",
    description:
      "Located in Islamabad's premier food sector, our F-6 branch features modern chic glass architecture, a serene sunlit garden patio, fast specialty coffee bar, and an extensive morning-to-evening gourmet menu.",
    address: "Super Market, Block B, Sector F-6/2, Islamabad",
    phone: "+92 (051) 283-900",
    hours: "07:30 AM – 11:00 PM Daily",
    features: ["Garden Patio", "Espresso Bar", "Valet Parking"],
    accentColor: "from-rose-600 to-red-700",
  },
];

export default function CafeLocations() {
  return (
    <div className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-200 pb-4">
        <div>
          <span className="text-xs font-bold font-pixelify-sans uppercase tracking-wider text-amber-600">
            Our Branches
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-pixelify-sans text-gray-900">
            Café Locations
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 font-pixelify-sans max-w-md">
          Visit any of our three iconic locations across Abbottabad and Islamabad for memorable morning dining.
        </p>
      </div>

      {/* Grid of Locations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LOCATIONS.map((location) => (
          <div
            key={location.id}
            className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Location Card Header Banner */}
            <div>
              <div
                className={`bg-linear-to-r ${location.accentColor} p-5 text-white relative overflow-hidden`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="bg-black/30 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold font-pixelify-sans uppercase tracking-wider text-amber-200">
                    {location.badge}
                  </span>
                  <IconMapPin className="w-5 h-5 text-white/80 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-xl font-bold font-pixelify-sans leading-snug">
                  {location.name}
                </h4>
                <p className="text-xs text-white/90 font-pixelify-sans font-medium mt-0.5">
                  ✨ {location.tagline}
                </p>
              </div>

              {/* Location Details Body */}
              <div className="p-5 space-y-4">
                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 font-pixelify-sans leading-relaxed">
                  {location.description}
                </p>

                {/* Features Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {location.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 text-[11px] font-bold font-pixelify-sans px-2.5 py-1 rounded-lg"
                    >
                      • {feat}
                    </span>
                  ))}
                </div>

                {/* Address & Info */}
                <div className="space-y-2 pt-2 border-t border-gray-100 text-xs font-pixelify-sans text-gray-700">
                  <div className="flex items-start gap-2">
                    <IconMapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{location.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <IconClock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{location.hours}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <IconPhone className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{location.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer action */}
            <div className="p-4 pt-0">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  location.name + " " + location.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-50 hover:bg-amber-400 text-gray-800 hover:text-gray-900 rounded-xl font-bold font-pixelify-sans text-xs transition-colors border border-gray-200"
              >
                <IconMapPin className="w-4 h-4" />
                <span>View on Google Maps</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
