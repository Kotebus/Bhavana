export default ({ config }) => {
    process.env.NODE_ENV = process.env.NODE_ENV || (process.env.EXPO_PUBLIC_IS_PROD ? 'production' : 'development');

    return {
        ...config,
        extra: {
            ...config.extra,
            NODE_ENV: process.env.NODE_ENV,
        },
    };
};
