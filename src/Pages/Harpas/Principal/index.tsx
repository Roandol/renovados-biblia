import * as React from 'react';
import useHarp from '../../../Hooks/useHarp';
import { Card, Input, Layout, List, Space, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { ChangeEvent } from 'react';
import "../../../assets/css/harp.scss"

interface IHarpasProps {
}

const Harpas: React.FunctionComponent<IHarpasProps> = () => {
  const {
    nameHarps,
    harpSelected,
    nameHarpsFiltered,
    selectHarp,
    searchHarp
  } = useHarp();

  const lineContent = harpSelected?.verses.map(v => {
    const [letter, number] = v.name;
    const lines = v.lines.map(l => {
      return <Typography.Text style={{ fontSize: 60 }}>{l}</Typography.Text>
    })
    let type: string = "";

    if (letter === "v")
      type = "Verso"
    else if (letter === "c")
      type = "Coro"
    else if (letter === "b")
      type = "Ponte"

    return <>
      <Card>
        <Space direction='vertical'>
          <Typography.Text style={{ fontSize: 50 }} strong>{type} {number}</Typography.Text>
          {lines}
        </Space>
      </Card>

    </>
  })

  const handleInputSearch = (value: ChangeEvent<HTMLInputElement>) => {
    searchHarp(value.target.value);
  }
  return <>
    <Layout style={{ minHeight: '95vh', backgroundColor: "transparent" }}>
      <Sider style={{ backgroundColor: "transparent", minHeight: "98vh",maxHeight: "98vh", overflow: "auto" }}>
        <Input size='large' placeholder='Pesquise...' onChange={handleInputSearch} />
        <List
          bordered
          dataSource={nameHarpsFiltered.length ? nameHarpsFiltered : nameHarps}
          renderItem={(item) => {
            return <List.Item className='hc-items' onClick={() => selectHarp(item)}>
              <Typography.Text>{item}</Typography.Text>
            </List.Item>
          }}
          style={{minHeight: "100%"}}
        />
      </Sider>
      <Layout style={{ backgroundColor: "transparent" }}>
        <Header style={{ backgroundColor: "transparent", textAlign: 'center' }}>
          <Typography.Title>{harpSelected?.title}</Typography.Title>
        </Header>
        <Content style={{ textAlign: 'center', fontSize: 30, maxHeight: "90vh", overflow: "auto" }}>
          <Space direction='vertical'>
            {lineContent}
          </Space>
        </Content>
      </Layout>
    </Layout>
  </>;
};

export default Harpas;
