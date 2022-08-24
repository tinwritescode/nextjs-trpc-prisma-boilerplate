// import tw, { styled } from 'twin.macro'
import styled from '@emotion/styled'

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

type CloudTemplateProps = {
  number: number
  duration: number
  marginLeft: number
  top: number
}

const CloudTemplate = styled.div<CloudTemplateProps>`
  background-image: url('/images/cloud/${(props) => props.number}.svg');
  background-repeat: no-repeat;
  animation: flyFromLeft ${(props) => props.duration || '2'}s linear infinite;
  background-size: contain;
  width: 20rem;
  height: 14rem;
  top: ${(props) => props.top}vh;
  margin-left: calc(${(props) => props.marginLeft}px - 200px);
`
const CloudWrapper = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
`

const Cloud = ({ cloudNum = 5 }) => {
  return (
    <CloudWrapper>
      {Array.from({ length: cloudNum }).map((cloud, index) => {
        return (
          <CloudTemplate
            key={index}
            number={getRndInteger(1, 7)}
            duration={getRndInteger(15, 45)}
            top={getRndInteger((Math.abs(index - 1) % 10) * 10, index * 10)}
            marginLeft={getRndInteger(-150, 200)}
          />
        )
      })}
    </CloudWrapper>
  )
}

export default Cloud
