import { Layout } from 'antd'

import React, { useEffect, useState } from 'react'
import { percentDifference } from '../scenes/utils/utils'
import AppContent from './Cryptolayout/AppContent'
import AppHeader from './Cryptolayout/AppHeader'
import AppSider from './Cryptolayout/AppSider'
const CryptoInfo = ({ data }) => {
	const [update, setUpdate] = useState(true)
	const [assets, setAssets] = useState()
	const getAssets = async () => {
		await fetch(`http://localhost:8000/cryptoAssets`)
			.then(res => {
				if (!res.ok) {
					throw Error('Error fetching users data')
				}
				return res.json()
			})
			.then(dataAssets => {
				setAssets(
					dataAssets.map(asset => {
						const coin = data.find(c => c.id === asset.id)

						return {
							grow: asset.price < coin.price,
							growPercent: percentDifference(asset.price, coin.price),
							totalAmount: asset.amount * coin.price,
							totalProfit:
								asset.amount * coin.price - asset.amount * asset.price,
							name: coin.name,
							...asset,
						}
					})
				)
			})
			.catch(error => {
				console.log(error)
			})
	}

	function updateHandler(data = '') {
		console.log(data)
		setUpdate(prev => !prev)
	}

	useEffect(() => {
		getAssets()
	}, [update])

	return (
		<Layout>
			<AppHeader data={data} assets={assets} updateHandler={updateHandler} />
			<Layout>
				<AppSider data={data} assets={assets} />
				<AppContent data={data} assets={assets} />
			</Layout>
		</Layout>
	)
}

export default CryptoInfo
