// types/dom-to-image-more.d.ts

declare module 'dom-to-image-more' {
	interface Options {
	  bgcolor?: string
	  width?: number
	  height?: number
	  style?: { [key: string]: string }
	  filter?: (node: HTMLElement) => boolean
	  quality?: number
	}
  
	export function toPng(node: HTMLElement, options?: Options): Promise<string>
	export function toJpeg(node: HTMLElement, options?: Options): Promise<string>
	export function toSvg(node: HTMLElement, options?: Options): Promise<string>
	export function toBlob(node: HTMLElement, options?: Options): Promise<Blob>
	export default {
	  toPng,
	  toJpeg,
	  toSvg,
	  toBlob
	}
  }
  