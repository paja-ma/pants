import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'
import { ImageUploader } from '@/components/common/ImageUploader'
import { deployArgs } from '@/hooks/deploy'
import { useDeployContract } from 'wagmi'

export function CreateRafflePage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [maxParticipants, setMaxParticipants] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const { deployContractAsync } = useDeployContract()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Logs the smart wallet's address

    // const signed = await client.signMessage({ message: callData })
    // console.log({ signed })

    const res = await deployContractAsync(deployArgs)

    console.log(res)

    // deployContract(client, deployArgs(client.account))

    // TODO: API 연동
    console.log({ title, description, maxParticipants, image })
    // const res = await writeExample('haha')
    // console.log('Create Raffle Response:', res)
    // navigate('/')
  }

  return (
    <Container>
      <ContentWrapper>
        <Form onSubmit={handleSubmit}>
          <Card>
            <FormContent>
              <FormGroup>
                <Label>제목</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="래플의 제목을 입력해주세요"
                  // required
                />
              </FormGroup>

              <FormGroup>
                <Label>설명</Label>
                <TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="래플에 대한 설명을 입력해주세요"
                  // required
                />
              </FormGroup>

              <FormGroup>
                <Label>사진</Label>
                <ImageUploader onImageChange={setImage} />
              </FormGroup>

              <FormGroup>
                <Label>
                  몇 명 당첨? <MaxText>(max는 고정넘버)</MaxText>
                </Label>
                <Input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  placeholder="당첨자 수를 입력해주세요"
                  // required
                  min="1"
                />
              </FormGroup>
            </FormContent>
          </Card>

          <ButtonContainer>
            <CreateButton type="submit">만들기~</CreateButton>
          </ButtonContainer>
        </Form>
      </ContentWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 24px 16px;
`

const ContentWrapper = styled.div`
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #212529;
`

const MaxText = styled.span`
  font-size: 14px;
  color: #868e96;
  font-weight: normal;
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #228be6;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #228be6;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

const CreateButton = styled(Button)`
  padding: 12px 48px;
  font-size: 16px;
`
