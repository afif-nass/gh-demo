export type Asset = {
	id: string;
	icon: string;
};

export const assets: Asset[] = [
	{ id: 'btcusdt', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=032' },
	{ id: 'ethusdt', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032' },
	{ id: 'solusdt', icon: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=032' }
];
// export const assets: Asset[] = [
// 	{ id: 'btcusdt', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=032' },
// 	{ id: 'ethusdt', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032' },
// 	{ id: 'solusdt', icon: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=032' }
// ];

export const data: Asset[] = assets;
