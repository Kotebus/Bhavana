import { Asset } from 'expo-asset';

export const loadMarkdownAsset = async (assetModule: any): Promise<string> => {
    try {
        const asset = Asset.fromModule(assetModule);
        await asset.downloadAsync();

        const response = await fetch(asset.localUri || asset.uri);
        return await response.text();
    } catch (error) {
        console.error('Ошибка загрузки markdown:', error);
        throw error;
    }
};