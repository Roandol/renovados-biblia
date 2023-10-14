import { Row, Col, Select, Typography, Space, Input, Button } from "antd";
import "./assets/css/biblia.scss";
import useBible, { Verse } from "./Hooks/useBible";
import { DefaultOptionType } from "antd/es/select";
import { ChangeEvent, useState } from "react";
import VersDisplay from "./Components/VersDisplay";
import {
  MinusOutlined,
  PlusOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const transfomVerse = (v: Verse, i: number) => {
  return <VersDisplay vers={v} key={i + 1} />
};

const App = () => {
  const {
    nameBooks,
    book,
    cap,
    versesSelected,
    searchBook,
    searchCap,
    searchVerses: searchVers,
    changeVersion,
  } = useBible();
  const [capNumber, setCapNumber] = useState<number | null>();
  const [inputVersValue, setInputVersValue] = useState("");
  const verss = versesSelected.length
    ? versesSelected.map(transfomVerse)
    : cap?.verses.map(transfomVerse);

  const handleChangeBook = (name: string) => {
    searchBook(name);
    setCapNumber(null);
    setInputVersValue("");
  };

  const handleCapNumber = (value: number | null) => {
    searchCap(value);
    setCapNumber(value);
  };

  const handleVersNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.match(/\b\d+\b/g)?.slice(0, 2) || [];
    const test = parseInt(value[0]) > parseInt(value[1]);

    searchVers(test ? [] : value);
    setInputVersValue(e.target.value);
  };

  const handleVersionChange = (value: string) => {
    changeVersion(value);
  };

  const mudarFonte = (value: string) => {
    const root = getComputedStyle(document.documentElement);
    const fontSize = parseInt(
      root.getPropertyValue("--base-font-size").split(`px`)[0]
    );

    const newFontSize = value == "+" ? fontSize + 5 : fontSize - 5;

    document.documentElement.style.setProperty(
      "--base-font-size",
      newFontSize + "px"
    );
  };

  const optionsBooks: DefaultOptionType[] =
    nameBooks?.map((nb) => {
      return {
        label: nb,
        value: nb,
      };
    }) || [];
  const optionsCaps: DefaultOptionType[] =
    book?.caps.map((c) => {
      return {
        label: c.number,
        value: c.number,
      };
    }) || [];
  const optionsVersion: DefaultOptionType[] = [
    {
      label: "NVI - Nova Versão Internacional",
      value: "NVI",
    },
    {
      label: "AA - Almeida Revisada Imprensa Bíblica ",
      value: "AA",
    },
    {
      label: "ACF - Almeida Corrigida e Fiel",
      value: "ACF",
    },
  ];
  return (
    <>
      <Row>
        <Col md={6} xs={12}>
          <Select
            style={{ width: "80%" }}
            showSearch
            placeholder="Livro"
            onChange={handleChangeBook}
            options={optionsBooks}
          />
        </Col>
        <Col md={6} xs={12}>
          <Space>
            <Text>Capítulo:</Text>
            <Select
              showSearch
              placeholder="Capítulo"
              options={optionsCaps}
              value={capNumber}
              onChange={handleCapNumber}
            />
          </Space>
        </Col>
        <Col md={6} xs={12}>
          <Space>
            <Text>Versículo:</Text>
            <Input
              placeholder="Versículo"
              value={inputVersValue}
              onChange={handleVersNumber}
              min={1}
            />
          </Space>
        </Col>
        <Col md={6} xs={12}>
          <Select
            placeholder="Versão"
            onChange={handleVersionChange}
            defaultValue={"NVI"}
            options={optionsVersion}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24} className="pagina">
          <Row>
            <Col xs={18} md={21}>
              <Title className="pagina-header pagina-header__livro">
                {book?.title}
              </Title>
              {cap && (
                <Title className="pagina-header pagina-header__capitulo">
                  {cap.number}
                </Title>
              )}
            </Col>
            <Col className="pagina-header__botoes" xs={6} md={3}>
              {cap && (
                <Row>
                  <Col xs={24}>
                    <Button
                      type="primary"
                      ghost
                      onClick={() => mudarFonte("+")}
                    >
                      <FontSizeOutlined /> <PlusOutlined />
                    </Button>
                  </Col>
                  <Col xs={24}>
                    <Button
                      type="primary"
                      ghost
                      onClick={() => mudarFonte("-")}
                    >
                      <FontSizeOutlined /> <MinusOutlined />
                    </Button>
                  </Col>
                </Row>
              )}
            </Col>
            <Col xs={24}>
              {cap && <div className="pagina-body">{verss}</div>}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default App;
