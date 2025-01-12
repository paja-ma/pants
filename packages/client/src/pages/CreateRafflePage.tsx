import { type FormEvent, useState } from 'react'
import styled from '@emotion/styled'
// import { getTransaction } from '@wagmi/core'
import { Card } from '@/components/common/Card'
import { ImageUploader } from '@/components/common/ImageUploader'
// import { deployArgs } from '@/hooks/deploy'
// import { useDeployContract } from 'wagmi'
import { useNavigate } from 'react-router-dom'
// import { wagmiConfig } from '@/configs/wagmi.ts'
import { CTA } from '@/components/CTA'

import { useRegisterRaffle } from '@/hooks/useRegisterRaffle'

export function CreateRafflePage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [maxParticipants, setMaxParticipants] = useState('')
  const registerRaffle = useRegisterRaffle()

  const navigate = useNavigate()
  // const { deployContractAsync } = useDeployContract()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const data = e.target as unknown as {
      title: { value: string }
      description: { value: string }
      maxParticipants: { value: number }
    }

    // const transactionAddress = await deployContractAsync(
    //   deployArgs({
    //     title: data.title.value,
    //     description: data.description.value,
    //     maxParticipants: data.maxParticipants.value,
    //     imageUrl:
    //       'https://media.licdn.com/dms/image/v2/D560BAQFU2h_sBVJbqw/company-logo_200_200/company-logo_200_200/0/1707983142205/dunamu_logo?e=1744848000&v=beta&t=AqLxRfF_N3uICBTzPm51S_QI4SwLeb9oxGRlNgPH7oY',
    //   })
    // )

    console.table({
      transactionAddress: 'aaaa',
      title: data.title.value,
      description: data.description.value,
      maxParticipants: data.maxParticipants.value,
    })

    registerRaffle.registerRaffle({
      raffleAddress: 'aaaa',
      title: data.title.value,
      description: data.description.value,
      numberOfWinners: data.maxParticipants.value,
    })

    // const { to: contractAddress } = await getTransaction(wagmiConfig, {
    //   hash: transactionAddress,
    // })

    // console.log('contractAddress:', contractAddress)

    navigate(`/`)
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
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="래플의 제목을 입력해주세요"
                  // required
                />
              </FormGroup>

              <FormGroup>
                <Label>설명</Label>
                <TextArea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="래플에 대한 설명을 입력해주세요"
                  // required
                />
              </FormGroup>

              <FormGroup>
                <Label>사진</Label>
                <ImageUploader onImageChange={() => {}} />
              </FormGroup>

              <FormGroup>
                <Label>
                  몇 명 당첨? <MaxText>(max는 고정넘버)</MaxText>
                </Label>
                <Input
                  name="maxParticipants"
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

          <CTA type="submit">만들기</CTA>
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
