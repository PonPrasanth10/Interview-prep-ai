import React from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ProfileInfoCard from "../components/cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-700">
            InterviewPrepAI
          </span>
        </div>
        {user ? (
          <ProfileInfoCard />
        ) : (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-blue-700 font-medium hover:bg-blue-100 rounded-md transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-blue-50">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Ace Interviews with{" "}
            <span className="text-blue-600">AI-Powered</span> Learning
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            Get role-specific questions, expand answers when you need them, dive
            deeper into concepts, and organize everything your way. From
            preparation to mastery — your ultimate interview toolkit is here.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Features That Make You Shine
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-blue-600 text-2xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Tailored Just for You
              </h3>
              <p className="text-gray-600">
                Get interview questions and model answers based on your role,
                experience, and specific focus areas — no generic practice here.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-blue-600 text-2xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Learn at Your Own Pace
              </h3>
              <p className="text-gray-600">
                Expand answers only when you're ready. Dive deeper into any
                concept instantly with AI-powered detailed explanations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-blue-600 text-2xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Capture Your Insights
              </h3>
              <p className="text-gray-600">
                Add personal notes to any question and pin important ones to the
                top — making your learning more organized and impactful.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-blue-600 text-2xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Understand the "Why"
              </h3>
              <p className="text-gray-600">
                Beyond just answers — unlock detailed concept explanations
                generated by AI, helping you truly master each topic.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-blue-600 text-2xl mb-4">🗂️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Save & Organize</h3>
              <p className="text-gray-600">
                Easily save your interview sets, organize them neatly in your
                dashboard, and pick up your preparation right where you left
                off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-8 py-10 bg-white rounded-2xl shadow-lg hover:shadow-xl transition text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-600 inline-block pb-2">
            About Me
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            I'm <span className="font-semibold text-blue-600">Pon Prasanth R</span>, a second-year engineering student specializing in{" "}
            <span className="font-semibold text-blue-600">Artificial Intelligence and Machine Learning</span>. I'm passionate about{" "}
            <span className="font-semibold text-blue-600">Full Stack Development</span> and{" "}
            <span className="font-semibold text-blue-600">AI/ML</span>, with hands-on experience building scalable web applications.
            <br /><br />
            I've developed multiple <span className="font-semibold text-blue-600">MERN stack projects</span>, including a real-time chat app and a dynamic blog platform.
            I've solved <span className="font-semibold text-blue-600">200+ LeetCode problems</span> and love working on real-world solutions by combining development and problem-solving.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-100 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-blue-800">
          <p>
            © {new Date().getFullYear()} InterviewPrepAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;