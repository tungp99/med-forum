import { DateTime } from 'luxon'
import { Card, ListGroup, Stack } from 'react-bootstrap'

import { Profession } from 'system/types'
import { AS3Avatar, AS3Button, AS3Spacer } from 'system/components'
import { EditButtonComponent } from './edit-button.component'
import { ProfessionPopupComponent } from './profession-popup.component'
import { useDispatch } from 'system/store'
import { mdiPlus } from '@mdi/js'

type ExperienceCardComponentProps = {
  title: string
  data: Profession[]
}

export function ProfessionCardComponent({
  title,
  data,
}: ExperienceCardComponentProps) {
  const dispatch = useDispatch()

  return (
    <Card className="experience">
      <Card.Body>
        <Card.Title>
          {title}
          <AS3Spacer />
          <Stack
            direction="horizontal"
            gap={2}>
            <AS3Button
              className="btn-edit"
              icon={mdiPlus}
              iconSize={1.1}
              text
              onClick={() => dispatch({ type: 'OPEN_PROFESSION_POPUP' })}
            />
            <EditButtonComponent />
          </Stack>
        </Card.Title>

        <ListGroup variant="flush">
          {data.map((item, index) => (
            <ListGroup.Item key={index}>
              <AS3Avatar
                width={48}
                height={48} />
              <p className="ps-3 mb-0">
                <span className="fw-bold">{item.position}</span> <br />
                <span>{item.organization}</span> <br />
                <span className="text-black-50">
                  {item.start &&
                    DateTime.fromISO(item.start).toLocaleString(
                      DateTime.DATE_MED
                    )}{' '}
                  - {item.isWorking && 'Present'}
                </span>
                <br />
                <span className="text-black-50">Hanoi, Vietnam</span> <br />
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>

      <ProfessionPopupComponent />
    </Card>
  )
}
