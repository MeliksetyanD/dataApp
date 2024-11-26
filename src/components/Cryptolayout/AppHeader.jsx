import { Button, Drawer, Layout, Modal, Select, Space } from 'antd'
import { useState } from 'react'
import AddAssetForm from '../AddAssetForm'
import CoinInfoModal from '../CoinInfoModal'

const headerStyle = {
	width: '100%',
	textAlign: 'center',
	height: 60,
	padding: '1rem',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}

export default function AppHeader({ data, updateHandler, assets }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [coin, setCoin] = useState()
	const handleSelect = value => {
		setCoin(data.find(c => c.id === value))

		setIsModalOpen(true)
	}

	return (
		<Layout.Header style={headerStyle}>
			<Select
				style={{
					width: '250px',
				}}
				onSelect={handleSelect}
				value={'Select crypto'}
				options={data.map(coin => ({
					label: coin.name,
					value: coin.id,
					icon: coin.icon,
				}))}
				optionRender={option => (
					<Space>
						<img
							style={{ width: '20px' }}
							src={option.data.icon}
							alt={option.data.label}
						/>{' '}
						{option.data.label}
					</Space>
				)}
			/>
			<Button type='primary' onClick={() => setIsDrawerOpen(true)}>
				Add Asset
			</Button>
			<Modal
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
			>
				<CoinInfoModal coin={coin} />
			</Modal>
			<Drawer
				destroyOnClose
				width={600}
				title='Add Asset'
				onClose={() => setIsDrawerOpen(false)}
				open={isDrawerOpen}
			>
				<AddAssetForm
					assets={assets}
					updateHandler={updateHandler}
					data={data}
					onClose={() => setIsDrawerOpen(false)}
				/>
			</Drawer>
		</Layout.Header>
	)
}
