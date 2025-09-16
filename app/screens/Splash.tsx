import logoURL from '@/assets/images/chalkpad-logo.png';
import { Image, Text, View } from 'react-native';
import { getSplashBackgroundColor, getSplashColors, getSplashTagline } from '../../utils/splashUtils';

const Splash = () => {
    const backgroundColor = getSplashBackgroundColor();
    const splashText = getSplashTagline();
    const colors = getSplashColors();

    return <View className="flex-1 items-center justify-center" style={{ backgroundColor }}>
        <View className='text-center w-full'>
            <Image source={logoURL} style={{ maxWidth: 500, width: '100%', position: 'relative' }} resizeMode="contain" />
        </View>
        <Text className="text-xl font-bold" style={{ fontFamily: 'Kalpurush', color: colors.text }}>{splashText}</Text>
    </View>;
};

export default Splash;