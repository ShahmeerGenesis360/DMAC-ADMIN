import { Image, ImageProps } from 'antd'

const ImageBox = ({ src, width, height, ...rest }: ImageProps) => {
    return <Image src={src} width={width} height={height} preview={false} alt='image' {...rest} />
}

export default ImageBox
