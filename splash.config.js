export default {
    // Splash Screen Configuration
    image: "./assets/images/chalkpad-logo.png",
    imageWidth: 200,
    resizeMode: "contain",
    backgroundColor: "#ffffff",

    // Platform-specific configurations
    ios: {
        image: "./assets/images/chalkpad-logo.png",
        resizeMode: "cover"
    },

    android: {
        image: "./assets/images/chalkpad-logo.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },

    // Timing configuration
    duration: 3000, // milliseconds

    // Animation configuration
    animation: {
        fadeIn: true,
        fadeOut: true,
        scale: {
            initial: 0.8,
            final: 1.0
        }
    },

    // Text configuration (for custom splash screens)
    text: {
        welcome: "স্বাগতম",
        subtitle: "ChalkPad-এ আপনাকে স্বাগতম!",
        tagline: "ইন্টারেক্টিভ লার্নিং প্ল্যাটফর্ম",
        fontFamily: "Kalpurush"
    },

    // Colors
    colors: {
        primary: "#3b82f6",
        secondary: "#10b981",
        background: "#ffffff",
        text: "#1f2937"
    }
};