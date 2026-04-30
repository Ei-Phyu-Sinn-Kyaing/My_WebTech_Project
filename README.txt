The Celestial Tarot Oracle
Developer: Ei Phyu Sinn Kyaing
Module: Web Technologies (University Project)
Deployment URL: https://ei-phyu-sinn-kyaing.github.io/My_WebTech_Project/

Project Overview
The Celestial Tarot Oracle is a specialized web application that blends the mystical world of tarot with real-time astronomical data. Unlike a static information site, this project is a Dynamic Interactive System designed to provide users with a personalized spiritual experience.

Key Advanced Features (Report 2 Evolution)
From the initial HTML/CSS plan, the project has evolved into a sophisticated application featuring:
Algorithmic Randomization: Implementation of the Fisher-Yates Shuffle and a 50/50 Orientation Logic for realistic upright/reversed card readings.
Defensive Programming: Integration of WeatherAPI for real-time moon phases with a mathematical fallback logic (getMoonPhaseFallBack) to ensure 100% uptime even during network/VPN issues.
Hybrid Animation System: A blend of CSS 3D Transforms and JavaScript Data-Driven logic for interactive card shuffling and flipping.
State Management: Utilizing sessionStorage for a centralized audio management system and a hybrid storage model for user privacy.
Immersive UX: Dynamic background effects using HTML5 Canvas API, custom cosmic modals (showCosmicAlert), and a unified loading system.

Project Structure
Plaintext
/root
    index.html          # Entry point & User Gateway
    /css                # Modular stylesheets (Desktop-First Approach)
    /js                 # Core logic (Oracle, Shuffle, The Deck, Synthesis, Saved Reading, Library, API, Sound Manager, UI)
    /img                # Visual assets (Tarot deck, Moon phases)
    /sounds             # Immersive audio assets

Technical Implementation
This project is built using Vanilla JavaScript (ES6+), focusing on modular code maintainability without external libraries. It adheres to modern browser autoplay policies via a "User-Gate" initialization strategy.