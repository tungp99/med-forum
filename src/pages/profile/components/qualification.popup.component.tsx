import { mdiClose } from '@mdi/js'
import { DateTime } from 'luxon'
import { useMemo, useEffect } from 'react'
import { Modal, Row, Col } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { useSelector, useDispatch } from 'system/store'
import { AS3Spacer, AS3Button, AS3Input } from 'system/components'
import { QualificationInput } from 'system/generated/gql.types'

type qualificationPopupProps = {
  data?: QualificationInput
  onSave: (data: QualificationInput) => void
}
export function QualificationPopup({ data, onSave }: qualificationPopupProps) {
  const { isQualificationPopupOpen, error } = useSelector(
    store => store.profilePage
  )
  const dispatch = useDispatch()

  const formValues = useMemo<QualificationInput>(
    () => ({
      issuedBy: data?.issuedBy ?? '',
      title: data?.title ?? '',
      issuedAt: data?.issuedAt
        ? DateTime.fromISO(data.issuedAt).toISODate()
        : DateTime.now().toISODate(),
      expireAt: data?.expireAt
        ? DateTime.fromISO(data.expireAt).toISODate()
        : null,
    }),
    [data]
  )
  const { control, handleSubmit, reset } = useForm({
    defaultValues: formValues,
  })

  useEffect(() => {
    reset(formValues)
  }, [formValues])

  return (
    <Modal
      centered
      size="lg"
      show={isQualificationPopupOpen}>
      <Modal.Header className="border-bottom-0">
        Enrich my Profile
        <AS3Spacer />
        <AS3Button
          text
          size="lg"
          icon={mdiClose}
          iconSize={1.5}
          onClick={() => dispatch({ type: 'CLOSE_QUALIFICATION_POPUP' })}
        />
      </Modal.Header>

      <Modal.Body className="border-bottom-0">
        <Row>
          <Col sm={12}>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  label="Qualification"
                  onChange={onChange}
                  value={value}
                  errors={
                    error?.graphQLErrors[0].extensions.propertyName === 'Title'
                      ? [error.message]
                      : undefined
                  }
                />
              )}
            />
          </Col>

          <Col sm={12}>
            <Controller
              control={control}
              name="issuedBy"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  label="Issued by"
                  onChange={onChange}
                  value={value}
                  errors={
                    error?.graphQLErrors[0].extensions.propertyName ===
                    'IssuedBy'
                      ? [error.message]
                      : undefined
                  }
                />
              )}
            />
          </Col>

          <Col
            md={6}
            sm={12}>
            <Controller
              control={control}
              name="issuedAt"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  type="date"
                  label="Issued on"
                  onChange={onChange}
                  value={value ?? ''}
                  errors={
                    error?.graphQLErrors[0].extensions.propertyName ===
                    'Issued on'
                      ? [error.message]
                      : undefined
                  }
                />
              )}
            />
          </Col>

          <Col
            md={6}
            sm={12}>
            <Controller
              control={control}
              name="expireAt"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  type="date"
                  label="Expire"
                  onChange={onChange}
                  value={value ?? ''}
                  errors={
                    error?.graphQLErrors[0].extensions.propertyName ===
                    'ExpireAt'
                      ? [error.message]
                      : undefined
                  }
                />
              )}
            />
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <AS3Button
          variant="primary"
          onClick={handleSubmit(data => {
            onSave(data)
            reset()
          })}
        >
          Save
        </AS3Button>
      </Modal.Footer>
    </Modal>
  )
}
