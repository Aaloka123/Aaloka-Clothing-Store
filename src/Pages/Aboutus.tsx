import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Scissors, Leaf, Users } from "lucide-react";

const Aboutus: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-secondary">
        {/* Hero Section */}
        <section className="relative bg-primary text-white py-20">
          <div className="max-w-6xl mx-auto text-center px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              About <span className="text-secondary">Aaloka Cloths</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
              More than fashion — we create timeless stories stitched with love,
              confidence, and sustainability.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">
            Our Story
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-6 text-center max-w-3xl mx-auto">
            Welcome to <span className="font-semibold">Aaloka Cloths</span>,
            where style meets comfort. Clothing is not just fabric — it’s a
            voice, a vibe, and your identity. Every piece is designed with
            passion, detail, and modern elegance.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 text-center max-w-3xl mx-auto">
            What started as a dream to celebrate individuality is now a movement
            that embraces confidence, creativity, and conscious living.
          </p>
        </section>

        {/* Values Section */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Quality First",
                desc: "Every stitch, cut, and fabric is chosen with care for comfort and durability.",
                icon: (
                  <Scissors className="w-16 h-16 mx-auto mb-4 text-primary" />
                ),
              },
              {
                title: "Sustainable Fashion",
                desc: "We embrace eco-conscious practices to make fashion kinder to the planet.",
                icon: <Leaf className="w-16 h-16 mx-auto mb-4 text-primary" />,
              },
              {
                title: "For Everyone",
                desc: "From casual wear to statement pieces, our collections fit all personalities.",
                icon: <Users className="w-16 h-16 mx-auto mb-4 text-primary" />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-secondary hover:bg-white hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 rounded-2xl p-8 text-center border border-gray-100"
              >
                {item.icon}
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join Us */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Join the Journey
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Wearing <span className="font-semibold">Aaloka Cloths</span> means
            joining a movement that values individuality, self-expression, and
            mindful fashion.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-2xl shadow-md hover:bg-secondary hover:text-black hover:shadow-lg transition"
          >
            Explore Collection
          </button>
        </section>
      </div>
    </Layout>
  );
};

export default Aboutus;
