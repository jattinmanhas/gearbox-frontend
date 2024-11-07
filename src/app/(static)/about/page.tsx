import { ArrowRight, ShoppingBag, Newspaper, Cpu } from "lucide-react";

const AboutPage = () => {
  const features = [
    {
      title: "Tech Shop",
      description:
        "Curated collection of the latest gadgets and tech accessories",
      icon: ShoppingBag,
    },
    {
      title: "Tech Blog",
      description: "In-depth articles and reviews on cutting-edge technology",
      icon: Newspaper,
    },
    {
      title: "Latest Innovation",
      description: "Stay updated with the newest tech trends and releases",
      icon: Cpu,
    },
  ];

  return (
    <div className="min-h-screen bg-inherit text-gray-200">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-500 to-purple-500 inline-block text-transparent bg-clip-text">
            Welcome to Gearbox
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
            Your destination for the latest technology insights and premium tech
            products.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed">
                At Gearbox, we bridge the gap between technology enthusiasts and
                the latest innovations. Our platform combines a carefully
                curated tech shop with insightful blog content, providing you
                with both the knowledge and tools to stay ahead in the digital
                age.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                Founded with a passion for technology, we strive to make the
                latest tech accessible and understandable for everyone - from
                tech novices to seasoned professionals.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-white">
                What Sets Us Apart
              </h3>
              <ul className="space-y-4">
                {[
                  "Expert product curation",
                  "In-depth tech analysis",
                  "Community-driven insights",
                  "Latest tech news coverage",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Tech Community</h2>
          <p className="text-xl mb-8">
            Stay updated with the latest tech trends and exclusive offers.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
            Explore Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
