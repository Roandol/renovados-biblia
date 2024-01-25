import * as React from 'react';
import { Row, Col, Select, Typography, Space, Input, Button } from "antd";
import "./assets/css/biblia.scss";
import { DefaultOptionType } from "antd/es/select";
import { ChangeEvent, useState } from "react";
import VersDisplay from '../../../Components/VersDisplay';
import {
    MinusOutlined,
    PlusOutlined,
    FontSizeOutlined,
} from "@ant-design/icons";
import { Verse } from '../../../Hooks/types';
import useBible from '../../../Hooks/useBible';

const { Title, Text } = Typography;

const transfomVerse = (v: Verse, i: number) => {
    return <VersDisplay vers={v} key={i + 1} />
};

interface IPrincipalProps {
}

const Principal: React.FunctionComponent<IPrincipalProps> = () => {
    const {
        books: nameBooks,
        capNumbers,
        capSelected,
        bookSelected,
        versesSelected,
        version,
        changeBook,
        changeCap,
        searchVerse,
        changeVersion
    } = useBible();
    const [inputVersValue, setInputVersValue] = useState("");

    const handleChangeBook = (name: string) => {
        changeBook(name);
        changeCap(0);
        setInputVersValue("");
    };

    const handleChangeCap = (value: number) => {
        changeCap(value);
    };

    const handleVersNumber = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.match(/\b\d+\b/g)?.slice(0, 2).map(v => Number(v)) || [];
        const test = value[0] > value[1];

        searchVerse(test ? [] : value);

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

    const verss = versesSelected?.map(transfomVerse);

    const optionsBooks: DefaultOptionType[] =
        nameBooks?.map((nb) => {
            return {
                label: nb,
                value: nb,
            };
        }) || [];
    const optionsCaps: DefaultOptionType[] =
        capNumbers.map((c) => {
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
                            value={capSelected === 0 ? null : capSelected}
                            onChange={handleChangeCap}
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
                        value={version}
                        options={optionsVersion}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={24} className="pagina">
                    <Row>
                        <Col xs={18} md={21}>
                            <Title className="pagina-header pagina-header__livro">
                                {bookSelected}
                            </Title>
                            {capSelected !== 0 && (
                                <Title className="pagina-header pagina-header__capitulo">
                                    {capSelected}
                                </Title>
                            )}
                        </Col>
                        <Col className="pagina-header__botoes" xs={6} md={3}>
                            {capSelected !== 0 && (
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
                            {capSelected !== 0 && inputVersValue.trim() !== "" && <div className="pagina-body">{verss}</div>}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Principal;
