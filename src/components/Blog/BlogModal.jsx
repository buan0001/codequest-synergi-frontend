export default function BlogModal(){

    // ONLY A MAYBE FILE SO FAR - PROBABLY WONT HAVE TIME TO REFACTOR. IGNORE FOR NOW
    
     return  (<div>
                              <Modal show={showModal} dialogClassName="" size="xl">
                                <Modal.Dialog size="xl" className="text-primary">
                                  <Modal.Header
                                    closeButton
                                    onClick={() => {
                                      setShowModal(false);
                                    }}
                                  >
                                    <Modal.Title>Tilføj ny bruger</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Navn</Form.Label>
                                            <Form.Control type="text"></Form.Control>
                                        </Form.Group>
                                    </Form>
                                  </Modal.Body>

                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={() => {
                                        setShowModal(false);
                                      }}
                                    >
                                      Luk
                                    </Button>
                                    {/* <Button variant="primary">Gem ændringer</Button> */}
                                  </Modal.Footer>
                                </Modal.Dialog>
                              </Modal>
                            </div>)
}