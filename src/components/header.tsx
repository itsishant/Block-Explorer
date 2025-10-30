import data from "../data/header.json";

interface Heading {
  MainHeading: string;
}

const HeaderComponent = () => {
  const heading: Heading = data;

  return (
    <div className="flex bg-gray-900  px-6 border-b border-gray-800 justify-center items-center">
      <div className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-4xl font-sans py-4 relative z-20 font-bold tracking-tight ">
        {heading.MainHeading}
      </div>
    </div>
  );
};

export { HeaderComponent };
