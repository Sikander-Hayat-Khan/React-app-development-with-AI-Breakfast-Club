import Image from "next/image";
import Link from "next/link";

const reviewsData = [
  {
    id: 1,
    name: "Gordon Ramsay",
    review:
      "The eggs benedict here are bloody brilliant! Perfectly poached and cooked to absolute perfection. Best breakfast spot in town!",
    ratingFilled: 5,
    ratingUnfilled: 0,
  },
  {
    id: 2,
    name: "Taylor Swift",
    review:
      "Loved the peaceful morning vibes and the avocado toast! It was enchanted. Absolutely coming back for more fluffy pancakes!",
    ratingFilled: 4,
    ratingUnfilled: 1,
  },
  {
    id: 3,
    name: "Dwayne Johnson",
    review:
      "The protein breakfast platter is legendary! Fuels my workouts and tastes unbelievable. Can you smell what Breakfast Club is cookin'?",
    ratingFilled: 5,
    ratingUnfilled: 0,
  },
];

export default function ReviewsSection() {
  return (
    <section className="w-11/12 max-w-7xl mx-auto py-8 sm:py-12 flex flex-col items-center text-center">
      {/* Section Header */}
      <h2 className="self-start text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 font-pixelify-sans mb-2 sm:mb-3">
        What Our Customers Are Saying
      </h2>

      {/* Subtitle */}
      <p className="self-start text-gray-500 mb-6 sm:mb-10 font-mono text-sm sm:text-base md:text-xl">
        Real reviews from satisfied breakfast lovers.
      </p>

      {/* Review Boxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl">
        {reviewsData.map((item) => (
          <div
            key={item.id}
            style={{ backgroundColor: "rgb(252, 229, 151)" }}
            className="w-full h-auto md:aspect-square rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between items-center text-center shadow-md hover:shadow-lg transition-all duration-300 border border-amber-200"
          >
            {/* Quotation SVG - Horizontally Centered */}
            <div className="w-full flex justify-center pt-1 sm:pt-2">
              <Image
                src="/icons/quotation.svg"
                alt="Quotation Mark"
                width={36}
                height={36}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 opacity-90"
              />
            </div>

            {/* Review Text */}
            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-snug sm:leading-relaxed px-1 sm:px-2 font-mono italic my-3 sm:my-auto overflow-hidden">
              "{item.review}"
            </p>

            {/* Bottom Content Area */}
            <div className="w-full flex flex-col items-center">
              {/* Horizontal Separation Line */}
              <div className="w-full border-t border-black/20 my-2 sm:my-3" />

              {/* Star Rating */}
              <div className="flex items-center justify-center gap-1 mb-1 sm:mb-2">
                {[...Array(item.ratingFilled)].map((_, i) => (
                  <Image
                    key={`filled-${i}`}
                    src="/icons/star_filled.png"
                    alt="Filled Star"
                    width={20}
                    height={20}
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                  />
                ))}
                {[...Array(item.ratingUnfilled)].map((_, i) => (
                  <Image
                    key={`unfilled-${i}`}
                    src="/icons/star_unfilled.png"
                    alt="Unfilled Star"
                    width={20}
                    height={20}
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                  />
                ))}
              </div>

              {/* Reviewer Name */}
              <h3 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg font-pixelify-sans">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Button below review cards */}
      <Link href="/review" className="mt-8 sm:mt-12 inline-block">
        <button className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-orange-500 bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 font-pixelify-sans font-bold rounded-full text-sm sm:text-base md:text-lg cursor-pointer shadow-sm">
          read more reviews
        </button>
      </Link>
    </section>
  );
}
