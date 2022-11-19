import { DateTime } from 'luxon'
import { Card, ListGroup, Stack } from 'react-bootstrap'
import { mdiMinus, mdiPlus } from '@mdi/js'

import { Profession } from 'system/types'
import { useDispatch } from 'system/store'
import { AS3Avatar, AS3Button, AS3Spacer } from 'system/components'

type ExperienceCardComponentProps = {
  title: string
  data: Profession[]
  editable: boolean
  accountId: string
}

export function ProfessionCardComponent({
  title,
  data,
  editable,
  accountId,
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
            {editable ? (
              <AS3Button
                className="btn-edit "
                icon={mdiPlus}
                iconSize={1}
                text
                onClick={() =>
                  dispatch({ type: 'OPEN_PROFESSION_POPUP', payload: title })
                }
              />
            ) : (
              <></>
            )}
          </Stack>
        </Card.Title>

        <ListGroup variant="flush">
          {data.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="pe-0">
              <AS3Avatar
                width={48}
                height={48} />
              <p className="ps-3 mb-0 w-100">
                <span className="fw-bold">{item.position}</span> <br />
                <span>{item.organization}</span> <br />
                <span className="text-black-50">
                  {item.start &&
                    DateTime.fromISO(item.start).toLocaleString(
                      DateTime.DATE_MED
                    )}{' '}
                  -{' '}
                  {(item.isWorking && 'Present') ||
                    (item.end &&
                      DateTime.fromISO(item.end).toLocaleString(
                        DateTime.DATE_MED
                      ))}
                </span>
              </p>
              <div className="text-end">
                {editable ? (
                  <AS3Button
                    icon={mdiMinus}
                    text
                    size="sm"
                    iconSize={1}
                    className="delete__icon"
                    onClick={() => {
                      dispatch({
                        type: 'OPEN_DELETE_PROFESSION_POPUP',
                        payload: {
                          data: item,
                          title: title,
                          accountId: accountId,
                        },
                      })
                    }}
                  ></AS3Button>
                ) : (
                  <></>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}
