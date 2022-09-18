import {
  InputGroup,
  InputAddon,
  Select,
  Text,
  Input,
  Textarea,
  Button,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  IconButton,
  FormControl,
  Image,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react'
import { Widget } from '@uploadcare/react-widget'
import {
  Formik,
  Form,
  Field,
  FieldProps,
  FormikProps,
  FieldInputProps,
} from 'formik'
import toast from 'react-hot-toast'
import { CgClose } from 'react-icons/cg'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { createOrderSchema } from '~/utils/schema'
import { trpc } from '~/utils/trpc'
import { VerticalSpacing } from '../common/spacing/spacing'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { useStore } from 'zustand'
import { OrderStore } from '~/models/order-store'

type CreateNewBodyProps = {
  onClose: () => void
}

declare global {
  interface Window {
    UPLOADCARE_PUBLIC_KEY: string
  }
}

const CreateNewBody = ({ onClose }: CreateNewBodyProps) => {
  const { selectedDate, setIsFloatingOpen } = useStore(OrderStore)
  const initialValues = {
    pair: 'BTCUSDT',
    type: 'LONG',
    entry: '',
    stoploss: '',
    takeprofit: '',
    amount: '',
    leverage: '',
    status: 'PENDING',
    tradeType: 'ISOLATED',
    notes: '',
    images: [],
    tradeDate: selectedDate,
    day: selectedDate.getDate(),
    month: selectedDate.getMonth() + 1,
  }
  const createOrder = trpc.useMutation('tradebook.createOrder')
  const [groupId, setGroupId] = useState('')
  const fetchImage = trpc.useQuery([
    'uploadcaregetImageByGroup',
    { group: groupId },
  ])
  const onSubmit = async (values: typeof initialValues) => {
    await toast.promise(createOrder.mutateAsync(values as any), {
      loading: 'Creating order...',
      success: (value) => {
        return `Order of ${value.pair} created  - Entry: ${
          value.entry
        } - Stoploss: ${value.stoploss} - Takeprofit: ${
          value.takeprofit
        } \n- Note: ${value.notes || 'No note'}`
      },
      error: 'Failed to create order',
    })

    onClose()
    setIsFloatingOpen(true)
  }
  const pairList = useMemo(
    () => [
      { label: 'BTCUSDT', value: 'BTCUSDT' },
      { label: 'ETHUSDT', value: 'ETHUSDT' },
      { label: 'BNBUSDT', value: 'BNBUSDT' },
      { label: 'ADAUSDT', value: 'ADAUSDT' },
      { label: 'DOGEUSDT', value: 'DOGEUSDT' },
      { label: 'DOTUSDT', value: 'DOTUSDT' },
      { label: 'XRPUSDT', value: 'XRPUSDT' },
      { label: 'LTCUSDT', value: 'LTCUSDT' },
      { label: 'LINKUSDT', value: 'LINKUSDT' },
      { label: 'BCHUSDT', value: 'BCHUSDT' },
      { label: 'UNIUSDT', value: 'UNIUSDT' },
      { label: 'SOLUSDT', value: 'SOLUSDT' },
      { label: 'XLMUSDT', value: 'XLMUSDT' },
      { label: 'THETAUSDT', value: 'THETAUSDT' },
      { label: 'VETUSDT', value: 'VETUSDT' },
      { label: 'ETCUSDT', value: 'ETCUSDT' },
      { label: 'TRXUSDT', value: 'TRXUSDT' },
    ],
    []
  )

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(createOrderSchema)}
        onSubmit={onSubmit}
        validateOnBlur={true}
      >
        {({ isSubmitting, errors, values }) => (
          <Form>
            {JSON.stringify(errors)}
            {JSON.stringify(values)}
            <div className="grid grid-cols-2 gap-2 bg-white">
              <div className="col-span-2">
                <Field name="pair">
                  {({ field, form }: FieldProps) => (
                    <FormControl isInvalid={!!errors.pair}>
                      <AutoComplete openOnFocus>
                        <AutoCompleteInput variant="filled" />
                        <AutoCompleteList>
                          {pairList.map((pair, cid) => (
                            <AutoCompleteItem
                              key={`option-${cid}`}
                              value={pair.value}
                              textTransform="capitalize"
                            >
                              {pair.label}
                            </AutoCompleteItem>
                          ))}
                        </AutoCompleteList>
                      </AutoComplete>
                    </FormControl>
                  )}
                </Field>
              </div>

              {/* Left */}
              <div className="grid col-span-1 gap-2">
                <Field name="type">
                  {({ field, form, meta: { error } }: FieldProps) => (
                    <Button
                      onClick={() =>
                        form.setFieldValue(
                          'type',
                          field.value === 'LONG' ? 'SHORT' : 'LONG'
                        )
                      }
                      colorScheme={field.value === 'LONG' ? 'whatsapp' : 'red'}
                    >
                      {field.value}
                    </Button>
                  )}
                </Field>
                <Field name="stoploss">
                  {({ field, form, meta: { error } }: FieldProps) => (
                    <InputGroup>
                      <InputLeftAddon width="150px">Stoploss</InputLeftAddon>
                      <Input
                        type="number"
                        placeholder="Stoploss"
                        {...field}
                        isInvalid={!!error}
                      />
                      <InputDeleteButton field={field} form={form} />
                    </InputGroup>
                  )}
                </Field>
                <Field name="entry">
                  {({ field, form }: FieldProps) => (
                    <InputGroup>
                      <InputLeftAddon width="150px">Entry</InputLeftAddon>
                      <Input
                        type="number"
                        placeholder="Entry"
                        {...field}
                        isInvalid={!!errors.entry}
                      />
                      <InputDeleteButton field={field} form={form} />
                    </InputGroup>
                  )}
                </Field>
                <Field name="amount">
                  {({ field, form }: FieldProps) => (
                    <InputGroup>
                      <InputLeftAddon width="150px">Amount</InputLeftAddon>
                      <Input
                        type="number"
                        placeholder="Số lượng"
                        {...field}
                        isInvalid={!!errors.amount}
                      />
                      <InputDeleteButton field={field} form={form} />
                    </InputGroup>
                  )}
                </Field>
                <Field name="takeprofit">
                  {({ field, form }: FieldProps) => (
                    <InputGroup>
                      <InputLeftAddon width="150px">Takeprofit</InputLeftAddon>

                      <Input
                        type="number"
                        placeholder="TP"
                        {...field}
                        isInvalid={!!errors.takeprofit}
                      />
                      <InputDeleteButton field={field} form={form} />
                    </InputGroup>
                  )}
                </Field>
                <Field name="leverage">
                  {({ field, form }: FieldProps) => (
                    <InputGroup>
                      <InputLeftAddon width="150px">Leverage</InputLeftAddon>
                      <Input
                        type="number"
                        placeholder="Đòn bẩy"
                        {...field}
                        isInvalid={!!errors.leverage}
                      />
                      <InputDeleteButton field={field} form={form} />
                    </InputGroup>
                  )}
                </Field>
                <Field name="tradeType">
                  {({ field, form }: FieldProps) => (
                    <Button
                      onClick={() =>
                        form.setFieldValue(
                          'tradeType',
                          field.value === 'ISOLATED' ? 'CROSS' : 'ISOLATED'
                        )
                      }
                    >
                      {field.value}
                    </Button>
                  )}
                </Field>
              </div>

              {/* Right */}
              <div className="flex flex-col col-span-1 gap-4 overflow-hidden">
                <Field name="notes">
                  {({ field, form }: FieldProps) => (
                    <Textarea
                      placeholder="Ghi chú"
                      className="flex-1"
                      {...field}
                    />
                  )}
                </Field>

                <Field name="images">
                  {({ field: { onChange, value }, form }: FieldProps) => (
                    <>
                      <div className="flex flex-wrap gap-2">
                        {fetchImage?.data?.files
                          ?.map((file: any) => {
                            const { original_file_url, original_filename } =
                              file

                            return {
                              original_file_url,
                              original_filename,
                            }
                          })
                          .map((image: any) => (
                            <Image
                              key={image.original_file_url}
                              src={image.original_file_url}
                              alt={image.original_filename}
                              width={100}
                              height={100}
                            />
                          ))}
                      </div>

                      <Widget
                        publicKey={
                          process.env
                            .NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string
                        }
                        multiple
                        clearable
                        onChange={(file) => {
                          console.log(file)
                          setGroupId(file.uuid || '')
                          form.setFieldValue('images', [file.cdnUrl])
                        }}
                      />
                    </>
                  )}
                </Field>

                <Field name="status">
                  {({ field, form }: FieldProps) => (
                    <Select>
                      {/* order type */}
                      {/* huỷ, chờ khớp, đang chạy, win, lose */}
                      {[
                        { label: 'Chờ khớp', value: 'WAITING' },
                        { label: 'Huỷ', value: 'CANCELED' },
                        { label: 'Đang chạy', value: 'RUNNING' },
                        { label: 'Win', value: 'WIN' },
                        { label: 'Lose', value: 'LOSE' },
                      ].map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </Select>
                  )}
                </Field>
              </div>

              {/* Hidden field tradeDate */}
              <Field name="tradeDate">
                {({ field, form }: FieldProps) => (
                  <Input
                    type="hidden"
                    {...field}
                    value={selectedDate.toISOString()}
                  />
                )}
              </Field>

              {/* month, day */}
              <Field name="month">
                {({ field, form }: FieldProps) => (
                  <Input
                    type="hidden"
                    {...field}
                    value={selectedDate.getMonth()}
                  />
                )}
              </Field>

              <Field name="day">
                {({ field, form }: FieldProps) => (
                  <Input
                    type="hidden"
                    {...field}
                    value={selectedDate.getDate()}
                  />
                )}
              </Field>

              <VerticalSpacing size={3} />
              <div className="col-span-2 ">
                <Button
                  type="submit"
                  colorScheme="whatsapp"
                  isLoading={isSubmitting}
                  width="full"
                >
                  Tạo
                </Button>
              </div>

              <VerticalSpacing size={2} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default CreateNewBody

type InputDeleteButtonProps = {
  form: FormikProps<any>
  field: FieldInputProps<any>
}

const InputDeleteButton = ({ field, form }: InputDeleteButtonProps) => {
  return (
    <InputRightElement width="4.5rem" hidden={field.value === ''}>
      <IconButton
        h="1.75rem"
        size="sm"
        onClick={() => form.setFieldValue(field.name, '')}
        icon={<CgClose />}
        aria-label={'delete'}
      />
    </InputRightElement>
  )
}
