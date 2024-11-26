import {
	Button,
	DatePicker,
	Divider,
	Flex,
	Form,
	InputNumber,
	Result,
	Select,
	Space,
	Typography,
} from 'antd'
import React, { useRef, useState } from 'react'

const AddAssetForm = ({ data, onClose, updateHandler }) => {
	const assetRef = useRef()
	const [form] = Form.useForm()
	const [coin, setCoin] = useState(null)
	const [submitted, setSubmitted] = useState(false)
	if (submitted) {
		return (
			<Result
				status={'success'}
				title='New Asset Added'
				subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
				extra={[
					<Button type='primary' key={'close'} onClick={onClose}>
						{' '}
						Okay
					</Button>,
				]}
			></Result>
		)
	}
	if (!coin) {
		return (
			<Select
				style={{
					width: '100%',
				}}
				onSelect={v => setCoin(data.find(c => c.id === v))}
				placeholder={'Select coin'}
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
		)
	}
	const addAssets = async data => {
		const config = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}
		const res = fetch('http://localhost:8000/cryptoAssets', config).then(
			function (response) {
				return response.json()
			}
		)
	}

	function onFinish(values) {
		const newAsset = {
			id: coin.id,
			amount: values.amount,
			price: values.price,
			date: values.date?.$d ?? new Date(),
		}
		assetRef.current = newAsset
		addAssets(newAsset)
		updateHandler()
		setSubmitted(true)
	}
	const validateMessages = {
		required: '${label} is required',
		types: {
			number: '${label} is not valid number',
		},
		number: {
			range: '${label} must be between ${min}',
		},
	}
	function handleAmountChange(value) {
		const price = form.getFieldValue('price')

		form.setFieldsValue({
			total: +(value * price).toFixed(2),
		})
	}
	function handlePriceChange(value) {
		const amount = form.getFieldValue('amount')
		form.setFieldsValue({
			total: +(value * amount).toFixed(2),
		})
	}

	return (
		<Form
			form={form}
			onFinish={onFinish}
			name='basic'
			initialValues={{ price: +coin.price.toFixed(2) }}
			labelCol={{
				span: 4,
			}}
			wrapperCol={{
				span: 10,
			}}
			variant='filled'
			style={{
				color: 'black',
				maxWidth: 600,
			}}
			validateMessages={validateMessages}
		>
			<Flex align='center'>
				<img
					src={coin.icon}
					alt={coin.name}
					style={{ width: '40px', marginRight: '10px' }}
				/>

				<Typography.Title level={2} style={{ margin: 0 }}>
					{coin.name}
				</Typography.Title>
			</Flex>
			<Divider />

			<Form.Item
				label='Amount'
				name='amount'
				rules={[
					{
						required: true,
						type: 'number',
						min: 0,
					},
				]}
			>
				<InputNumber
					style={{ width: '100%' }}
					placeholder='Enter coin amount'
					onChange={handleAmountChange}
				/>
			</Form.Item>

			<Form.Item label='Price' name='price'>
				<InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item label='Date and time ' name='date'>
				<DatePicker showTime />
			</Form.Item>
			<Form.Item label='Total' name='total'>
				<InputNumber disabled style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 6,
					span: 16,
				}}
			>
				<Button type='primary' htmlType='submit'>
					Add Asset
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AddAssetForm
