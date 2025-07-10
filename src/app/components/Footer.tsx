const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-12">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;