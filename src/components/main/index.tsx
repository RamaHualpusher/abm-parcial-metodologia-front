import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import * as React from 'react';

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  // Render
  return (
    <Container>
      <Row>
        <Col style={{ padding: '10px 0px' }} xs={{ offset: 1, span: 10 }}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
