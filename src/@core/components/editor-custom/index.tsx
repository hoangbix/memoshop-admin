import 'react-quill/dist/quill.snow.css'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { DeltaStatic, Sources } from 'quill'

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    ['link', 'image']
  ]
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align'
]

interface Props {
  readOnly?: boolean
  value: string
  onChange?(value: string, delta: DeltaStatic, source: Sources, editor: any): void
}

const EditorCustom = (props: Props) => {
  const { readOnly, value, onChange } = props

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])

  return (
    <ReactQuill
      theme='snow'
      modules={modules}
      formats={formats}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  )
}

export default EditorCustom
