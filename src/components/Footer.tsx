import { Link } from 'react-router-dom';

const footerLinks = [
  {
    id: 1,
    title: 'Term of service',
    url: '/term-of-service',
  },
  {
    id: 2,
    title: 'Privacy policies',
    url: '/privacy-policy',
  },
  {
    id: 3,
    title: 'Contact',
    url: '/contact-us',
  },
];

export default function Footer() {
  return (
    <footer className="sticky bottom-0 z-50 w-full border-t bg-background dark:border-gray-800">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 border-t py-6 text-sm text-muted-foreground md:flex-row">
        <p>&copy; 2024 Example Company. All rights reserved.</p>
        <nav className="flex items-center gap-2">
          {footerLinks.map((item) => (
            <Link key={item.id} to={item.url} className="text-sm hover:underline">
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
