import styled from '@emotion/styled'
import { useCallback, useState } from 'react'

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void
}

export function ImageUploader({ onImageChange }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onImageChange(file)
    },
    [onImageChange]
  )

  const handleRemoveImage = useCallback(() => {
    setPreview(null)
    onImageChange(null)
  }, [onImageChange])

  return (
    <Container>
      {preview ? (
        <PreviewContainer>
          <Preview src={preview} alt="Preview" />
          <RemoveButton onClick={handleRemoveImage}>✕</RemoveButton>
        </PreviewContainer>
      ) : (
        <UploadButton>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
          <UploadIcon>+</UploadIcon>
          <UploadText>사진 업로드</UploadText>
        </UploadButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
`

const UploadButton = styled.label`
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9ecef;
    border-color: #ced4da;
  }
`

const UploadIcon = styled.span`
  font-size: 32px;
  color: #adb5bd;
  margin-bottom: 8px;
`

const UploadText = styled.span`
  font-size: 14px;
  color: #868e96;
`

const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`
