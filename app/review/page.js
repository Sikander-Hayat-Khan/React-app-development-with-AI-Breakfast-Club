import ReviewBoxes from "@/components/ReviewBoxes";

export default function Review() {
  return (
    <main>
      <div className="reviewContainer w-11/12 max-w-7xl mx-auto">
        <h1 className="text-left text-3xl md:text-5xl font-bold pt-8">Review Page</h1>
        <div className="mx-auto w-full border-b-2 border-yellow-400 mt-3 mb-6" />
      </div>
      <div className="reviewContainer w-11/12 max-w-7xl mx-auto">
        <ReviewBoxes />
      </div>
    </main>
  );
}
