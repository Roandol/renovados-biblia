import { Card, Row, Col, Select, InputNumber } from "antd";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import xml2js from "xml2js";

const App = () => {
  // const [livros, setLivros] = useState();
  const [xmlData, setXmlData] = useState("");

  // useEffect(() => {
  //   const parser = new xml2js.Parser();
  //   parser.parseString(xmlData, function (err, result) {
  //     console.log({ result });

  //     setLivros(result);
  //   });
  // }, [xmlData]);

  const getXml = async () => {
    const response = await fetch("src/assets/xml/nvi.xml");
    const xmlString = await response.text();
    const xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");

    // setXmlData(xmlString);
    // console.log(typeof xmlDoc);
    // console.log({ xmlDoc });

    getNomesLivros(xmlDoc);
  };

  const getNomesLivros = async (xml) => {
    const livros = xml.getElementsByTagName("book");
    console.log({ livros });

    livros.map((livro): HTMLCollection => {
      console.log("livro", livro.firstChild.nodeValue);

      return "teste";
    });
  };

  getXml();
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
