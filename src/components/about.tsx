export default function AboutSection() {
  const stats = [
    { number: "10,000+", label: "Delicious Recipes" },
    { number: "50,000+", label: "Happy Cooks" },
    { number: "1,000+", label: "Chef Partners" },
    { number: "25+", label: "Countries Served" },
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Head Chef & Founder",
      description: "Former Michelin-star chef with 15+ years of experience",
      avatar: "SJ",
    },
    {
      name: "Marco Rodriguez",
      role: "Culinary Director",
      description: "Expert in Mediterranean and Latin American cuisines",
      avatar: "MR",
    },
    {
      name: "Emily Chen",
      role: "Nutrition Specialist",
      description: "Certified nutritionist focused on healthy cooking",
      avatar: "EC",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-orange-600">Recipe Paradise</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re passionate about bringing people together through the joy of
            cooking and sharing amazing food experiences.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Story Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Recipe Paradise was born from a simple idea: everyone deserves
                access to delicious, home-cooked meals. Founded in 2020 by a
                team of passionate chefs and food lovers, we&apos;ve grown into a
                thriving community of culinary enthusiasts from around the
                world.
              </p>
              <p>
                Our mission is to make cooking accessible, enjoyable, and
                rewarding for everyone—from complete beginners to seasoned home
                chefs. We believe that great food brings people together and
                creates lasting memories.
              </p>
              <p>
                Today, we&apos;re proud to offer thousands of tested recipes, cooking
                tips, and culinary inspiration to help you create amazing meals
                for your family and friends.
              </p>
            </div>

            {/* Mission Points */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                  <svg
                    className="w-3 h-3 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Quality First</h4>
                  <p className="text-gray-600 text-sm">
                    Every recipe is tested and refined by our team of
                    professional chefs
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                  <svg
                    className="w-3 h-3 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Community Driven
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Built by food lovers, for food lovers - we value every voice
                    in our community
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                  <svg
                    className="w-3 h-3 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Always Learning
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Constantly evolving with new techniques, ingredients, and
                    global flavors
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <svg
                  className="mx-auto mb-4 w-32 h-32 text-orange-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-2xl font-bold text-gray-700">Our Kitchen</p>
                <p className="text-lg opacity-75">Where magic happens</p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-300 rounded-full opacity-60"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-orange-300 rounded-full opacity-60"></div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our diverse team of culinary experts, nutritionists, and food
            enthusiasts work together to bring you the best recipes and cooking
            experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <span className="text-white text-2xl font-bold">
                  {member.avatar}
                </span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h4>
              <p className="text-orange-600 font-semibold mb-2">
                {member.role}
              </p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
