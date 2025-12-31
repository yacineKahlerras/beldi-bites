import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-background via-secondary to-muted">
      <div className="max-w-6xl mx-auto pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Welcome to <span className="text-primary">Beldi</span>{" "}
              <span className="text-accent">Bites</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Discover delicious recipes from around the world. Cook, share, and
              enjoy amazing meals with your family and friends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200 text-lg">
                Explore Recipes
              </button>
              <button className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-secondary transition-colors duration-200 text-lg">
                Share Your Recipe
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Placeholder for recipe image */}
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl shadow-2xl flex items-center justify-center border border-border">
                <div className="text-center text-muted-foreground">
                  <svg
                    className="mx-auto mb-4 w-24 h-24 text-primary/60"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  <p className="text-lg font-medium">Your Amazing</p>
                  <p className="text-lg font-medium">Recipe Image Here</p>
                  <p className="text-sm mt-2 opacity-75">
                    Replace this placeholder
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/30 rounded-full opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/30 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
