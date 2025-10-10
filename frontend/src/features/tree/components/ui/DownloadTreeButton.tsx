'use client'

import { Edge, Node, useReactFlow } from '@xyflow/react'
import { saveAs } from 'file-saver'
import * as htmlToImage from 'html-to-image'
import { ChevronDown, Download, Upload } from 'lucide-react'
import { RefObject, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { Button, Input } from '@/shared/components'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/components'

import { Theme, TreeEdge, TreeNode } from '../../types'

import { SpinnerOverlay } from './SpinnerOverlay'

type Format = 'svg' | 'png' | 'jpg' | 'json'

interface IDownloadTreeButton {
	nodes: Node[] | TreeNode[]
	edges: Edge[] | TreeEdge[]
	treeRef: RefObject<HTMLDivElement | null>
	theme: Theme
}

export function DownloadTreeButton({
	treeRef,
	nodes,
	edges,
	theme
}: IDownloadTreeButton) {
	const [format, setFormat] = useState<Format>('svg')
	const [loading, setLoading] = useState<boolean>(false)
	const [jsonData, setJsonData] = useState({
		nodes: [],
		edges: []
	})
	const { setEdges, getNodes, setNodes } = useReactFlow()

	const { t } = useTranslation('tree')

	const handleDownload = async () => {
		if (getNodes().length === 0) {
			toast.error(t('download.emptyTree'))
			return
		}
		const element = treeRef.current
		if (!element) return

		setLoading(true)

		await new Promise(resolve => setTimeout(resolve, 0))
		const SCALE = 6
		try {
			if (format === 'json') {
				const dataStr = JSON.stringify({ nodes, edges }, null, 2)
				const blob = new Blob([dataStr], { type: 'application/json' })
				saveAs(blob, 'tree.json')
				toast.success(t('download.jsonDownloaded'))
				return
			}

			const options = {
				filter: (node: HTMLElement) =>
					!node.classList?.contains('hide-on-export'),
				backgroundColor: theme === Theme.DARK ? '#1e1e1e' : '#ffffff',

				width:
					format !== 'svg'
						? element.scrollWidth * SCALE
						: element.scrollWidth,
				height:
					format !== 'svg'
						? element.scrollHeight * SCALE
						: element.scrollHeight,
				style: {
					transform: format !== 'svg' ? `scale(${SCALE})` : '',
					transformOrigin: 'top left'
				}
			}

			let dataUrl: string
			switch (format) {
				case 'svg':
					dataUrl = await htmlToImage.toSvg(element, options)
					break
				case 'png':
					dataUrl = await htmlToImage.toPng(element, options)
					break
				case 'jpg':
					dataUrl = await htmlToImage.toJpeg(element, {
						...options,
						quality: 0.95
					})
					break
				default:
					throw new Error('Unsupported format')
			}

			const res = await fetch(dataUrl)
			const blob = await res.blob()

			saveAs(blob, `tree.${format}`)

			toast.success(
				t('download.imageDownloaded', { format: format.toUpperCase() })
			)
		} catch (error) {
			toast.error(t('download.errorSaveTree'))
		} finally {
			setLoading(false)
		}
	}

	const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		const reader = new FileReader()

		reader.onload = e => {
			try {
				const json = JSON.parse(e.target?.result as string)
				if (json.nodes && json.edges) {
					setJsonData({
						...jsonData,
						nodes: json.nodes,
						edges: json.edges
					})
				} else {
					toast.error(t('download.invalidFile'))
				}
			} catch (error) {
				toast.error(t('download.errorReadFile'))
			}
		}

		reader.readAsText(file)
	}

	const handleImportTree = () => {
		if (jsonData.nodes.length > 0) {
			setNodes(jsonData.nodes)
			setEdges(jsonData.edges)
			toast.success(t('download.treeLoaded'))
		} else {
			toast.error(t('download.emptyTree'))
		}
	}

	return (
		<>
			{loading && <SpinnerOverlay text={t('download.loadingText')} />}
			<div className='space-y-4 p-4'>
				<h2 className='text-lg font-semibold'>{t('download.title')}</h2>

				{/* Выбор формата */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							className='w-full justify-between'
						>
							{t('download.format')}: {format.toUpperCase()}
							<ChevronDown className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-40'>
						{(['svg', 'png', 'jpg', 'json'] as Format[]).map(f => (
							<DropdownMenuItem
								key={f}
								onClick={() => setFormat(f)}
								className='capitalize'
							>
								{f.toUpperCase()}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Кнопка скачивания */}
				<Button
					onClick={handleDownload}
					variant='default'
					className='w-full justify-start'
				>
					<Download className='mr-2 h-4 w-4' />
					{t('download.button')}
				</Button>

				{/* Кнопка загрузки */}
				<label className='block'>
					<h2 className='mb-3 text-lg font-semibold'>
						{t('download.loadTree')}
					</h2>
					<Input
						type='file'
						accept='application/json'
						onChange={handleImport}
					/>
					<Button
						onClick={handleImportTree}
						variant='secondary'
						className='mt-4 w-full justify-start'
					>
						<Upload className='mr-2 h-4 w-4' />
						{t('download.loadTree')}
					</Button>
				</label>
			</div>
		</>
	)
}
