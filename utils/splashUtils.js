import splashConfig from '../splash.config';

export const getSplashConfig = () => splashConfig;

export const getSplashImage = () => splashConfig.image;

export const getSplashBackgroundColor = () => splashConfig.backgroundColor;

export const getSplashDuration = () => splashConfig.duration;

export const getSplashText = () => splashConfig.text;

export const getSplashWelcomeText = () => splashConfig.text.welcome;

export const getSplashSubtitle = () => splashConfig.text.subtitle;

export const getSplashTagline = () => splashConfig.text.tagline;

export const getSplashFontFamily = () => splashConfig.text.fontFamily;

// Font loading utilities
export const FONT_FAMILIES = {
    kalpurush: 'Kalpurush',
    kalpurushBold: 'Kalpurush-Bold',
    spaceMono: 'SpaceMono-Regular',
};

export const getFontFamily = (key) => FONT_FAMILIES[key] || FONT_FAMILIES.kalpurush;

export const getSplashColors = () => splashConfig.colors;

export const getPlatformSplashConfig = (platform) => {
    return splashConfig[platform] || splashConfig;
};

// Animation utilities
export const getSplashAnimation = () => splashConfig.animation;

export const shouldFadeIn = () => splashConfig.animation.fadeIn;

export const shouldFadeOut = () => splashConfig.animation.fadeOut;

export const getScaleAnimation = () => splashConfig.animation.scale;