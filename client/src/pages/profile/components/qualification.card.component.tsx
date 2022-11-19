import { mdiPlus, mdiMinus } from '@mdi/js'
import { DateTime } from 'luxon'
import { Card, Stack, ListGroup } from 'react-bootstrap'
import { AS3Spacer, AS3Button, AS3Avatar } from 'system/components'
import { useDispatch } from 'system/store'
import { Qualification } from 'system/types'

type QualificationCardComponentProps = {
  data: Qualification[]
  editable: boolean
  accountId: string
}

export function QualificationCardComponent({
  data,
  editable,
  accountId,
}: QualificationCardComponentProps) {
  const dispatch = useDispatch()
  return (
    <Card className="experience">
      <Card.Body>
        <Card.Title>
          Qualification
          <AS3Spacer />
          <Stack
            direction="horizontal"
            gap={2}>
            {editable ? (
              <AS3Button
                className="btn-edit"
                icon={mdiPlus}
                iconSize={1}
                text
                onClick={() => dispatch({ type: 'OPEN_QUALIFICATION_POPUP' })}
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
                <span className="fw-bold">{item.title}</span> <br />
                <span>Issued by {item.issuedBy}</span> <br />
                <span className="text-black-50">
                  Date:{' '}
                  {item.issuedAt &&
                    DateTime.fromISO(item.issuedAt).toLocaleString(
                      DateTime.DATE_MED
                    )}{' '}
                  -{' '}
                  <span>
                    Expire:{' '}
                    {item.expireAt &&
                      DateTime.fromISO(item.expireAt).toLocaleString(
                        DateTime.DATE_MED
                      )}
                  </span>
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
                          title: '',
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
