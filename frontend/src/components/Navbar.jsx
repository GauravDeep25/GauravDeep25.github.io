import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isMenuOpen, toggleMenu }) => {
    const navItems = [
        { href: '/#about', label: 'About', type: 'anchor' },
        { href: '/#projects', label: 'Work', type: 'anchor' },
        { href: '/#certifications', label: 'Certifications', type: 'anchor' },
        { href: '/photography', label: 'Photography', type: 'link' },
        { href: '/#contact', label: 'Contact', type: 'anchor' },
        { href: '/edit', label: 'Edit', type: 'link' }
    ];

    // Helper to handle navigation
    const handleNavClick = (e, item) => {
        if (isMenuOpen) toggleMenu();

        // If we are on the home page and clicking an anchor, smooth scroll is handled by CSS/browser
        // But if we are on Photography page, we need to go to /#anchor
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">Gaurav Deep</Link>

                <button
                    className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {navItems.map((item) => (
                        item.type === 'link' ? (
                            <Link
                                key={item.label}
                                to={item.href}
                                className="nav-link"
                                onClick={() => isMenuOpen && toggleMenu()}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <a
                                key={item.label}
                                href={item.href}
                                className="nav-link"
                                onClick={() => isMenuOpen && toggleMenu()}
                            >
                                {item.label}
                            </a>
                        )
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
