import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react'
import { useStore } from 'zustand'
import { OrderStore } from '~/models/order-store'
import CreateNewBody from './createnew_body'

type CreateNewModalProps = {
  isOpen: boolean
  onClose: () => void
}
const CreateNewModal = ({ isOpen, onClose }: CreateNewModalProps) => {
  const { selectedDate } = useStore(OrderStore)

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text className="text-gray-400">
            {selectedDate.toLocaleDateString('vi-VN')}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateNewBody onClose={onClose} />
        </ModalBody>

        {/* <ModalFooter></ModalFooter> */}
      </ModalContent>
    </Modal>
  )
}

export default CreateNewModal
