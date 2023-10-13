import { Card, Row, Col, Select, InputNumber } from "antd";
import "./App.css";
import axios from "axios";

const App = () => {
  const getNomesLivros = async () => {
    const response = await fetch("src/assets/xml/nvi.xml");
    const xmlString = await response.text();
    const xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");

    console.log({ xmlDoc });
    console.log({ xmlString });
  };

  getNomesLivros();
  return (
    <>
      <Card>
        <Row>
          <Col xs={6}>
            <Select placeholder="Livro" />
          </Col>
          <Col xs={3}>
            <InputNumber placeholder="Capítulo" min={1} />
          </Col>
          <Col xs={3}>
            <InputNumber placeholder="Versículo" min={1} />
          </Col>
          <Col xs={6}>
            <Select placeholder="Versão" />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default App;
