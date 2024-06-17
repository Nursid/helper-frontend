import React from 'react'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'

const AdminEditEmploye = ({closeModal}) => {
  return (
    <div>

      <form>
        <Row>
          <Col>
            <div>
              <FormGroup>
                <Label for="exampleEmail">
                  Emp Id
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Type Empy Id"
                  type="email"
                />
              </FormGroup>
            </div>
          </Col>
          <Col>
            <div>
              <FormGroup>
                <Label for="exampleEmail">
                  Name
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Type Empy.Name"
                  type="email"
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <FormGroup>
                <Label for="exampleEmail">
                  Mobile
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Type Mo. Num"
                  type="email"
                />
              </FormGroup>
            </div>
          </Col>
          <Col>
            <div>
              <FormGroup>
                <Label for="exampleEmail">
                  Aadhaar No.
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Type Adhaar"
                  type="email"
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <FormGroup>
                <Label for="exampleEmail">
                  Ref Name
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Type Ref.Name"
                  type="email"
                />
              </FormGroup>
            </div>
          </Col>
          <Col>
            <div>
              <FormGroup>
                <Label for="exampleEmail">
                  State
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Type  State"
                  type="email"
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <FormGroup>
                <Label for="exampleEmail">
                  Password
                </Label>
                <Input
                  id="exampleEmail" 
                  name="email"
                  placeholder="Inter Password"
                  type="email"
                />
              </FormGroup>
            </div>
          </Col>
          <Col>
            <div>
              <FormGroup>
                <Label for="exampleEmail">
                  City
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Type City"
                  type="email"
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <FormGroup>
                <Label for="exampleEmail">
                  Status
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Type status"
                  type="email"
                />
              </FormGroup>
            </div>
          </Col>
          <Col>
            <div>
              <FormGroup>
                <Label for="exampleEmail">
                  Address
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Type Address"
                  type="email"
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
        <div className='d-flex justify-content-evenly'>
          <Button onClick={closeModal} color='primary' outline> Cancel </Button>
          <Button type='submit' color='primary'> Submit </Button>
        </div>
      </form>
    </div>
  )
}

export default AdminEditEmploye