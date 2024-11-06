import Testimonial from "@/components/Cards/Testimonial";

const TestimonialSection = () => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Testimonial
          name="John Doe"
          title="CEO, Acme Inc."
          image="https://images.unsplash.com/photo-1527594076886-3844f27f6baa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29uJTIwaW1hZ2VzfGVufDB8fDB8fHww"
          quote="I've been using this product for years and it's been a game-changer for my business."
        />
        <Testimonial
          name="Jane Smith"
          title="Marketing Manager, Globex Corp."
          image="https://images.unsplash.com/photo-1527594076886-3844f27f6baa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29uJTIwaW1hZ2VzfGVufDB8fDB8fHww"
          quote="This is the best solution I've found for my team's needs. Highly recommend!"
        />
        <Testimonial
          name="More Here"
          title="Marketing Manager, Globex Corp."
          image="https://images.unsplash.com/photo-1655149000742-602179feb1fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBlcnNvbiUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
          quote="This is the best solution I've found for my team's needs. Highly recommend!"
        />
        {/* Add more testimonial components as needed */}
      </div>
    </div>
  );
};

export default TestimonialSection;
