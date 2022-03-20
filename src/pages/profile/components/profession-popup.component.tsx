import { useEffect, useMemo } from 'react'
import { DateTime } from 'luxon'
import { Controller, useForm } from 'react-hook-form'
import { Col, Modal, Row } from 'react-bootstrap'
import { mdiClose } from '@mdi/js'

import { Profession } from 'system/types'
import { useDispatch, useSelector } from 'system/store'
import { AS3Button, AS3Input, AS3Spacer, AS3Switch } from 'system/components'

type ProfessionPopupComponentProps = {
  data?: Profession
  onSave: (data: Profession) => void
}

export function ProfessionPopupComponent({
  data,
  onSave,
}: ProfessionPopupComponentProps) {
  const { isProfessionPopupOpen } = useSelector(store => store.profilePage)
  const dispatch = useDispatch()

  const formValues = useMemo<Profession>(
    () => ({
      organization: data?.organization ?? '',
      position: data?.position ?? '',
      start: data?.start
        ? DateTime.fromISO(data.start).toISODate()
        : DateTime.now().toISODate(),
      end: data?.start ? DateTime.fromISO(data.start).toISODate() : null,
      isWorking: data?.isWorking ?? true,
    }),
    [data]
  )
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: formValues,
  })

  useEffect(() => {
    reset(formValues)
  }, [formValues])

  return (
    <Modal
      centered
      size="lg"
      show={isProfessionPopupOpen}>
      <Modal.Header className="border-bottom-0">
        Enrich my Profile
        <AS3Spacer />
        <AS3Button
          text
          size="lg"
          icon={mdiClose}
          iconSize={1.5}
          onClick={() => dispatch({ type: 'CLOSE_PROFESSION_POPUP' })}
        />
      </Modal.Header>

      <Modal.Body className="border-bottom-0">
        <Row>
          <Col sm={12}>
            <Controller
              control={control}
              name="organization"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  label="Organization"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Col>
          <Col sm={12}>
            <Controller
              control={control}
              name="position"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  label="Position"
                  onChange={onChange}
                  value={value} />
              )}
            />
          </Col>
          <Col
            md={6}
            sm={12}>
            <Controller
              control={control}
              name="start"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  type="date"
                  label="From"
                  onChange={onChange}
                  value={value ?? ''}
                />
              )}
            />
          </Col>
          <Col
            md={6}
            sm={12}>
            <Controller
              control={control}
              name="end"
              render={({ field: { onChange, value } }) => (
                <AS3Input
                  type="date"
                  label="To"
                  disabled={watch('isWorking')}
                  onChange={onChange}
                  value={value ?? ''}
                />
              )}
            />

            <Controller
              control={control}
              name="isWorking"
              render={({ field: { onChange, value } }) => (
                <AS3Switch
                  label="I'm still working here"
                  onChange={onChange}
                  checked={value}
                />
              )}
            />
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <AS3Button
          variant="primary"
          onClick={handleSubmit(data => onSave(data))}
        >
          Save
        </AS3Button>
      </Modal.Footer>
    </Modal>
  )
}
