import React, { useRef, useEffect } from "react";
import BannerCarousel from "@/components/common/BannerCarousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn React basics with hands-on projects.",
    image: "https://source.unsplash.com/400x250/?react,code",
  },
  {
    id: 2,
    title: "Advanced Data Science",
    description: "Master data science techniques and tools.",
    image: "https://source.unsplash.com/400x250/?data,science",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description: "Design engaging and user-friendly interfaces.",
    image: "https://source.unsplash.com/400x250/?design,ui",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Anna Lee",
    quote:
      "This platform helped me land my dream job. The courses are well structured and easy to follow!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Mark Johnson",
    quote:
      "Great instructors and content! I especially loved the interactive projects.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 3,
    name: "Sophie Kim",
    quote:
      "A fantastic learning experience. Highly recommend to anyone wanting to upskill.",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
  },
];

const HomePage = () => {
  // Refs for sections
  const featuredRef = useRef(null);
  const testimonialRef = useRef(null);
  const categoriesRef = useRef(null);
  const instructorsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const newsletterRef = useRef(null);

  // Refs for course & testimonial cards arrays (for hover animations)
  const courseCardRefs = useRef([]);
  const testimonialCardRefs = useRef([]);

  useEffect(() => {
    const sections = [
      featuredRef.current,
      testimonialRef.current,
      categoriesRef.current,
      instructorsRef.current,
      howItWorksRef.current,
      newsletterRef.current,
    ];

    // Scroll animation for sections
    sections.forEach((section) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      }
    });

    // Add hover toggle animations for course cards
    courseCardRefs.current.forEach((card) => {
      if (card) {
        // on mouse enter
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
            duration: 0.3,
            ease: "power3.out",
          });
        });
        // on mouse leave
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: "0px 0px 0px rgba(0,0,0,0)",
            duration: 0.3,
            ease: "power3.out",
          });
        });
      }
    });

    // Hover toggle animations for testimonial cards
    testimonialCardRefs.current.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.03,
            boxShadow: "0px 8px 15px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power3.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: "0px 0px 0px rgba(0,0,0,0)",
            duration: 0.3,
            ease: "power3.out",
          });
        });
      }
    });

    // Clean up event listeners on unmount
    return () => {
      courseCardRefs.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        }
      });
      testimonialCardRefs.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, []);

  return (
    <main className="relative z-0">
      {/* Hero Banner */}
      <BannerCarousel />

      {/* Featured Courses Section */}
      <section
        ref={featuredRef}
        className="fade-in-section py-20 px-6 text-center bg-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
          Featured Courses
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Discover top-rated learning paths carefully curated for your growth.
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              ref={(el) => (courseCardRefs.current[index] = el)}
              className="cursor-pointer rounded-lg shadow-md overflow-hidden bg-white border border-gray-200"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Categories Section */}
      <section
        ref={categoriesRef}
        className="py-20 px-6 text-center bg-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {["Web Development", "Data Science", "Design", "Marketing"].map(
            (cat) => (
              <div
                key={cat}
                className="p-6 bg-purple-100 rounded-lg cursor-pointer hover:bg-purple-200 transition"
              >
                <h3 className="font-semibold text-lg text-purple-800">{cat}</h3>
              </div>
            )
          )}
        </div>
      </section>

      {/* Instructor Spotlight Section */}
      <section
        ref={instructorsRef}
        className="py-20 px-6 bg-white text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">
          Meet Our Instructors
        </h2>
        <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Jane Doe",
              bio: "Expert in Web Development with 10 years of experience.",
              img: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "John Smith",
              bio: "Data Scientist passionate about turning data into insights.",
              img: "https://randomuser.me/api/portraits/men/46.jpg",
            },
            {
              name: "Emily Johnson",
              bio: "Creative designer specializing in UI/UX experiences.",
              img: "https://randomuser.me/api/portraits/women/47.jpg",
            },
          ].map(({ name, bio, img }) => (
            <div key={name} className="max-w-xs rounded-lg shadow-lg p-6">
              <img
                src={img}
                alt={name}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{name}</h3>
              <p className="text-gray-600">{bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section
        ref={howItWorksRef}
        className="py-20 px-6 bg-indigo-50 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-8">
          How It Works
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              step: 1,
              title: "Choose a Course",
              description: "Browse and select your favorite topics.",
            },
            {
              step: 2,
              title: "Learn at Your Pace",
              description: "Watch videos and complete assignments.",
            },
            {
              step: 3,
              title: "Earn Certificates",
              description: "Showcase your achievements to employers.",
            },
          ].map(({ step, title, description }) => (
            <div key={step} className="p-6 bg-white rounded-lg shadow-md">
              <div className="text-indigo-600 font-bold text-3xl mb-4">{step}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialRef}
        className="fade-in-section bg-gray-100 py-20 px-6 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
          What Our Students Say
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Hear from learners who’ve achieved more through our platform.
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              ref={(el) => (testimonialCardRefs.current[index] = el)}
              className="bg-white rounded-lg p-6 shadow-md cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <h3 className="font-semibold text-lg">{t.name}</h3>
              </div>
              <p className="text-gray-700 italic">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section
        ref={newsletterRef}
        className="py-16 px-6 bg-purple-700 text-white text-center rounded-t-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="max-w-xl mx-auto mb-8">
          Subscribe to our newsletter to get the latest courses and offers.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="p-3 rounded-md text-gray-800 flex-grow"
          />
          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 rounded-md px-6 py-3 font-semibold text-purple-900"
          >
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
};

export default HomePage;
