import 'react-quill/dist/quill.snow.css'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { DeltaStatic, Sources } from 'quill'
import ReactQuill from 'react-quill'

interface Props {
  readOnly?: boolean
  theme: string
  modules: any
  value: string
  style?: any
  formats?: string[]
  onChange?(value: string, delta: DeltaStatic, source: Sources, editor: ReactQuill.UnprivilegedEditor): void
}

const EditorCustom = (props: Props) => {
  const { readOnly, theme, modules, value, style, formats, onChange } = props

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])

  return (
    <ReactQuill
      readOnly={readOnly}
      theme={theme}
      modules={modules}
      value={value}
      style={style}
      formats={formats}
      onChange={onChange}
    />
  )
}

export default EditorCustom
