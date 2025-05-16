
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <CartDrawer />
      
      <main className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">About Our Headless Shopify Demo</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg">
            This demo showcases a modern e-commerce architecture using Shopify as the backend and a custom Next.js frontend. 
            This approach, known as "headless commerce," offers numerous benefits:
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg my-8">
            <h2 className="text-xl font-semibold mb-4">Key Benefits</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-primary rounded-full p-1 text-white mr-3 mt-1">✓</span>
                <span><strong>Performance:</strong> Lightning-fast page loads and interactions</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary rounded-full p-1 text-white mr-3 mt-1">✓</span>
                <span><strong>Customization:</strong> Complete control over the user interface</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary rounded-full p-1 text-white mr-3 mt-1">✓</span>
                <span><strong>Flexibility:</strong> Easy integration with other tools and services</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary rounded-full p-1 text-white mr-3 mt-1">✓</span>
                <span><strong>SEO:</strong> Improved search engine optimization</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary rounded-full p-1 text-white mr-3 mt-1">✓</span>
                <span><strong>Developer Experience:</strong> Modern tooling and frameworks</span>
              </li>
            </ul>
          </div>
          
          <h2>How It Works</h2>
          <p>
            Our demo leverages Shopify's Storefront API to access product data, manage the shopping cart, and handle the checkout process. 
            The frontend is built with Next.js, providing a fast, responsive user experience.
          </p>
          
          <h2>Technologies Used</h2>
          <p>This demo showcases the following technologies:</p>
          <ul>
            <li><strong>Frontend:</strong> Next.js, React, Tailwind CSS</li>
            <li><strong>Backend:</strong> Shopify, Shopify Storefront API</li>
            <li><strong>State Management:</strong> React Context API</li>
          </ul>
          
          <h2>Getting Started</h2>
          <p>
            To set up this project for your own use, follow these steps:
          </p>
          <ol>
            <li>Create a Shopify account and set up a development store</li>
            <li>Install the "Storefront API" app in your Shopify store</li>
            <li>Obtain your Storefront API access token</li>
            <li>Configure your environment variables with your Shopify credentials</li>
            <li>Customize the user interface to match your brand</li>
          </ol>
          
          <div className="bg-blue-50 p-6 rounded-lg my-8">
            <h2 className="text-xl font-semibold mb-4">Demo Note</h2>
            <p>
              This is a demonstration project showcasing the integration of Shopify and Next.js. 
              To use this with your own Shopify store, you'll need to set up the following environment variables:
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_access_token_here
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
            </pre>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default About;
