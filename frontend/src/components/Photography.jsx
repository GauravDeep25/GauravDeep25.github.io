import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Navbar from './Navbar';
import './photography.css';

const Photography = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const { data, error } = await supabase
                .from('photos')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setPhotos(data || []);
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    const openLightbox = (photo) => {
        setSelectedPhoto(photo);
    };

    const closeLightbox = () => {
        setSelectedPhoto(null);
    };

    if (loading) {
        return (
            <div className="photography-page">
                <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <div className="photography-container">
                    <p className="loading-text">Loading photography...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="photography-page">
            <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <div className="photography-container">
                <header className="photography-header">
                    <h1 className="photography-title">Photography</h1>
                    <p className="photography-subtitle">
                        A collection of moments captured through my lens
                    </p>
                </header>

                {photos.length === 0 ? (
                    <div className="no-photos">
                        <p>No photos to display yet.</p>
                    </div>
                ) : (
                    <div className="photography-grid">
                        {photos.map((photo) => (
                            <div
                                key={photo.id}
                                className="photo-card"
                                onClick={() => openLightbox(photo)}
                            >
                                <div className="photo-image-wrapper">
                                    <img
                                        src={photo.image_url}
                                        alt={photo.title || 'Photography'}
                                        className="photo-image"
                                        loading="lazy"
                                    />
                                    <div className="photo-overlay">
                                        <span className="view-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                {(photo.title || photo.description) && (
                                    <div className="photo-info">
                                        {photo.title && <h3 className="photo-title">{photo.title}</h3>}
                                        {photo.description && <p className="photo-description">{photo.description}</p>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedPhoto && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
                        <img
                            src={selectedPhoto.image_url}
                            alt={selectedPhoto.title || 'Photography'}
                            className="lightbox-image"
                        />
                        {(selectedPhoto.title || selectedPhoto.description) && (
                            <div className="lightbox-caption">
                                {selectedPhoto.title && <h3>{selectedPhoto.title}</h3>}
                                {selectedPhoto.description && <p>{selectedPhoto.description}</p>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Photography;
